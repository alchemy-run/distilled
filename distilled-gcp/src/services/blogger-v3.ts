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
  /** The kind of this entry. Always blogger#comment. */
  kind?: string;
  /** The identifier for this resource. */
  id?: string;
  /** The status of the comment (only populated for admin users). */
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {});
  /** Data about the comment this is in reply to. */
  inReplyTo?: { id?: string };
  /** Data about the post containing this comment. */
  post?: { id?: string };
  /** Data about the blog containing this comment. */
  blog?: { id?: string };
  /** RFC 3339 date-time when this comment was published. */
  published?: string;
  /** RFC 3339 date-time when this comment was last updated. */
  updated?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The actual content of the comment. May include HTML markup. */
  content?: string;
  /** The author of this Comment. */
  author?: { id?: string; displayName?: string; url?: string; image?: { url?: string } };
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  inReplyTo: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  post: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  blog: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  published: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  author: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String), displayName: Schema.optional(Schema.String), url: Schema.optional(Schema.String), image: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String) })) })),
})).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface Post {
  /** The kind of this entity. Always blogger#post. */
  kind?: string;
  /** The identifier of this Post. */
  id?: string;
  /** Status of the post. Only set for admin-level requests. */
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {});
  /** Data about the blog containing this Post. */
  blog?: { id?: string };
  /** RFC 3339 date-time when this Post was published. */
  published?: string;
  /** RFC 3339 date-time when this Post was last updated. */
  updated?: string;
  /** RFC 3339 date-time when this Post was last trashed. */
  trashed?: string;
  /** The URL where this Post is displayed. */
  url?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The title of the Post. */
  title?: string;
  /** The title link URL, similar to atom's related link. */
  titleLink?: string;
  /** The content of the Post. May contain HTML markup. */
  content?: string;
  /** Display image for the Post. */
  images?: Array<{ url?: string }>;
  /** The JSON meta-data for the Post. */
  customMetaData?: string;
  /** The author of this Post. */
  author?: { id?: string; displayName?: string; url?: string; image?: { url?: string } };
  /** The container of comments on this Post. */
  replies?: { totalItems?: string; selfLink?: string; items?: Array<Comment> };
  /** The list of labels this Post was tagged with. */
  labels?: Array<string>;
  /** The location for geotagged posts. */
  location?: { name?: string; lat?: number; lng?: number; span?: string };
  /** Comment control and display setting for readers of this post. */
  readerComments?: "ALLOW" | "DONT_ALLOW_SHOW_EXISTING" | "DONT_ALLOW_HIDE_EXISTING" | (string & {});
  /** Etag of the resource. */
  etag?: string;
}

export const Post: Schema.Schema<Post> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  blog: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  published: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  trashed: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  titleLink: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  images: Schema.optional(Schema.Array(Schema.Struct({ url: Schema.optional(Schema.String) }))),
  customMetaData: Schema.optional(Schema.String),
  author: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String), displayName: Schema.optional(Schema.String), url: Schema.optional(Schema.String), image: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String) })) })),
  replies: Schema.optional(Schema.Struct({ totalItems: Schema.optional(Schema.String), selfLink: Schema.optional(Schema.String), items: Schema.optional(Schema.Array(Comment)) })),
  labels: Schema.optional(Schema.Array(Schema.String)),
  location: Schema.optional(Schema.Struct({ name: Schema.optional(Schema.String), lat: Schema.optional(Schema.Number), lng: Schema.optional(Schema.Number), span: Schema.optional(Schema.String) })),
  readerComments: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Post" }) as any as Schema.Schema<Post>;

export interface Blog {
  /** The kind of this entry. Always blogger#blog. */
  kind?: string;
  /** The identifier for this resource. */
  id?: string;
  /** The status of the blog. */
  status?: "LIVE" | "DELETED" | (string & {});
  /** The name of this blog. This is displayed as the title. */
  name?: string;
  /** The description of this blog. This is displayed underneath the title. */
  description?: string;
  /** RFC 3339 date-time when this blog was published. */
  published?: string;
  /** RFC 3339 date-time when this blog was last updated. */
  updated?: string;
  /** The URL where this blog is published. */
  url?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The JSON custom meta-data for the Blog. */
  customMetaData?: string;
  /** The container of posts in this blog. */
  posts?: { totalItems?: number; selfLink?: string; items?: Array<Post> };
  /** The container of pages in this blog. */
  pages?: { totalItems?: number; selfLink?: string };
  /** The locale this Blog is set to. */
  locale?: { language?: string; country?: string; variant?: string };
}

export const Blog: Schema.Schema<Blog> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  published: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  customMetaData: Schema.optional(Schema.String),
  posts: Schema.optional(Schema.Struct({ totalItems: Schema.optional(Schema.Number), selfLink: Schema.optional(Schema.String), items: Schema.optional(Schema.Array(Post)) })),
  pages: Schema.optional(Schema.Struct({ totalItems: Schema.optional(Schema.Number), selfLink: Schema.optional(Schema.String) })),
  locale: Schema.optional(Schema.Struct({ language: Schema.optional(Schema.String), country: Schema.optional(Schema.String), variant: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Blog" }) as any as Schema.Schema<Blog>;

export interface BlogPerUserInfo {
  /** The kind of this entity. Always blogger#blogPerUserInfo. */
  kind?: string;
  /** ID of the User. */
  userId?: string;
  /** ID of the Blog resource. */
  blogId?: string;
  /** The Photo Album Key for the user when adding photos to the blog. */
  photosAlbumKey?: string;
  /** True if the user has Admin level access to the blog. */
  hasAdminAccess?: boolean;
  /** Access permissions that the user has for the blog (ADMIN, AUTHOR, or READER). */
  role?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const BlogPerUserInfo: Schema.Schema<BlogPerUserInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  blogId: Schema.optional(Schema.String),
  photosAlbumKey: Schema.optional(Schema.String),
  hasAdminAccess: Schema.optional(Schema.Boolean),
  role: Schema.optional(Schema.String),
})).annotate({ identifier: "BlogPerUserInfo" }) as any as Schema.Schema<BlogPerUserInfo>;

export interface BlogUserInfo {
  /** The kind of this entity. Always blogger#blogUserInfo. */
  kind?: string;
  /** The Blog resource. */
  blog?: Blog;
  /** Information about a User for the Blog. */
  blog_user_info?: BlogPerUserInfo;
}

export const BlogUserInfo: Schema.Schema<BlogUserInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  blog: Schema.optional(Blog),
  blog_user_info: Schema.optional(BlogPerUserInfo),
})).annotate({ identifier: "BlogUserInfo" }) as any as Schema.Schema<BlogUserInfo>;

export interface Pageviews {
  /** The kind of this entry. Always blogger#page_views. */
  kind?: string;
  /** Blog Id. */
  blogId?: string;
  /** The container of posts in this blog. */
  counts?: Array<{ timeRange?: "ALL_TIME" | "THIRTY_DAYS" | "SEVEN_DAYS" | (string & {}); count?: string }>;
}

export const Pageviews: Schema.Schema<Pageviews> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  blogId: Schema.optional(Schema.String),
  counts: Schema.optional(Schema.Array(Schema.Struct({ timeRange: Schema.optional(Schema.String), count: Schema.optional(Schema.String) }))),
})).annotate({ identifier: "Pageviews" }) as any as Schema.Schema<Pageviews>;

export interface Page {
  /** The kind of this entity. Always blogger#page. */
  kind?: string;
  /** The identifier for this resource. */
  id?: string;
  /** The status of the page for admin resources (either LIVE or DRAFT). */
  status?: "LIVE" | "DRAFT" | "SOFT_TRASHED" | (string & {});
  /** Data about the blog containing this Page. */
  blog?: { id?: string };
  /** RFC 3339 date-time when this Page was published. */
  published?: string;
  /** RFC 3339 date-time when this Page was last updated. */
  updated?: string;
  /** RFC 3339 date-time when this Page was trashed. */
  trashed?: string;
  /** The URL that this Page is displayed at. */
  url?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The title of this entity. This is the name displayed in the Admin user interface. */
  title?: string;
  /** The body content of this Page, in HTML. */
  content?: string;
  /** The author of this Page. */
  author?: { id?: string; displayName?: string; url?: string; image?: { url?: string } };
  /** Etag of the resource. */
  etag?: string;
}

export const Page: Schema.Schema<Page> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  blog: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String) })),
  published: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  trashed: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  author: Schema.optional(Schema.Struct({ id: Schema.optional(Schema.String), displayName: Schema.optional(Schema.String), url: Schema.optional(Schema.String), image: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String) })) })),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface PostPerUserInfo {
  /** The kind of this entity. Always blogger#postPerUserInfo. */
  kind?: string;
  /** ID of the User. */
  userId?: string;
  /** ID of the Blog that the post resource belongs to. */
  blogId?: string;
  /** ID of the Post resource. */
  postId?: string;
  /** True if the user has Author level access to the post. */
  hasEditAccess?: boolean;
}

export const PostPerUserInfo: Schema.Schema<PostPerUserInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  blogId: Schema.optional(Schema.String),
  postId: Schema.optional(Schema.String),
  hasEditAccess: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PostPerUserInfo" }) as any as Schema.Schema<PostPerUserInfo>;

export interface PostUserInfo {
  /** The kind of this entity. Always blogger#postUserInfo. */
  kind?: string;
  /** The Post resource. */
  post?: Post;
  /** Information about a User for the Post. */
  post_user_info?: PostPerUserInfo;
}

export const PostUserInfo: Schema.Schema<PostUserInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  post: Schema.optional(Post),
  post_user_info: Schema.optional(PostPerUserInfo),
})).annotate({ identifier: "PostUserInfo" }) as any as Schema.Schema<PostUserInfo>;

export interface User {
  /** The kind of this entity. Always blogger#user. */
  kind?: string;
  /** The identifier for this User. */
  id?: string;
  /** The timestamp of when this profile was created, in seconds since epoch. */
  created?: string;
  /** The user's profile page. */
  url?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The container of blogs for this user. */
  blogs?: { selfLink?: string };
  /** The display name. */
  displayName?: string;
  /** Profile summary information. */
  about?: string;
  /** This user's locale */
  locale?: { language?: string; country?: string; variant?: string };
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  blogs: Schema.optional(Schema.Struct({ selfLink: Schema.optional(Schema.String) })),
  displayName: Schema.optional(Schema.String),
  about: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.Struct({ language: Schema.optional(Schema.String), country: Schema.optional(Schema.String), variant: Schema.optional(Schema.String) })),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface BlogList {
  /** The kind of this entity. Always blogger#blogList. */
  kind?: string;
  /** The list of Blogs this user has Authorship or Admin rights over. */
  items?: Array<Blog>;
  /** Admin level list of blog per-user information. */
  blogUserInfos?: Array<BlogUserInfo>;
}

export const BlogList: Schema.Schema<BlogList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Blog)),
  blogUserInfos: Schema.optional(Schema.Array(BlogUserInfo)),
})).annotate({ identifier: "BlogList" }) as any as Schema.Schema<BlogList>;

export interface CommentList {
  /** The kind of this entry. Always blogger#commentList. */
  kind?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** Pagination token to fetch the previous page, if one exists. */
  prevPageToken?: string;
  /** The List of Comments for a Post. */
  items?: Array<Comment>;
  /** Etag of the response. */
  etag?: string;
}

export const CommentList: Schema.Schema<CommentList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  prevPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Comment)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "CommentList" }) as any as Schema.Schema<CommentList>;

export interface PageList {
  /** The kind of this entity. Always blogger#pageList. */
  kind?: string;
  /** The list of Pages for a Blog. */
  items?: Array<Page>;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** Etag of the response. */
  etag?: string;
}

export const PageList: Schema.Schema<PageList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Page)),
  nextPageToken: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "PageList" }) as any as Schema.Schema<PageList>;

export interface PostList {
  /** The kind of this entity. Always blogger#postList. */
  kind?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** The list of Posts for this Blog. */
  items?: Array<Post>;
  /** Etag of the response. */
  etag?: string;
  /** Pagination token to fetch the previous page, if one exists. */
  prevPageToken?: string;
}

export const PostList: Schema.Schema<PostList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Post)),
  etag: Schema.optional(Schema.String),
  prevPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "PostList" }) as any as Schema.Schema<PostList>;

export interface PostUserInfosList {
  /** The kind of this entity. Always blogger#postList. */
  kind?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** The list of Posts with User information for the post, for this Blog. */
  items?: Array<PostUserInfo>;
}

export const PostUserInfosList: Schema.Schema<PostUserInfosList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(PostUserInfo)),
})).annotate({ identifier: "PostUserInfosList" }) as any as Schema.Schema<PostUserInfosList>;

// ==========================================================================
// Operations
// ==========================================================================

/** Marks a comment as not spam by blog id, post id and comment id. */
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

export const approveComments: API.OperationMethod<ApproveCommentsRequest, ApproveCommentsResponse, ApproveCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveCommentsRequest,
  output: ApproveCommentsResponse,
  errors: [],
}));

/** Deletes a comment by blog id, post id and comment id. */
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

export const deleteComments: API.OperationMethod<DeleteCommentsRequest, DeleteCommentsResponse, DeleteCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCommentsRequest,
  output: DeleteCommentsResponse,
  errors: [],
}));

/** Gets a comment by id. */
export interface GetCommentsRequest {
  blogId: string;
  postId: string;
  commentId: string;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const GetCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}" }),
  svc,
) as unknown as Schema.Schema<GetCommentsRequest>;

export type GetCommentsResponse = Comment;
export const GetCommentsResponse = Comment;

export type GetCommentsError = CommonErrors;

export const getComments: API.OperationMethod<GetCommentsRequest, GetCommentsResponse, GetCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCommentsRequest,
  output: GetCommentsResponse,
  errors: [],
}));

/** Lists comments. */
export interface ListCommentsRequest {
  blogId: string;
  postId: string;
  startDate?: string;
  endDate?: string;
  maxResults?: number;
  fetchBodies?: boolean;
  pageToken?: string;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {});
}

export const ListCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListCommentsRequest>;

export type ListCommentsResponse = CommentList;
export const ListCommentsResponse = CommentList;

export type ListCommentsError = CommonErrors;

export const listComments = API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Lists comments by blog. */
export interface ListByBlogCommentsRequest {
  blogId: string;
  startDate?: string;
  endDate?: string;
  maxResults?: number;
  fetchBodies?: boolean;
  pageToken?: string;
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {})[];
}

export const ListByBlogCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListByBlogCommentsRequest>;

export type ListByBlogCommentsResponse = CommentList;
export const ListByBlogCommentsResponse = CommentList;

export type ListByBlogCommentsError = CommonErrors;

export const listByBlogComments = API.makePaginated(() => ({
  input: ListByBlogCommentsRequest,
  output: ListByBlogCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Marks a comment as spam by blog id, post id and comment id. */
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

export const markAsSpamComments: API.OperationMethod<MarkAsSpamCommentsRequest, MarkAsSpamCommentsResponse, MarkAsSpamCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MarkAsSpamCommentsRequest,
  output: MarkAsSpamCommentsResponse,
  errors: [],
}));

/** Removes the content of a comment by blog id, post id and comment id. */
export interface RemoveContentCommentsRequest {
  blogId: string;
  postId: string;
  commentId: string;
}

export const RemoveContentCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/removecontent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveContentCommentsRequest>;

export type RemoveContentCommentsResponse = Comment;
export const RemoveContentCommentsResponse = Comment;

export type RemoveContentCommentsError = CommonErrors;

export const removeContentComments: API.OperationMethod<RemoveContentCommentsRequest, RemoveContentCommentsResponse, RemoveContentCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveContentCommentsRequest,
  output: RemoveContentCommentsResponse,
  errors: [],
}));

/** Deletes a page by blog id and page id. */
export interface DeletePagesRequest {
  blogId: string;
  pageId: string;
  /** Move to Trash if possible */
  useTrash?: boolean;
}

export const DeletePagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  useTrash: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useTrash")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/blogs/{blogId}/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<DeletePagesRequest>;

export interface DeletePagesResponse {}
export const DeletePagesResponse: Schema.Schema<DeletePagesResponse> = Schema.Struct({}) as any as Schema.Schema<DeletePagesResponse>;

export type DeletePagesError = CommonErrors;

export const deletePages: API.OperationMethod<DeletePagesRequest, DeletePagesResponse, DeletePagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePagesRequest,
  output: DeletePagesResponse,
  errors: [],
}));

/** Gets a page by blog id and page id. */
export interface GetPagesRequest {
  blogId: string;
  pageId: string;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const GetPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<GetPagesRequest>;

export type GetPagesResponse = Page;
export const GetPagesResponse = Page;

export type GetPagesError = CommonErrors;

export const getPages: API.OperationMethod<GetPagesRequest, GetPagesResponse, GetPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPagesRequest,
  output: GetPagesResponse,
  errors: [],
}));

/** Inserts a page. */
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

export const insertPages: API.OperationMethod<InsertPagesRequest, InsertPagesResponse, InsertPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPagesRequest,
  output: InsertPagesResponse,
  errors: [],
}));

/** Lists pages. */
export interface ListPagesRequest {
  blogId: string;
  fetchBodies?: boolean;
  maxResults?: number;
  pageToken?: string;
  status?: "LIVE" | "DRAFT" | "SOFT_TRASHED" | (string & {})[];
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const ListPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pages" }),
  svc,
) as unknown as Schema.Schema<ListPagesRequest>;

export type ListPagesResponse = PageList;
export const ListPagesResponse = PageList;

export type ListPagesError = CommonErrors;

export const listPages = API.makePaginated(() => ({
  input: ListPagesRequest,
  output: ListPagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Patches a page. */
export interface PatchPagesRequest {
  blogId: string;
  pageId: string;
  publish?: boolean;
  revert?: boolean;
  /** Request body */
  body?: Page;
}

export const PatchPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  body: Schema.optional(Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/blogs/{blogId}/pages/{pageId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPagesRequest>;

export type PatchPagesResponse = Page;
export const PatchPagesResponse = Page;

export type PatchPagesError = CommonErrors;

export const patchPages: API.OperationMethod<PatchPagesRequest, PatchPagesResponse, PatchPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPagesRequest,
  output: PatchPagesResponse,
  errors: [],
}));

/** Publishes a page. */
export interface PublishPagesRequest {
  blogId: string;
  pageId: string;
}

export const PublishPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/pages/{pageId}/publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishPagesRequest>;

export type PublishPagesResponse = Page;
export const PublishPagesResponse = Page;

export type PublishPagesError = CommonErrors;

export const publishPages: API.OperationMethod<PublishPagesRequest, PublishPagesResponse, PublishPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishPagesRequest,
  output: PublishPagesResponse,
  errors: [],
}));

/** Reverts a published or scheduled page to draft state. */
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

export const revertPages: API.OperationMethod<RevertPagesRequest, RevertPagesResponse, RevertPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertPagesRequest,
  output: RevertPagesResponse,
  errors: [],
}));

/** Updates a page by blog id and page id. */
export interface UpdatePagesRequest {
  blogId: string;
  pageId: string;
  publish?: boolean;
  revert?: boolean;
  /** Request body */
  body?: Page;
}

export const UpdatePagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  body: Schema.optional(Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v3/blogs/{blogId}/pages/{pageId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePagesRequest>;

export type UpdatePagesResponse = Page;
export const UpdatePagesResponse = Page;

export type UpdatePagesError = CommonErrors;

export const updatePages: API.OperationMethod<UpdatePagesRequest, UpdatePagesResponse, UpdatePagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePagesRequest,
  output: UpdatePagesResponse,
  errors: [],
}));

/** Deletes a post by blog id and post id. */
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

export const deletePosts: API.OperationMethod<DeletePostsRequest, DeletePostsResponse, DeletePostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePostsRequest,
  output: DeletePostsResponse,
  errors: [],
}));

/** Gets a post by blog id and post id */
export interface GetPostsRequest {
  blogId: string;
  postId: string;
  fetchBody?: boolean;
  fetchImages?: boolean;
  maxComments?: number;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const GetPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<GetPostsRequest>;

export type GetPostsResponse = Post;
export const GetPostsResponse = Post;

export type GetPostsError = CommonErrors;

export const getPosts: API.OperationMethod<GetPostsRequest, GetPostsResponse, GetPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPostsRequest,
  output: GetPostsResponse,
  errors: [],
}));

/** Gets a post by path. */
export interface GetByPathPostsRequest {
  blogId: string;
  path: string;
  maxComments?: number;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const GetByPathPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  path: Schema.String.pipe(T.HttpQuery("path")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/bypath" }),
  svc,
) as unknown as Schema.Schema<GetByPathPostsRequest>;

export type GetByPathPostsResponse = Post;
export const GetByPathPostsResponse = Post;

export type GetByPathPostsError = CommonErrors;

export const getByPathPosts: API.OperationMethod<GetByPathPostsRequest, GetByPathPostsResponse, GetByPathPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetByPathPostsRequest,
  output: GetByPathPostsResponse,
  errors: [],
}));

/** Inserts a post. */
export interface InsertPostsRequest {
  blogId: string;
  fetchBody?: boolean;
  fetchImages?: boolean;
  isDraft?: boolean;
  /** Request body */
  body?: Post;
}

export const InsertPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
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

export const insertPosts: API.OperationMethod<InsertPostsRequest, InsertPostsResponse, InsertPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPostsRequest,
  output: InsertPostsResponse,
  errors: [],
}));

/** Lists posts. */
export interface ListPostsRequest {
  blogId: string;
  endDate?: string;
  fetchBodies?: boolean;
  fetchImages?: boolean;
  labels?: string;
  maxResults?: number;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  pageToken?: string;
  startDate?: string;
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {})[];
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  /** Sort direction applied to post list. */
  sortOption?: "SORT_OPTION_UNSPECIFIED" | "DESCENDING" | "ASCENDING" | (string & {});
}

export const ListPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  labels: Schema.optional(Schema.String).pipe(T.HttpQuery("labels")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  sortOption: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOption")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts" }),
  svc,
) as unknown as Schema.Schema<ListPostsRequest>;

export type ListPostsResponse = PostList;
export const ListPostsResponse = PostList;

export type ListPostsError = CommonErrors;

export const listPosts = API.makePaginated(() => ({
  input: ListPostsRequest,
  output: ListPostsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Patches a post. */
export interface PatchPostsRequest {
  blogId: string;
  postId: string;
  fetchBody?: boolean;
  fetchImages?: boolean;
  maxComments?: number;
  publish?: boolean;
  revert?: boolean;
  /** Request body */
  body?: Post;
}

export const PatchPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  body: Schema.optional(Post).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/blogs/{blogId}/posts/{postId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPostsRequest>;

export type PatchPostsResponse = Post;
export const PatchPostsResponse = Post;

export type PatchPostsError = CommonErrors;

export const patchPosts: API.OperationMethod<PatchPostsRequest, PatchPostsResponse, PatchPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPostsRequest,
  output: PatchPostsResponse,
  errors: [],
}));

/** Publishes a post. */
export interface PublishPostsRequest {
  blogId: string;
  postId: string;
  publishDate?: string;
}

export const PublishPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  publishDate: Schema.optional(Schema.String).pipe(T.HttpQuery("publishDate")),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts/{postId}/publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishPostsRequest>;

export type PublishPostsResponse = Post;
export const PublishPostsResponse = Post;

export type PublishPostsError = CommonErrors;

export const publishPosts: API.OperationMethod<PublishPostsRequest, PublishPostsResponse, PublishPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishPostsRequest,
  output: PublishPostsResponse,
  errors: [],
}));

/** Reverts a published or scheduled post to draft state. */
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

export const revertPosts: API.OperationMethod<RevertPostsRequest, RevertPostsResponse, RevertPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertPostsRequest,
  output: RevertPostsResponse,
  errors: [],
}));

/** Searches for posts matching given query terms in the specified blog. */
export interface SearchPostsRequest {
  blogId: string;
  q: string;
  fetchBodies?: boolean;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
}

export const SearchPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  q: Schema.String.pipe(T.HttpQuery("q")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/search" }),
  svc,
) as unknown as Schema.Schema<SearchPostsRequest>;

export type SearchPostsResponse = PostList;
export const SearchPostsResponse = PostList;

export type SearchPostsError = CommonErrors;

export const searchPosts: API.OperationMethod<SearchPostsRequest, SearchPostsResponse, SearchPostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchPostsRequest,
  output: SearchPostsResponse,
  errors: [],
}));

/** Updates a post by blog id and post id. */
export interface UpdatePostsRequest {
  blogId: string;
  postId: string;
  fetchBody?: boolean;
  fetchImages?: boolean;
  maxComments?: number;
  publish?: boolean;
  revert?: boolean;
  /** Request body */
  body?: Post;
}

export const UpdatePostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  body: Schema.optional(Post).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v3/blogs/{blogId}/posts/{postId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePostsRequest>;

export type UpdatePostsResponse = Post;
export const UpdatePostsResponse = Post;

export type UpdatePostsError = CommonErrors;

export const updatePosts: API.OperationMethod<UpdatePostsRequest, UpdatePostsResponse, UpdatePostsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePostsRequest,
  output: UpdatePostsResponse,
  errors: [],
}));

/** Gets a blog by id. */
export interface GetBlogsRequest {
  blogId: string;
  maxPosts?: number;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const GetBlogsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  maxPosts: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxPosts")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}" }),
  svc,
) as unknown as Schema.Schema<GetBlogsRequest>;

export type GetBlogsResponse = Blog;
export const GetBlogsResponse = Blog;

export type GetBlogsError = CommonErrors;

export const getBlogs: API.OperationMethod<GetBlogsRequest, GetBlogsResponse, GetBlogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBlogsRequest,
  output: GetBlogsResponse,
  errors: [],
}));

/** Gets a blog by url. */
export interface GetByUrlBlogsRequest {
  url: string;
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const GetByUrlBlogsRequest = Schema.Struct({
  url: Schema.String.pipe(T.HttpQuery("url")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/byurl" }),
  svc,
) as unknown as Schema.Schema<GetByUrlBlogsRequest>;

export type GetByUrlBlogsResponse = Blog;
export const GetByUrlBlogsResponse = Blog;

export type GetByUrlBlogsError = CommonErrors;

export const getByUrlBlogs: API.OperationMethod<GetByUrlBlogsRequest, GetByUrlBlogsResponse, GetByUrlBlogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetByUrlBlogsRequest,
  output: GetByUrlBlogsResponse,
  errors: [],
}));

/** Lists blogs by user. */
export interface ListByUserBlogsRequest {
  userId: string;
  fetchUserInfo?: boolean;
  role?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {})[];
  /** Default value of status is LIVE. */
  status?: "LIVE" | "DELETED" | (string & {})[];
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
}

export const ListByUserBlogsRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  fetchUserInfo: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchUserInfo")),
  role: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("role")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs" }),
  svc,
) as unknown as Schema.Schema<ListByUserBlogsRequest>;

export type ListByUserBlogsResponse = BlogList;
export const ListByUserBlogsResponse = BlogList;

export type ListByUserBlogsError = CommonErrors;

export const listByUserBlogs: API.OperationMethod<ListByUserBlogsRequest, ListByUserBlogsResponse, ListByUserBlogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListByUserBlogsRequest,
  output: ListByUserBlogsResponse,
  errors: [],
}));

/** Gets one blog and user info pair by blog id and user id. */
export interface GetBlogUserInfosRequest {
  userId: string;
  blogId: string;
  maxPosts?: number;
}

export const GetBlogUserInfosRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  maxPosts: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxPosts")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}" }),
  svc,
) as unknown as Schema.Schema<GetBlogUserInfosRequest>;

export type GetBlogUserInfosResponse = BlogUserInfo;
export const GetBlogUserInfosResponse = BlogUserInfo;

export type GetBlogUserInfosError = CommonErrors;

export const getBlogUserInfos: API.OperationMethod<GetBlogUserInfosRequest, GetBlogUserInfosResponse, GetBlogUserInfosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBlogUserInfosRequest,
  output: GetBlogUserInfosResponse,
  errors: [],
}));

/** Gets page views by blog id. */
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

export const getPageViews: API.OperationMethod<GetPageViewsRequest, GetPageViewsResponse, GetPageViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPageViewsRequest,
  output: GetPageViewsResponse,
  errors: [],
}));

/** Gets one post and user info pair, by post_id and user_id. */
export interface GetPostUserInfosRequest {
  userId: string;
  blogId: string;
  postId: string;
  maxComments?: number;
}

export const GetPostUserInfosRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<GetPostUserInfosRequest>;

export type GetPostUserInfosResponse = PostUserInfo;
export const GetPostUserInfosResponse = PostUserInfo;

export type GetPostUserInfosError = CommonErrors;

export const getPostUserInfos: API.OperationMethod<GetPostUserInfosRequest, GetPostUserInfosResponse, GetPostUserInfosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPostUserInfosRequest,
  output: GetPostUserInfosResponse,
  errors: [],
}));

/** Lists post and user info pairs. */
export interface ListPostUserInfosRequest {
  userId: string;
  blogId: string;
  startDate?: string;
  endDate?: string;
  fetchBodies?: boolean;
  labels?: string;
  maxResults?: number;
  pageToken?: string;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  view?: "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN" | (string & {});
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {})[];
}

export const ListPostUserInfosRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  labels: Schema.optional(Schema.String).pipe(T.HttpQuery("labels")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}/posts" }),
  svc,
) as unknown as Schema.Schema<ListPostUserInfosRequest>;

export type ListPostUserInfosResponse = PostUserInfosList;
export const ListPostUserInfosResponse = PostUserInfosList;

export type ListPostUserInfosError = CommonErrors;

export const listPostUserInfos = API.makePaginated(() => ({
  input: ListPostUserInfosRequest,
  output: ListPostUserInfosResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Gets one user by user_id. */
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

export const getUsers: API.OperationMethod<GetUsersRequest, GetUsersResponse, GetUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersRequest,
  output: GetUsersResponse,
  errors: [],
}));

