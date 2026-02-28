// ==========================================================================
// Library Agent API (libraryagent v1)
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
  name: "libraryagent",
  version: "v1",
  rootUrl: "https://libraryagent.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleExampleLibraryagentV1Shelf {
  /** Output only. The resource name of the shelf. Shelf names have the form `shelves/{shelf_id}`. The name is ignored when creating a shelf. */
  name?: string;
  /** The theme of the shelf */
  theme?: string;
}

export const GoogleExampleLibraryagentV1Shelf: Schema.Schema<GoogleExampleLibraryagentV1Shelf> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  theme: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleExampleLibraryagentV1Shelf" }) as any as Schema.Schema<GoogleExampleLibraryagentV1Shelf>;

export interface GoogleExampleLibraryagentV1ListShelvesResponse {
  /** The list of shelves. */
  shelves?: Array<GoogleExampleLibraryagentV1Shelf>;
  /** A token to retrieve next page of results. Pass this value in the ListShelvesRequest.page_token field in the subsequent call to `ListShelves` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleExampleLibraryagentV1ListShelvesResponse: Schema.Schema<GoogleExampleLibraryagentV1ListShelvesResponse> = Schema.suspend(() => Schema.Struct({
  shelves: Schema.optional(Schema.Array(GoogleExampleLibraryagentV1Shelf)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleExampleLibraryagentV1ListShelvesResponse" }) as any as Schema.Schema<GoogleExampleLibraryagentV1ListShelvesResponse>;

export interface GoogleExampleLibraryagentV1Book {
  /** The resource name of the book. Book names have the form `shelves/{shelf_id}/books/{book_id}`. The name is ignored when creating a book. */
  name?: string;
  /** The name of the book author. */
  author?: string;
  /** The title of the book. */
  title?: string;
  /** Value indicating whether the book has been read. */
  read?: boolean;
}

export const GoogleExampleLibraryagentV1Book: Schema.Schema<GoogleExampleLibraryagentV1Book> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  author: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  read: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleExampleLibraryagentV1Book" }) as any as Schema.Schema<GoogleExampleLibraryagentV1Book>;

export interface GoogleExampleLibraryagentV1ListBooksResponse {
  /** The list of books. */
  books?: Array<GoogleExampleLibraryagentV1Book>;
  /** A token to retrieve next page of results. Pass this value in the ListBooksRequest.page_token field in the subsequent call to `ListBooks` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleExampleLibraryagentV1ListBooksResponse: Schema.Schema<GoogleExampleLibraryagentV1ListBooksResponse> = Schema.suspend(() => Schema.Struct({
  books: Schema.optional(Schema.Array(GoogleExampleLibraryagentV1Book)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleExampleLibraryagentV1ListBooksResponse" }) as any as Schema.Schema<GoogleExampleLibraryagentV1ListBooksResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets a shelf. Returns NOT_FOUND if the shelf does not exist. */
export interface GetShelvesRequest {
  /** Required. The name of the shelf to retrieve. */
  name: string;
}

export const GetShelvesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/shelves/{shelvesId}" }),
  svc,
) as unknown as Schema.Schema<GetShelvesRequest>;

export type GetShelvesResponse = GoogleExampleLibraryagentV1Shelf;
export const GetShelvesResponse = GoogleExampleLibraryagentV1Shelf;

export type GetShelvesError = CommonErrors;

export const getShelves: API.OperationMethod<GetShelvesRequest, GetShelvesResponse, GetShelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetShelvesRequest,
  output: GetShelvesResponse,
  errors: [],
}));

/** Lists shelves. The order is unspecified but deterministic. Newly created shelves will not necessarily be added to the end of this list. */
export interface ListShelvesRequest {
  /** Requested page size. Server may return fewer shelves than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListShelvesResponse.next_page_token returned from the previous call to `ListShelves` method. */
  pageToken?: string;
}

export const ListShelvesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/shelves" }),
  svc,
) as unknown as Schema.Schema<ListShelvesRequest>;

export type ListShelvesResponse = GoogleExampleLibraryagentV1ListShelvesResponse;
export const ListShelvesResponse = GoogleExampleLibraryagentV1ListShelvesResponse;

export type ListShelvesError = CommonErrors;

export const listShelves = API.makePaginated(() => ({
  input: ListShelvesRequest,
  output: ListShelvesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a book. Returns NOT_FOUND if the book does not exist. */
export interface GetShelvesBooksRequest {
  /** Required. The name of the book to retrieve. */
  name: string;
}

export const GetShelvesBooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/shelves/{shelvesId}/books/{booksId}" }),
  svc,
) as unknown as Schema.Schema<GetShelvesBooksRequest>;

export type GetShelvesBooksResponse = GoogleExampleLibraryagentV1Book;
export const GetShelvesBooksResponse = GoogleExampleLibraryagentV1Book;

export type GetShelvesBooksError = CommonErrors;

export const getShelvesBooks: API.OperationMethod<GetShelvesBooksRequest, GetShelvesBooksResponse, GetShelvesBooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetShelvesBooksRequest,
  output: GetShelvesBooksResponse,
  errors: [],
}));

/** Lists books in a shelf. The order is unspecified but deterministic. Newly created books will not necessarily be added to the end of this list. Returns NOT_FOUND if the shelf does not exist. */
export interface ListShelvesBooksRequest {
  /** Required. The name of the shelf whose books we'd like to list. */
  parent: string;
  /** Requested page size. Server may return fewer books than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListBooksResponse.next_page_token. returned from the previous call to `ListBooks` method. */
  pageToken?: string;
}

export const ListShelvesBooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/shelves/{shelvesId}/books" }),
  svc,
) as unknown as Schema.Schema<ListShelvesBooksRequest>;

export type ListShelvesBooksResponse = GoogleExampleLibraryagentV1ListBooksResponse;
export const ListShelvesBooksResponse = GoogleExampleLibraryagentV1ListBooksResponse;

export type ListShelvesBooksError = CommonErrors;

export const listShelvesBooks = API.makePaginated(() => ({
  input: ListShelvesBooksRequest,
  output: ListShelvesBooksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Borrow a book from the library. Returns the book if it is borrowed successfully. Returns NOT_FOUND if the book does not exist in the library. Returns quota exceeded error if the amount of books borrowed exceeds allocation quota in any dimensions. */
export interface BorrowShelvesBooksRequest {
  /** Required. The name of the book to borrow. */
  name: string;
}

export const BorrowShelvesBooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/shelves/{shelvesId}/books/{booksId}:borrow", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BorrowShelvesBooksRequest>;

export type BorrowShelvesBooksResponse = GoogleExampleLibraryagentV1Book;
export const BorrowShelvesBooksResponse = GoogleExampleLibraryagentV1Book;

export type BorrowShelvesBooksError = CommonErrors;

export const borrowShelvesBooks: API.OperationMethod<BorrowShelvesBooksRequest, BorrowShelvesBooksResponse, BorrowShelvesBooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BorrowShelvesBooksRequest,
  output: BorrowShelvesBooksResponse,
  errors: [],
}));

/** Return a book to the library. Returns the book if it is returned to the library successfully. Returns error if the book does not belong to the library or the users didn't borrow before. */
export interface ReturnShelvesBooksRequest {
  /** Required. The name of the book to return. */
  name: string;
}

export const ReturnShelvesBooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/shelves/{shelvesId}/books/{booksId}:return", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReturnShelvesBooksRequest>;

export type ReturnShelvesBooksResponse = GoogleExampleLibraryagentV1Book;
export const ReturnShelvesBooksResponse = GoogleExampleLibraryagentV1Book;

export type ReturnShelvesBooksError = CommonErrors;

export const returnShelvesBooks: API.OperationMethod<ReturnShelvesBooksRequest, ReturnShelvesBooksResponse, ReturnShelvesBooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReturnShelvesBooksRequest,
  output: ReturnShelvesBooksResponse,
  errors: [],
}));

