// ==========================================================================
// Google Keep API (keep v1)
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
  name: "keep",
  version: "v1",
  rootUrl: "https://keep.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Attachment {
  /** The resource name; */
  name?: string;
  /** The MIME types (IANA media types) in which the attachment is available. */
  mimeType?: Array<string>;
}

export const Attachment: Schema.Schema<Attachment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Attachment" }) as any as Schema.Schema<Attachment>;

export interface User {
  /** The user's email. */
  email?: string;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface Group {
  /** The group email. */
  email?: string;
}

export const Group: Schema.Schema<Group> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface Family {
}

export const Family: Schema.Schema<Family> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Family" }) as any as Schema.Schema<Family>;

export interface Permission {
  /** Output only. The resource name. */
  name?: string;
  /** The role granted by this permission. The role determines the entity’s ability to read, write, and share notes. */
  role?: "ROLE_UNSPECIFIED" | "OWNER" | "WRITER" | (string & {});
  /** The email associated with the member. If set on create, the `email` field in the `User` or `Group` message must either be empty or match this field. On read, may be unset if the member does not have an associated email. */
  email?: string;
  /** Output only. The user to whom this role applies. */
  user?: User;
  /** Output only. The group to which this role applies. */
  group?: Group;
  /** Output only. The Google Family to which this role applies. */
  family?: Family;
  /** Output only. Whether this member has been deleted. If the member is recovered, this value is set to false and the recovered member retains the role on the note. */
  deleted?: boolean;
}

export const Permission: Schema.Schema<Permission> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  user: Schema.optional(User),
  group: Schema.optional(Group),
  family: Schema.optional(Family),
  deleted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Permission" }) as any as Schema.Schema<Permission>;

export interface TextContent {
  /** The text of the note. The limits on this vary with the specific field using this type. */
  text?: string;
}

export const TextContent: Schema.Schema<TextContent> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "TextContent" }) as any as Schema.Schema<TextContent>;

export interface ListItem {
  /** If set, list of list items nested under this list item. Only one level of nesting is allowed. */
  childListItems?: Array<ListItem>;
  /** The text of this item. Length must be less than 1,000 characters. */
  text?: TextContent;
  /** Whether this item has been checked off or not. */
  checked?: boolean;
}

export const ListItem: Schema.Schema<ListItem> = Schema.suspend(() => Schema.Struct({
  childListItems: Schema.optional(Schema.Array(ListItem)),
  text: Schema.optional(TextContent),
  checked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ListItem" }) as any as Schema.Schema<ListItem>;

export interface ListContent {
  /** The items in the list. The number of items must be less than 1,000. */
  listItems?: Array<ListItem>;
}

export const ListContent: Schema.Schema<ListContent> = Schema.suspend(() => Schema.Struct({
  listItems: Schema.optional(Schema.Array(ListItem)),
})).annotate({ identifier: "ListContent" }) as any as Schema.Schema<ListContent>;

export interface Section {
  /** Used if this section's content is a block of text. The length of the text content must be less than 20,000 characters. */
  text?: TextContent;
  /** Used if this section's content is a list. */
  list?: ListContent;
}

export const Section: Schema.Schema<Section> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(TextContent),
  list: Schema.optional(ListContent),
})).annotate({ identifier: "Section" }) as any as Schema.Schema<Section>;

export interface Note {
  /** Output only. The resource name of this note. See general note on identifiers in KeepService. */
  name?: string;
  /** Output only. When this note was created. */
  createTime?: string;
  /** Output only. When this note was last modified. */
  updateTime?: string;
  /** Output only. When this note was trashed. If `trashed`, the note is eventually deleted. If the note is not trashed, this field is not set (and the trashed field is `false`). */
  trashTime?: string;
  /** Output only. `true` if this note has been trashed. If trashed, the note is eventually deleted. */
  trashed?: boolean;
  /** Output only. The attachments attached to this note. */
  attachments?: Array<Attachment>;
  /** Output only. The list of permissions set on the note. Contains at least one entry for the note owner. */
  permissions?: Array<Permission>;
  /** The title of the note. Length must be less than 1,000 characters. */
  title?: string;
  /** The body of the note. */
  body?: Section;
}

export const Note: Schema.Schema<Note> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  trashTime: Schema.optional(Schema.String),
  trashed: Schema.optional(Schema.Boolean),
  attachments: Schema.optional(Schema.Array(Attachment)),
  permissions: Schema.optional(Schema.Array(Permission)),
  title: Schema.optional(Schema.String),
  body: Schema.optional(Section),
})).annotate({ identifier: "Note" }) as any as Schema.Schema<Note>;

export interface ListNotesResponse {
  /** A page of notes. */
  notes?: Array<Note>;
  /** Next page's `page_token` field. */
  nextPageToken?: string;
}

export const ListNotesResponse: Schema.Schema<ListNotesResponse> = Schema.suspend(() => Schema.Struct({
  notes: Schema.optional(Schema.Array(Note)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNotesResponse" }) as any as Schema.Schema<ListNotesResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CreatePermissionRequest {
  /** Required. The parent note where this permission will be created. Format: `notes/{note}` */
  parent?: string;
  /** Required. The permission to create. One of Permission.email, User.email or Group.email must be supplied. */
  permission?: Permission;
}

export const CreatePermissionRequest: Schema.Schema<CreatePermissionRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  permission: Schema.optional(Permission),
})).annotate({ identifier: "CreatePermissionRequest" }) as any as Schema.Schema<CreatePermissionRequest>;

export interface BatchCreatePermissionsRequest {
  /** The request message specifying the resources to create. */
  requests?: Array<CreatePermissionRequest>;
}

export const BatchCreatePermissionsRequest: Schema.Schema<BatchCreatePermissionsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(CreatePermissionRequest)),
})).annotate({ identifier: "BatchCreatePermissionsRequest" }) as any as Schema.Schema<BatchCreatePermissionsRequest>;

export interface BatchCreatePermissionsResponse {
  /** Permissions created. */
  permissions?: Array<Permission>;
}

export const BatchCreatePermissionsResponse: Schema.Schema<BatchCreatePermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Permission)),
})).annotate({ identifier: "BatchCreatePermissionsResponse" }) as any as Schema.Schema<BatchCreatePermissionsResponse>;

export interface BatchDeletePermissionsRequest {
  /** Required. The names of the permissions to delete. Format: `notes/{note}/permissions/{permission}` */
  names?: Array<string>;
}

export const BatchDeletePermissionsRequest: Schema.Schema<BatchDeletePermissionsRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchDeletePermissionsRequest" }) as any as Schema.Schema<BatchDeletePermissionsRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a new note. */
export interface CreateNotesRequest {
  /** Request body */
  body?: Note;
}

export const CreateNotesRequest = Schema.Struct({
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/notes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNotesRequest>;

export type CreateNotesResponse = Note;
export const CreateNotesResponse = Note;

export type CreateNotesError = CommonErrors;

export const createNotes: API.OperationMethod<CreateNotesRequest, CreateNotesResponse, CreateNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNotesRequest,
  output: CreateNotesResponse,
  errors: [],
}));

/** Gets a note. */
export interface GetNotesRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/notes/{notesId}" }),
  svc,
) as unknown as Schema.Schema<GetNotesRequest>;

export type GetNotesResponse = Note;
export const GetNotesResponse = Note;

export type GetNotesError = CommonErrors;

export const getNotes: API.OperationMethod<GetNotesRequest, GetNotesResponse, GetNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNotesRequest,
  output: GetNotesResponse,
  errors: [],
}));

/** Lists notes. Every list call returns a page of results with `page_size` as the upper bound of returned items. A `page_size` of zero allows the server to choose the upper bound. The ListNotesResponse contains at most `page_size` entries. If there are more things left to list, it provides a `next_page_token` value. (Page tokens are opaque values.) To get the next page of results, copy the result's `next_page_token` into the next request's `page_token`. Repeat until the `next_page_token` returned with a page of results is empty. ListNotes return consistent results in the face of concurrent changes, or signals that it cannot with an ABORTED error. */
export interface ListNotesRequest {
  /** The maximum number of results to return. */
  pageSize?: number;
  /** The previous page's `next_page_token` field. */
  pageToken?: string;
  /** Filter for list results. If no filter is supplied, the `trashed` filter is applied by default. Valid fields to filter by are: `create_time`, `update_time`, `trash_time`, and `trashed`. Filter syntax follows the [Google AIP filtering spec](https://aip.dev/160). */
  filter?: string;
}

export const ListNotesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/notes" }),
  svc,
) as unknown as Schema.Schema<ListNotesRequest>;

export type ListNotesResponse_Op = ListNotesResponse;
export const ListNotesResponse_Op = ListNotesResponse;

export type ListNotesError = CommonErrors;

export const listNotes = API.makePaginated(() => ({
  input: ListNotesRequest,
  output: ListNotesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a note. Caller must have the `OWNER` role on the note to delete. Deleting a note removes the resource immediately and cannot be undone. Any collaborators will lose access to the note. */
export interface DeleteNotesRequest {
  /** Required. Name of the note to delete. */
  name: string;
}

export const DeleteNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/notes/{notesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNotesRequest>;

export type DeleteNotesResponse = Empty;
export const DeleteNotesResponse = Empty;

export type DeleteNotesError = CommonErrors;

export const deleteNotes: API.OperationMethod<DeleteNotesRequest, DeleteNotesResponse, DeleteNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNotesRequest,
  output: DeleteNotesResponse,
  errors: [],
}));

/** Creates one or more permissions on the note. Only permissions with the `WRITER` role may be created. If adding any permission fails, then the entire request fails and no changes are made. */
export interface BatchCreateNotesPermissionsRequest {
  /** The parent resource shared by all Permissions being created. Format: `notes/{note}` If this is set, the parent field in the CreatePermission messages must either be empty or match this field. */
  parent: string;
  /** Request body */
  body?: BatchCreatePermissionsRequest;
}

export const BatchCreateNotesPermissionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreatePermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/notes/{notesId}/permissions:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateNotesPermissionsRequest>;

export type BatchCreateNotesPermissionsResponse = BatchCreatePermissionsResponse;
export const BatchCreateNotesPermissionsResponse = BatchCreatePermissionsResponse;

export type BatchCreateNotesPermissionsError = CommonErrors;

export const batchCreateNotesPermissions: API.OperationMethod<BatchCreateNotesPermissionsRequest, BatchCreateNotesPermissionsResponse, BatchCreateNotesPermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateNotesPermissionsRequest,
  output: BatchCreateNotesPermissionsResponse,
  errors: [],
}));

/** Deletes one or more permissions on the note. The specified entities will immediately lose access. A permission with the `OWNER` role can't be removed. If removing a permission fails, then the entire request fails and no changes are made. Returns a 400 bad request error if a specified permission does not exist on the note. */
export interface BatchDeleteNotesPermissionsRequest {
  /** The parent resource shared by all permissions being deleted. Format: `notes/{note}` If this is set, the parent of all of the permissions specified in the DeletePermissionRequest messages must match this field. */
  parent: string;
  /** Request body */
  body?: BatchDeletePermissionsRequest;
}

export const BatchDeleteNotesPermissionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchDeletePermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/notes/{notesId}/permissions:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteNotesPermissionsRequest>;

export type BatchDeleteNotesPermissionsResponse = Empty;
export const BatchDeleteNotesPermissionsResponse = Empty;

export type BatchDeleteNotesPermissionsError = CommonErrors;

export const batchDeleteNotesPermissions: API.OperationMethod<BatchDeleteNotesPermissionsRequest, BatchDeleteNotesPermissionsResponse, BatchDeleteNotesPermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteNotesPermissionsRequest,
  output: BatchDeleteNotesPermissionsResponse,
  errors: [],
}));

/** Gets an attachment. To download attachment media via REST requires the alt=media query parameter. Returns a 400 bad request error if attachment media is not available in the requested MIME type. */
export interface DownloadMediaRequest {
  /** Required. The name of the attachment. */
  name: string;
  /** The IANA MIME type format requested. The requested MIME type must be one specified in the attachment.mime_type. Required when downloading attachment media and ignored otherwise. */
  mimeType?: string;
}

export const DownloadMediaRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  mimeType: Schema.optional(Schema.String).pipe(T.HttpQuery("mimeType")),
}).pipe(
  T.Http({ method: "GET", path: "v1/notes/{notesId}/attachments/{attachmentsId}" }),
  svc,
) as unknown as Schema.Schema<DownloadMediaRequest>;

export type DownloadMediaResponse = Attachment;
export const DownloadMediaResponse = Attachment;

export type DownloadMediaError = CommonErrors;

export const downloadMedia: API.OperationMethod<DownloadMediaRequest, DownloadMediaResponse, DownloadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));

