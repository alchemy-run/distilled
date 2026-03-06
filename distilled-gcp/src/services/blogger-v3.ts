// ==========================================================================
// Blogger API (blogger v3)
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
  name: "blogger",
  version: "v3",
  rootUrl: "https://blogger.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Comment {
  /** Data about the post containing this comment. */
  post?: { id?: string };
  /** Data about the blog containing this comment. */
  blog?: { id?: string };
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The status of the comment (only populated for admin users). */
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {});
  /** The author of this Comment. */
  author?: { displayName?: string; image?: { url?: string }; id?: string; url?: string };
  /** Data about the comment this is in reply to. */
  inReplyTo?: { id?: string };
  /** RFC 3339 date-time when this comment was published. */
  published?: string;
  /** RFC 3339 date-time when this comment was last updated. */
  updated?: string;
  /** The actual content of the comment. May include HTML markup. */
  content?: string;
  /** The kind of this entry. Always blogger#comment. */
  kind?: string;
  /** The identifier for this resource. */
  id?: string;
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() => Schema.Struct({
  post: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  blog: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  selfLink: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  author: Schema.optional(Schema.Struct({ displayName: Schema.optional(Schema.String), image: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String) })), id: Schema.optional(Schema.String), url: Schema.optional(Schema.String) })),
  inReplyTo: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  published: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface Post {
  /** The identifier of this Post. */
  id?: string;
  /** The title of the Post. */
  title?: string;
  /** Etag of the resource. */
  etag?: string;
  /** Comment control and display setting for readers of this post. */
  readerComments?: "ALLOW" | "DONT_ALLOW_SHOW_EXISTING" | "DONT_ALLOW_HIDE_EXISTING" | (string & {});
  /** Status of the post. Only set for admin-level requests. */
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {});
  /** The title link URL, similar to atom's related link. */
  titleLink?: string;
  /** The JSON meta-data for the Post. */
  customMetaData?: string;
  /** The kind of this entity. Always blogger#post. */
  kind?: string;
  /** The URL where this Post is displayed. */
  url?: string;
  /** The content of the Post. May contain HTML markup. */
  content?: string;
  /** RFC 3339 date-time when this Post was published. */
  published?: string;
  /** RFC 3339 date-time when this Post was last updated. */
  updated?: string;
  /** The author of this Post. */
  author?: { displayName?: string; image?: { url?: string }; id?: string; url?: string };
  /** The container of comments on this Post. */
  replies?: { selfLink?: string; items?: Array<Comment>; totalItems?: string };
  /** Data about the blog containing this Post. */
  blog?: { id?: string };
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** Display image for the Post. */
  images?: Array<{ url?: string }>;
  /** The list of labels this Post was tagged with. */
  labels?: Array<string>;
  /** RFC 3339 date-time when this Post was last trashed. */
  trashed?: string;
  /** The location for geotagged posts. */
  location?: { lat?: number; span?: string; name?: string; lng?: number };
}

export const Post: Schema.Schema<Post> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  readerComments: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  titleLink: Schema.optional(Schema.String),
  customMetaData: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  published: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  author: Schema.optional(Schema.Struct({ displayName: Schema.optional(Schema.String), image: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String) })), id: Schema.optional(Schema.String), url: Schema.optional(Schema.String) })),
  replies: Schema.optional(Schema.Struct({ selfLink: Schema.optional(Schema.String), items: Schema.optional(Schema.Array(Comment)), totalItems: Schema.optional(Schema.String) })),
  blog: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  selfLink: Schema.optional(Schema.String),
  images: Schema.optional(Schema.Array(Schema.Struct({ url: Schema.optional(Schema.String) }))),
  labels: Schema.optional(Schema.Array(Schema.String)),
  trashed: Schema.optional(Schema.String),
  location: Schema.optional(Schema.Struct({ lat: Schema.optional(Schema.Number), span: Schema.optional(Schema.String), name: Schema.optional(Schema.String), lng: Schema.optional(Schema.Number) })),
})).annotate({ identifier: "Post" }) as any as Schema.Schema<Post>;

export interface Blog {
  /** The identifier for this resource. */
  id?: string;
  /** The JSON custom meta-data for the Blog. */
  customMetaData?: string;
  /** The container of pages in this blog. */
  pages?: { totalItems?: number; selfLink?: string };
  /** The name of this blog. This is displayed as the title. */
  name?: string;
  /** The status of the blog. */
  status?: "LIVE" | "DELETED" | (string & {});
  /** The locale this Blog is set to. */
  locale?: { variant?: string; language?: string; country?: string };
  /** The URL where this blog is published. */
  url?: string;
  /** RFC 3339 date-time when this blog was last updated. */
  updated?: string;
  /** RFC 3339 date-time when this blog was published. */
  published?: string;
  /** The kind of this entry. Always blogger#blog. */
  kind?: string;
  /** The container of posts in this blog. */
  posts?: { items?: Array<Post>; totalItems?: number; selfLink?: string };
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The description of this blog. This is displayed underneath the title. */
  description?: string;
}

export const Blog: Schema.Schema<Blog> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  customMetaData: Schema.optional(Schema.String),
  pages: Schema.optional(Schema.Struct({ totalItems: Schema.optional(Schema.Number), selfLink: Schema.optional(Schema.String) })),
  name: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.Struct({ variant: Schema.optional(Schema.String), language: Schema.optional(Schema.String), country: Schema.optional(Schema.String) })),
  url: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  published: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  posts: Schema.optional(Schema.Struct({ items: Schema.optional(Schema.Array(Post)), totalItems: Schema.optional(Schema.Number), selfLink: Schema.optional(Schema.String) })),
  selfLink: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Blog" }) as any as Schema.Schema<Blog>;

export interface PostList {
  /** The list of Posts for this Blog. */
  items?: Array<Post>;
  /** The kind of this entity. Always blogger#postList. */
  kind?: string;
  /** Pagination token to fetch the previous page, if one exists. */
  prevPageToken?: string;
  /** Etag of the response. */
  etag?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
}

export const PostList: Schema.Schema<PostList> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Post)),
  kind: Schema.optional(Schema.String),
  prevPageToken: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "PostList" }) as any as Schema.Schema<PostList>;

export interface BlogPerUserInfo {
  /** The kind of this entity. Always blogger#blogPerUserInfo. */
  kind?: string;
  /** True if the user has Admin level access to the blog. */
  hasAdminAccess?: boolean;
  /** ID of the Blog resource. */
  blogId?: string;
  /** Access permissions that the user has for the blog (ADMIN, AUTHOR, or READER). */
  role?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  /** ID of the User. */
  userId?: string;
  /** The Photo Album Key for the user when adding photos to the blog. */
  photosAlbumKey?: string;
}

export const BlogPerUserInfo: Schema.Schema<BlogPerUserInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  hasAdminAccess: Schema.optional(Schema.Boolean),
  blogId: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  photosAlbumKey: Schema.optional(Schema.String),
})).annotate({ identifier: "BlogPerUserInfo" }) as any as Schema.Schema<BlogPerUserInfo>;

export interface BlogUserInfo {
  /** The kind of this entity. Always blogger#blogUserInfo. */
  kind?: string;
  /** Information about a User for the Blog. */
  blog_user_info?: BlogPerUserInfo;
  /** The Blog resource. */
  blog?: Blog;
}

export const BlogUserInfo: Schema.Schema<BlogUserInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  blog_user_info: Schema.optional(BlogPerUserInfo),
  blog: Schema.optional(Blog),
})).annotate({ identifier: "BlogUserInfo" }) as any as Schema.Schema<BlogUserInfo>;

export interface Pageviews {
  /** The container of posts in this blog. */
  counts?: Array<{ count?: string; timeRange?: "ALL_TIME" | "THIRTY_DAYS" | "SEVEN_DAYS" | (string & {}) }>;
  /** Blog Id. */
  blogId?: string;
  /** The kind of this entry. Always blogger#page_views. */
  kind?: string;
}

export const Pageviews: Schema.Schema<Pageviews> = Schema.suspend(() => Schema.Struct({
  counts: Schema.optional(Schema.Array(Schema.Struct({ count: Schema.optional(Schema.String), timeRange: Schema.optional(Schema.String) }))),
  blogId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Pageviews" }) as any as Schema.Schema<Pageviews>;

export interface PostPerUserInfo {
  /** The kind of this entity. Always blogger#postPerUserInfo. */
  kind?: string;
  /** ID of the Post resource. */
  postId?: string;
  /** ID of the Blog that the post resource belongs to. */
  blogId?: string;
  /** ID of the User. */
  userId?: string;
  /** True if the user has Author level access to the post. */
  hasEditAccess?: boolean;
}

export const PostPerUserInfo: Schema.Schema<PostPerUserInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  postId: Schema.optional(Schema.String),
  blogId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  hasEditAccess: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PostPerUserInfo" }) as any as Schema.Schema<PostPerUserInfo>;

export interface PostUserInfo {
  /** The kind of this entity. Always blogger#postUserInfo. */
  kind?: string;
  /** Information about a User for the Post. */
  post_user_info?: PostPerUserInfo;
  /** The Post resource. */
  post?: Post;
}

export const PostUserInfo: Schema.Schema<PostUserInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  post_user_info: Schema.optional(PostPerUserInfo),
  post: Schema.optional(Post),
})).annotate({ identifier: "PostUserInfo" }) as any as Schema.Schema<PostUserInfo>;

export interface PostUserInfosList {
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** The list of Posts with User information for the post, for this Blog. */
  items?: Array<PostUserInfo>;
  /** The kind of this entity. Always blogger#postList. */
  kind?: string;
}

export const PostUserInfosList: Schema.Schema<PostUserInfosList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(PostUserInfo)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PostUserInfosList" }) as any as Schema.Schema<PostUserInfosList>;

export interface Page {
  /** RFC 3339 date-time when this Page was published. */
  published?: string;
  /** RFC 3339 date-time when this Page was last updated. */
  updated?: string;
  /** The URL that this Page is displayed at. */
  url?: string;
  /** The body content of this Page, in HTML. */
  content?: string;
  /** The kind of this entity. Always blogger#page. */
  kind?: string;
  /** RFC 3339 date-time when this Page was trashed. */
  trashed?: string;
  /** Data about the blog containing this Page. */
  blog?: { id?: string };
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The author of this Page. */
  author?: { id?: string; url?: string; displayName?: string; image?: { url?: string } };
  /** Etag of the resource. */
  etag?: string;
  /** The title of this entity. This is the name displayed in the Admin user interface. */
  title?: string;
  /** The identifier for this resource. */
  id?: string;
  /** The status of the page for admin resources (either LIVE or DRAFT). */
  status?: "LIVE" | "DRAFT" | "SOFT_TRASHED" | (string & {});
}

export const Page: Schema.Schema<Page> = Schema.suspend(() => Schema.Struct({
  published: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  trashed: Schema.optional(Schema.String),
  blog: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  selfLink: Schema.optional(Schema.String),
  author: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String), url: Schema.optional(Schema.String), displayName: Schema.optional(Schema.String), image: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String) })) })),
  etag: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface CommentList {
  /** Etag of the response. */
  etag?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** The kind of this entry. Always blogger#commentList. */
  kind?: string;
  /** Pagination token to fetch the previous page, if one exists. */
  prevPageToken?: string;
  /** The List of Comments for a Post. */
  items?: Array<Comment>;
}

export const CommentList: Schema.Schema<CommentList> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  prevPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Comment)),
})).annotate({ identifier: "CommentList" }) as any as Schema.Schema<CommentList>;

export interface PageList {
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** The list of Pages for a Blog. */
  items?: Array<Page>;
  /** Etag of the response. */
  etag?: string;
  /** The kind of this entity. Always blogger#pageList. */
  kind?: string;
}

export const PageList: Schema.Schema<PageList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Page)),
  etag: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PageList" }) as any as Schema.Schema<PageList>;

export interface BlogList {
  /** The list of Blogs this user has Authorship or Admin rights over. */
  items?: Array<Blog>;
  /** Admin level list of blog per-user information. */
  blogUserInfos?: Array<BlogUserInfo>;
  /** The kind of this entity. Always blogger#blogList. */
  kind?: string;
}

export const BlogList: Schema.Schema<BlogList> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Blog)),
  blogUserInfos: Schema.optional(Schema.Array(BlogUserInfo)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "BlogList" }) as any as Schema.Schema<BlogList>;

export interface User {
  /** The container of blogs for this user. */
  blogs?: { selfLink?: string };
  /** Profile summary information. */
  about?: string;
  /** The user's profile page. */
  url?: string;
  /** The kind of this entity. Always blogger#user. */
  kind?: string;
  /** The timestamp of when this profile was created, in seconds since epoch. */
  created?: string;
  /** The display name. */
  displayName?: string;
  /** The identifier for this User. */
  id?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** This user's locale */
  locale?: { language?: string; country?: string; variant?: string };
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  blogs: Schema.optional(Schema.Struct({ selfLink: Schema.optional(Schema.String) })),
  about: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.Struct({ language: Schema.optional(Schema.String), country: Schema.optional(Schema.String), variant: Schema.optional(Schema.String) })),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListPagesRequest {
  blogId: string;
  pageToken?: string;
  status?: "LIVE" | "DRAFT" | "SOFT_TRASHED" | (string & {})[];
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  fetchBodies?: boolean;
  maxResults?: number;
}

export const ListPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pages" }),
  svc,
) as unknown as Schema.Schema<ListPagesRequest>;

export type ListPagesResponse = PageList;
export const ListPagesResponse = PageList;

export type ListPagesError = CommonErrors;

/** Lists pages. */
export const listPages: API.PaginatedOperationMethod<ListPagesRequest, ListPagesResponse, ListPagesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListPagesRequest,
  output: ListPagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface UpdatePagesRequest {
  blogId: string;
  publish?: boolean;
  pageId: string;
  revert?: boolean;
  /** Request body */
  body?: Page;
}

export const UpdatePagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  body: Schema.optional(Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v3/blogs/{blogId}/pages/{pageId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePagesRequest>;

export type UpdatePagesResponse = Page;
export const UpdatePagesResponse = Page;

export type UpdatePagesError = CommonErrors;

/** Updates a page by blog id and page id. */
export const updatePages: API.OperationMethod<UpdatePagesRequest, UpdatePagesResponse, UpdatePagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePagesRequest,
  output: UpdatePagesResponse,
  errors: [],
}));

export interface GetPagesRequest {
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  blogId: string;
  pageId: string;
}

export const GetPagesRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<GetPagesRequest>;

export type GetPagesResponse = Page;
export const GetPagesResponse = Page;

export type GetPagesError = CommonErrors;

/** Gets a page by blog id and page id. */
export const getPages: API.OperationMethod<GetPagesRequest, GetPagesResponse, GetPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPagesRequest,
  output: GetPagesResponse,
  errors: [],
}));

export interface RevertPagesRequest {
  blogId: string;
  pageId: string;
}

export const RevertPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/pages/{pageId}/revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertPagesRequest>;

export type RevertPagesResponse = Page;
export const RevertPagesResponse = Page;

export type RevertPagesError = CommonErrors;

/** Reverts a published or scheduled page to draft state. */
export const revertPages: API.OperationMethod<RevertPagesRequest, RevertPagesResponse, RevertPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertPagesRequest,
  output: RevertPagesResponse,
  errors: [],
}));

export interface InsertPagesRequest {
  blogId: string;
  isDraft?: boolean;
  /** Request body */
  body?: Page;
}

export const InsertPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  isDraft: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("isDraft")),
  body: Schema.optional(Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/pages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPagesRequest>;

export type InsertPagesResponse = Page;
export const InsertPagesResponse = Page;

export type InsertPagesError = CommonErrors;

/** Inserts a page. */
export const insertPages: API.OperationMethod<InsertPagesRequest, InsertPagesResponse, InsertPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPagesRequest,
  output: InsertPagesResponse,
  errors: [],
}));

export interface PatchPagesRequest {
  revert?: boolean;
  pageId: string;
  blogId: string;
  publish?: boolean;
  /** Request body */
  body?: Page;
}

export const PatchPagesRequest = Schema.Struct({
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  body: Schema.optional(Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/blogs/{blogId}/pages/{pageId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPagesRequest>;

export type PatchPagesResponse = Page;
export const PatchPagesResponse = Page;

export type PatchPagesError = CommonErrors;

/** Patches a page. */
export const patchPages: API.OperationMethod<PatchPagesRequest, PatchPagesResponse, PatchPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPagesRequest,
  output: PatchPagesResponse,
  errors: [],
}));

export interface PublishPagesRequest {
  pageId: string;
  blogId: string;
}

export const PublishPagesRequest = Schema.Struct({
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/pages/{pageId}/publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishPagesRequest>;

export type PublishPagesResponse = Page;
export const PublishPagesResponse = Page;

export type PublishPagesError = CommonErrors;

/** Publishes a page. */
export const publishPages: API.OperationMethod<PublishPagesRequest, PublishPagesResponse, PublishPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishPagesRequest,
  output: PublishPagesResponse,
  errors: [],
}));

export interface DeletePagesRequest {
  pageId: string;
  /** Move to Trash if possible */
  useTrash?: boolean;
  blogId: string;
}

export const DeletePagesRequest = Schema.Struct({
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  useTrash: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useTrash")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/blogs/{blogId}/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<DeletePagesRequest>;

export interface DeletePagesResponse {}
export const DeletePagesResponse: Schema.Schema<DeletePagesResponse> = Schema.Struct({}) as any as Schema.Schema<DeletePagesResponse>;

export type DeletePagesError = CommonErrors;

/** Deletes a page by blog id and page id. */
export const deletePages: API.OperationMethod<DeletePagesRequest, DeletePagesResponse, DeletePagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePagesRequest,
  output: DeletePagesResponse,
  errors: [],
}));

export interface GetBlogUserInfosRequest {
  maxPosts?: number;
  userId: string;
  blogId: string;
}

export const GetBlogUserInfosRequest = Schema.Struct({
  maxPosts: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxPosts")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}" }),
  svc,
) as unknown as Schema.Schema<GetBlogUserInfosRequest>;

export type GetBlogUserInfosResponse = BlogUserInfo;
export const GetBlogUserInfosResponse = BlogUserInfo;

export type GetBlogUserInfosError = CommonErrors;

/** Gets one blog and user info pair by blog id and user id. */
export const getBlogUserInfos: API.OperationMethod<GetBlogUserInfosRequest, GetBlogUserInfosResponse, GetBlogUserInfosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBlogUserInfosRequest,
  output: GetBlogUserInfosResponse,
  errors: [],
}));

export interface GetPageViewsRequest {
  blogId: string;
  range?: "all" | "30DAYS" | "7DAYS" | (string & {})[];
}

export const GetPageViewsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  range: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("range")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pageviews" }),
  svc,
) as unknown as Schema.Schema<GetPageViewsRequest>;

export type GetPageViewsResponse = Pageviews;
export const GetPageViewsResponse = Pageviews;

export type GetPageViewsError = CommonErrors;

/** Gets page views by blog id. */
export const getPageViews: API.OperationMethod<GetPageViewsRequest, GetPageViewsResponse, GetPageViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPageViewsRequest,
  output: GetPageViewsResponse,
  errors: [],
}));

export interface GetUsersRequest {
  userId: string;
}

export const GetUsersRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersRequest>;

export type GetUsersResponse = User;
export const GetUsersResponse = User;

export type GetUsersError = CommonErrors;

/** Gets one user by user_id. */
export const getUsers: API.OperationMethod<GetUsersRequest, GetUsersResponse, GetUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersRequest,
  output: GetUsersResponse,
  errors: [],
}));

export interface RemoveContentCommentsRequest {
  blogId: string;
  commentId: string;
  postId: string;
}

export const RemoveContentCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/removecontent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveContentCommentsRequest>;

export type RemoveContentCommentsResponse = Comment;
export const RemoveContentCommentsResponse = Comment;

export type RemoveContentCommentsError = CommonErrors;

/** Removes the content of a comment by blog id, post id and comment id. */
export const removeContentComments: API.OperationMethod<RemoveContentCommentsRequest, RemoveContentCommentsResponse, RemoveContentCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveContentCommentsRequest,
  output: RemoveContentCommentsResponse,
  errors: [],
}));

export interface ListCommentsRequest {
  pageToken?: string;
  blogId: string;
  postId: string;
  startDate?: string;
  fetchBodies?: boolean;
  maxResults?: number;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {});
  endDate?: string;
}

export const ListCommentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListCommentsRequest>;

export type ListCommentsResponse = CommentList;
export const ListCommentsResponse = CommentList;

export type ListCommentsError = CommonErrors;

/** Lists comments. */
export const listComments: API.PaginatedOperationMethod<ListCommentsRequest, ListCommentsResponse, ListCommentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetCommentsRequest {
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  blogId: string;
  postId: string;
  commentId: string;
}

export const GetCommentsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}" }),
  svc,
) as unknown as Schema.Schema<GetCommentsRequest>;

export type GetCommentsResponse = Comment;
export const GetCommentsResponse = Comment;

export type GetCommentsError = CommonErrors;

/** Gets a comment by id. */
export const getComments: API.OperationMethod<GetCommentsRequest, GetCommentsResponse, GetCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCommentsRequest,
  output: GetCommentsResponse,
  errors: [],
}));

export interface ListByBlogCommentsRequest {
  maxResults?: number;
  startDate?: string;
  endDate?: string;
  fetchBodies?: boolean;
  pageToken?: string;
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {})[];
  blogId: string;
}

export const ListByBlogCommentsRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListByBlogCommentsRequest>;

export type ListByBlogCommentsResponse = CommentList;
export const ListByBlogCommentsResponse = CommentList;

export type ListByBlogCommentsError = CommonErrors;

/** Lists comments by blog. */
export const listByBlogComments: API.PaginatedOperationMethod<ListByBlogCommentsRequest, ListByBlogCommentsResponse, ListByBlogCommentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListByBlogCommentsRequest,
  output: ListByBlogCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface MarkAsSpamCommentsRequest {
  blogId: string;
  postId: string;
  commentId: string;
}

export const MarkAsSpamCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/spam", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkAsSpamCommentsRequest>;

export type MarkAsSpamCommentsResponse = Comment;
export const MarkAsSpamCommentsResponse = Comment;

export type MarkAsSpamCommentsError = CommonErrors;

/** Marks a comment as spam by blog id, post id and comment id. */
export const markAsSpamComments: API.OperationMethod<MarkAsSpamCommentsRequest, MarkAsSpamCommentsResponse, MarkAsSpamCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MarkAsSpamCommentsRequest,
  output: MarkAsSpamCommentsResponse,
  errors: [],
}));

export interface DeleteCommentsRequest {
  blogId: string;
  postId: string;
  commentId: string;
}

export const DeleteCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCommentsRequest>;

export interface DeleteCommentsResponse {}
export const DeleteCommentsResponse: Schema.Schema<DeleteCommentsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteCommentsResponse>;

export type DeleteCommentsError = CommonErrors;

/** Deletes a comment by blog id, post id and comment id. */
export const deleteComments: API.OperationMethod<DeleteCommentsRequest, DeleteCommentsResponse, DeleteCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCommentsRequest,
  output: DeleteCommentsResponse,
  errors: [],
}));

export interface ApproveCommentsRequest {
  blogId: string;
  postId: string;
  commentId: string;
}

export const ApproveCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveCommentsRequest>;

export type ApproveCommentsResponse = Comment;
export const ApproveCommentsResponse = Comment;

export type ApproveCommentsError = CommonErrors;

/** Marks a comment as not spam by blog id, post id and comment id. */
export const approveComments: API.OperationMethod<ApproveCommentsRequest, ApproveCommentsResponse, ApproveCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveCommentsRequest,
  output: ApproveCommentsResponse,
  errors: [],
}));

export interface GetByPathPostsRequest {
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  blogId: string;
  path: string;
  maxComments?: number;
}

export const GetByPathPostsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  path: Schema.String.pipe(T.HttpQuery("path")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/bypath" }),
  svc,
) as unknown as Schema.Schema<GetByPathPostsRequest>;

export type GetByPathPostsResponse = Post;
export const GetByPathPostsResponse = Post;

export type GetByPathPostsError = CommonErrors;

/** Gets a post by path. */
export const getByPathPosts: API.OperationMethod<GetByPathPostsRequest, GetByPathPostsResponse, GetByPathPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetByPathPostsRequest,
  output: GetByPathPostsResponse,
  errors: [],
}));

export interface RevertPostsRequest {
  blogId: string;
  postId: string;
}

export const RevertPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts/{postId}/revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertPostsRequest>;

export type RevertPostsResponse = Post;
export const RevertPostsResponse = Post;

export type RevertPostsError = CommonErrors;

/** Reverts a published or scheduled post to draft state. */
export const revertPosts: API.OperationMethod<RevertPostsRequest, RevertPostsResponse, RevertPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertPostsRequest,
  output: RevertPostsResponse,
  errors: [],
}));

export interface SearchPostsRequest {
  fetchBodies?: boolean;
  blogId: string;
  q: string;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
}

export const SearchPostsRequest = Schema.Struct({
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  q: Schema.String.pipe(T.HttpQuery("q")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/search" }),
  svc,
) as unknown as Schema.Schema<SearchPostsRequest>;

export type SearchPostsResponse = PostList;
export const SearchPostsResponse = PostList;

export type SearchPostsError = CommonErrors;

/** Searches for posts matching given query terms in the specified blog. */
export const searchPosts: API.OperationMethod<SearchPostsRequest, SearchPostsResponse, SearchPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchPostsRequest,
  output: SearchPostsResponse,
  errors: [],
}));

export interface PublishPostsRequest {
  blogId: string;
  publishDate?: string;
  postId: string;
}

export const PublishPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publishDate: Schema.optional(Schema.String).pipe(T.HttpQuery("publishDate")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts/{postId}/publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishPostsRequest>;

export type PublishPostsResponse = Post;
export const PublishPostsResponse = Post;

export type PublishPostsError = CommonErrors;

/** Publishes a post. */
export const publishPosts: API.OperationMethod<PublishPostsRequest, PublishPostsResponse, PublishPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishPostsRequest,
  output: PublishPostsResponse,
  errors: [],
}));

export interface DeletePostsRequest {
  blogId: string;
  postId: string;
  /** Move to Trash if possible */
  useTrash?: boolean;
}

export const DeletePostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  useTrash: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useTrash")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<DeletePostsRequest>;

export interface DeletePostsResponse {}
export const DeletePostsResponse: Schema.Schema<DeletePostsResponse> = Schema.Struct({}) as any as Schema.Schema<DeletePostsResponse>;

export type DeletePostsError = CommonErrors;

/** Deletes a post by blog id and post id. */
export const deletePosts: API.OperationMethod<DeletePostsRequest, DeletePostsResponse, DeletePostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePostsRequest,
  output: DeletePostsResponse,
  errors: [],
}));

export interface ListPostsRequest {
  pageToken?: string;
  /** Sort direction applied to post list. */
  sortOption?: "SORT_OPTION_UNSPECIFIED" | "DESCENDING" | "ASCENDING" | (string & {});
  blogId: string;
  startDate?: string;
  fetchBodies?: boolean;
  labels?: string;
  maxResults?: number;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  fetchImages?: boolean;
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {})[];
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  endDate?: string;
}

export const ListPostsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortOption: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOption")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  labels: Schema.optional(Schema.String).pipe(T.HttpQuery("labels")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts" }),
  svc,
) as unknown as Schema.Schema<ListPostsRequest>;

export type ListPostsResponse = PostList;
export const ListPostsResponse = PostList;

export type ListPostsError = CommonErrors;

/** Lists posts. */
export const listPosts: API.PaginatedOperationMethod<ListPostsRequest, ListPostsResponse, ListPostsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListPostsRequest,
  output: ListPostsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface UpdatePostsRequest {
  revert?: boolean;
  postId: string;
  blogId: string;
  publish?: boolean;
  fetchBody?: boolean;
  maxComments?: number;
  fetchImages?: boolean;
  /** Request body */
  body?: Post;
}

export const UpdatePostsRequest = Schema.Struct({
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  body: Schema.optional(Post).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v3/blogs/{blogId}/posts/{postId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePostsRequest>;

export type UpdatePostsResponse = Post;
export const UpdatePostsResponse = Post;

export type UpdatePostsError = CommonErrors;

/** Updates a post by blog id and post id. */
export const updatePosts: API.OperationMethod<UpdatePostsRequest, UpdatePostsResponse, UpdatePostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePostsRequest,
  output: UpdatePostsResponse,
  errors: [],
}));

export interface GetPostsRequest {
  fetchImages?: boolean;
  maxComments?: number;
  fetchBody?: boolean;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  blogId: string;
  postId: string;
}

export const GetPostsRequest = Schema.Struct({
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<GetPostsRequest>;

export type GetPostsResponse = Post;
export const GetPostsResponse = Post;

export type GetPostsError = CommonErrors;

/** Gets a post by blog id and post id */
export const getPosts: API.OperationMethod<GetPostsRequest, GetPostsResponse, GetPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPostsRequest,
  output: GetPostsResponse,
  errors: [],
}));

export interface InsertPostsRequest {
  fetchBody?: boolean;
  blogId: string;
  fetchImages?: boolean;
  isDraft?: boolean;
  /** Request body */
  body?: Post;
}

export const InsertPostsRequest = Schema.Struct({
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  isDraft: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("isDraft")),
  body: Schema.optional(Post).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPostsRequest>;

export type InsertPostsResponse = Post;
export const InsertPostsResponse = Post;

export type InsertPostsError = CommonErrors;

/** Inserts a post. */
export const insertPosts: API.OperationMethod<InsertPostsRequest, InsertPostsResponse, InsertPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPostsRequest,
  output: InsertPostsResponse,
  errors: [],
}));

export interface PatchPostsRequest {
  fetchImages?: boolean;
  maxComments?: number;
  fetchBody?: boolean;
  blogId: string;
  publish?: boolean;
  postId: string;
  revert?: boolean;
  /** Request body */
  body?: Post;
}

export const PatchPostsRequest = Schema.Struct({
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  body: Schema.optional(Post).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/blogs/{blogId}/posts/{postId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPostsRequest>;

export type PatchPostsResponse = Post;
export const PatchPostsResponse = Post;

export type PatchPostsError = CommonErrors;

/** Patches a post. */
export const patchPosts: API.OperationMethod<PatchPostsRequest, PatchPostsResponse, PatchPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPostsRequest,
  output: PatchPostsResponse,
  errors: [],
}));

export interface ListByUserBlogsRequest {
  fetchUserInfo?: boolean;
  /** Default value of status is LIVE. */
  status?: "LIVE" | "DELETED" | (string & {})[];
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  role?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {})[];
  userId: string;
}

export const ListByUserBlogsRequest = Schema.Struct({
  fetchUserInfo: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchUserInfo")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  role: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("role")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs" }),
  svc,
) as unknown as Schema.Schema<ListByUserBlogsRequest>;

export type ListByUserBlogsResponse = BlogList;
export const ListByUserBlogsResponse = BlogList;

export type ListByUserBlogsError = CommonErrors;

/** Lists blogs by user. */
export const listByUserBlogs: API.OperationMethod<ListByUserBlogsRequest, ListByUserBlogsResponse, ListByUserBlogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListByUserBlogsRequest,
  output: ListByUserBlogsResponse,
  errors: [],
}));

export interface GetBlogsRequest {
  maxPosts?: number;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  blogId: string;
}

export const GetBlogsRequest = Schema.Struct({
  maxPosts: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxPosts")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}" }),
  svc,
) as unknown as Schema.Schema<GetBlogsRequest>;

export type GetBlogsResponse = Blog;
export const GetBlogsResponse = Blog;

export type GetBlogsError = CommonErrors;

/** Gets a blog by id. */
export const getBlogs: API.OperationMethod<GetBlogsRequest, GetBlogsResponse, GetBlogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBlogsRequest,
  output: GetBlogsResponse,
  errors: [],
}));

export interface GetByUrlBlogsRequest {
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  url: string;
}

export const GetByUrlBlogsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  url: Schema.String.pipe(T.HttpQuery("url")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/byurl" }),
  svc,
) as unknown as Schema.Schema<GetByUrlBlogsRequest>;

export type GetByUrlBlogsResponse = Blog;
export const GetByUrlBlogsResponse = Blog;

export type GetByUrlBlogsError = CommonErrors;

/** Gets a blog by url. */
export const getByUrlBlogs: API.OperationMethod<GetByUrlBlogsRequest, GetByUrlBlogsResponse, GetByUrlBlogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetByUrlBlogsRequest,
  output: GetByUrlBlogsResponse,
  errors: [],
}));

export interface GetPostUserInfosRequest {
  maxComments?: number;
  postId: string;
  userId: string;
  blogId: string;
}

export const GetPostUserInfosRequest = Schema.Struct({
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<GetPostUserInfosRequest>;

export type GetPostUserInfosResponse = PostUserInfo;
export const GetPostUserInfosResponse = PostUserInfo;

export type GetPostUserInfosError = CommonErrors;

/** Gets one post and user info pair, by post_id and user_id. */
export const getPostUserInfos: API.OperationMethod<GetPostUserInfosRequest, GetPostUserInfosResponse, GetPostUserInfosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPostUserInfosRequest,
  output: GetPostUserInfosResponse,
  errors: [],
}));

export interface ListPostUserInfosRequest {
  fetchBodies?: boolean;
  startDate?: string;
  blogId: string;
  pageToken?: string;
  userId: string;
  endDate?: string;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {})[];
  maxResults?: number;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  labels?: string;
}

export const ListPostUserInfosRequest = Schema.Struct({
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  labels: Schema.optional(Schema.String).pipe(T.HttpQuery("labels")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}/posts" }),
  svc,
) as unknown as Schema.Schema<ListPostUserInfosRequest>;

export type ListPostUserInfosResponse = PostUserInfosList;
export const ListPostUserInfosResponse = PostUserInfosList;

export type ListPostUserInfosError = CommonErrors;

/** Lists post and user info pairs. */
export const listPostUserInfos: API.PaginatedOperationMethod<ListPostUserInfosRequest, ListPostUserInfosResponse, ListPostUserInfosError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListPostUserInfosRequest,
  output: ListPostUserInfosResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

