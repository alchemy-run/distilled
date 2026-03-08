// ==========================================================================
// Blogger API (blogger v3)
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
  name: "blogger",
  version: "v3",
  rootUrl: "https://blogger.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Comment {
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** Data about the comment this is in reply to. */
  inReplyTo?: { id?: string };
  /** The kind of this entry. Always blogger#comment. */
  kind?: string;
  /** The actual content of the comment. May include HTML markup. */
  content?: string;
  /** RFC 3339 date-time when this comment was published. */
  published?: string;
  /** The author of this Comment. */
  author?: {
    displayName?: string;
    image?: { url?: string };
    id?: string;
    url?: string;
  };
  /** Data about the post containing this comment. */
  post?: { id?: string };
  /** Data about the blog containing this comment. */
  blog?: { id?: string };
  /** The identifier for this resource. */
  id?: string;
  /** The status of the comment (only populated for admin users). */
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {});
  /** RFC 3339 date-time when this comment was last updated. */
  updated?: string;
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() =>
  Schema.Struct({
    selfLink: Schema.optional(Schema.String),
    inReplyTo: Schema.optional(
      Schema.Struct({ id: Schema.optional(Schema.String) }),
    ),
    kind: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
    published: Schema.optional(Schema.String),
    author: Schema.optional(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        image: Schema.optional(
          Schema.Struct({ url: Schema.optional(Schema.String) }),
        ),
        id: Schema.optional(Schema.String),
        url: Schema.optional(Schema.String),
      }),
    ),
    post: Schema.optional(
      Schema.Struct({ id: Schema.optional(Schema.String) }),
    ),
    blog: Schema.optional(
      Schema.Struct({ id: Schema.optional(Schema.String) }),
    ),
    id: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface Post {
  /** Status of the post. Only set for admin-level requests. */
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {});
  /** The title of the Post. */
  title?: string;
  /** The identifier of this Post. */
  id?: string;
  /** The kind of this entity. Always blogger#post. */
  kind?: string;
  /** RFC 3339 date-time when this Post was last trashed. */
  trashed?: string;
  /** RFC 3339 date-time when this Post was published. */
  published?: string;
  /** The URL where this Post is displayed. */
  url?: string;
  /** The author of this Post. */
  author?: {
    displayName?: string;
    image?: { url?: string };
    id?: string;
    url?: string;
  };
  /** The JSON meta-data for the Post. */
  customMetaData?: string;
  /** Display image for the Post. */
  images?: Array<{ url?: string }>;
  /** Comment control and display setting for readers of this post. */
  readerComments?:
    | "ALLOW"
    | "DONT_ALLOW_SHOW_EXISTING"
    | "DONT_ALLOW_HIDE_EXISTING"
    | (string & {});
  /** RFC 3339 date-time when this Post was last updated. */
  updated?: string;
  /** Data about the blog containing this Post. */
  blog?: { id?: string };
  /** The content of the Post. May contain HTML markup. */
  content?: string;
  /** The container of comments on this Post. */
  replies?: { totalItems?: string; selfLink?: string; items?: Array<Comment> };
  /** The location for geotagged posts. */
  location?: { name?: string; lat?: number; span?: string; lng?: number };
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The list of labels this Post was tagged with. */
  labels?: Array<string>;
  /** Etag of the resource. */
  etag?: string;
  /** The title link URL, similar to atom's related link. */
  titleLink?: string;
}

export const Post: Schema.Schema<Post> = Schema.suspend(() =>
  Schema.Struct({
    status: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    trashed: Schema.optional(Schema.String),
    published: Schema.optional(Schema.String),
    url: Schema.optional(Schema.String),
    author: Schema.optional(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        image: Schema.optional(
          Schema.Struct({ url: Schema.optional(Schema.String) }),
        ),
        id: Schema.optional(Schema.String),
        url: Schema.optional(Schema.String),
      }),
    ),
    customMetaData: Schema.optional(Schema.String),
    images: Schema.optional(
      Schema.Array(Schema.Struct({ url: Schema.optional(Schema.String) })),
    ),
    readerComments: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
    blog: Schema.optional(
      Schema.Struct({ id: Schema.optional(Schema.String) }),
    ),
    content: Schema.optional(Schema.String),
    replies: Schema.optional(
      Schema.Struct({
        totalItems: Schema.optional(Schema.String),
        selfLink: Schema.optional(Schema.String),
        items: Schema.optional(Schema.Array(Comment)),
      }),
    ),
    location: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        lat: Schema.optional(Schema.Number),
        span: Schema.optional(Schema.String),
        lng: Schema.optional(Schema.Number),
      }),
    ),
    selfLink: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Array(Schema.String)),
    etag: Schema.optional(Schema.String),
    titleLink: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Post" }) as any as Schema.Schema<Post>;

export interface PostPerUserInfo {
  /** ID of the Blog that the post resource belongs to. */
  blogId?: string;
  /** True if the user has Author level access to the post. */
  hasEditAccess?: boolean;
  /** ID of the User. */
  userId?: string;
  /** ID of the Post resource. */
  postId?: string;
  /** The kind of this entity. Always blogger#postPerUserInfo. */
  kind?: string;
}

export const PostPerUserInfo: Schema.Schema<PostPerUserInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      blogId: Schema.optional(Schema.String),
      hasEditAccess: Schema.optional(Schema.Boolean),
      userId: Schema.optional(Schema.String),
      postId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PostPerUserInfo",
}) as any as Schema.Schema<PostPerUserInfo>;

export interface PostUserInfo {
  /** The Post resource. */
  post?: Post;
  /** Information about a User for the Post. */
  post_user_info?: PostPerUserInfo;
  /** The kind of this entity. Always blogger#postUserInfo. */
  kind?: string;
}

export const PostUserInfo: Schema.Schema<PostUserInfo> = Schema.suspend(() =>
  Schema.Struct({
    post: Schema.optional(Post),
    post_user_info: Schema.optional(PostPerUserInfo),
    kind: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "PostUserInfo",
}) as any as Schema.Schema<PostUserInfo>;

export interface PostUserInfosList {
  /** The list of Posts with User information for the post, for this Blog. */
  items?: Array<PostUserInfo>;
  /** The kind of this entity. Always blogger#postList. */
  kind?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
}

export const PostUserInfosList: Schema.Schema<PostUserInfosList> =
  Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(PostUserInfo)),
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PostUserInfosList",
  }) as any as Schema.Schema<PostUserInfosList>;

export interface User {
  /** The display name. */
  displayName?: string;
  /** Profile summary information. */
  about?: string;
  /** The timestamp of when this profile was created, in seconds since epoch. */
  created?: string;
  /** This user's locale */
  locale?: { variant?: string; country?: string; language?: string };
  /** The identifier for this User. */
  id?: string;
  /** The kind of this entity. Always blogger#user. */
  kind?: string;
  /** The user's profile page. */
  url?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The container of blogs for this user. */
  blogs?: { selfLink?: string };
}

export const User: Schema.Schema<User> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    about: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    locale: Schema.optional(
      Schema.Struct({
        variant: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        language: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    url: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    blogs: Schema.optional(
      Schema.Struct({ selfLink: Schema.optional(Schema.String) }),
    ),
  }),
).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface BlogPerUserInfo {
  /** ID of the Blog resource. */
  blogId?: string;
  /** Access permissions that the user has for the blog (ADMIN, AUTHOR, or READER). */
  role?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  /** ID of the User. */
  userId?: string;
  /** True if the user has Admin level access to the blog. */
  hasAdminAccess?: boolean;
  /** The kind of this entity. Always blogger#blogPerUserInfo. */
  kind?: string;
  /** The Photo Album Key for the user when adding photos to the blog. */
  photosAlbumKey?: string;
}

export const BlogPerUserInfo: Schema.Schema<BlogPerUserInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      blogId: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      hasAdminAccess: Schema.optional(Schema.Boolean),
      kind: Schema.optional(Schema.String),
      photosAlbumKey: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "BlogPerUserInfo",
}) as any as Schema.Schema<BlogPerUserInfo>;

export interface Page {
  /** The identifier for this resource. */
  id?: string;
  /** The status of the page for admin resources (either LIVE or DRAFT). */
  status?: "LIVE" | "DRAFT" | "SOFT_TRASHED" | (string & {});
  /** The title of this entity. This is the name displayed in the Admin user interface. */
  title?: string;
  /** RFC 3339 date-time when this Page was published. */
  published?: string;
  /** The URL that this Page is displayed at. */
  url?: string;
  /** The author of this Page. */
  author?: {
    displayName?: string;
    image?: { url?: string };
    id?: string;
    url?: string;
  };
  /** The kind of this entity. Always blogger#page. */
  kind?: string;
  /** RFC 3339 date-time when this Page was trashed. */
  trashed?: string;
  /** Data about the blog containing this Page. */
  blog?: { id?: string };
  /** RFC 3339 date-time when this Page was last updated. */
  updated?: string;
  /** Etag of the resource. */
  etag?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The body content of this Page, in HTML. */
  content?: string;
}

export const Page: Schema.Schema<Page> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    published: Schema.optional(Schema.String),
    url: Schema.optional(Schema.String),
    author: Schema.optional(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        image: Schema.optional(
          Schema.Struct({ url: Schema.optional(Schema.String) }),
        ),
        id: Schema.optional(Schema.String),
        url: Schema.optional(Schema.String),
      }),
    ),
    kind: Schema.optional(Schema.String),
    trashed: Schema.optional(Schema.String),
    blog: Schema.optional(
      Schema.Struct({ id: Schema.optional(Schema.String) }),
    ),
    updated: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface PageList {
  /** The kind of this entity. Always blogger#pageList. */
  kind?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** The list of Pages for a Blog. */
  items?: Array<Page>;
  /** Etag of the response. */
  etag?: string;
}

export const PageList: Schema.Schema<PageList> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    nextPageToken: Schema.optional(Schema.String),
    items: Schema.optional(Schema.Array(Page)),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "PageList" }) as any as Schema.Schema<PageList>;

export interface Blog {
  /** The identifier for this resource. */
  id?: string;
  /** The status of the blog. */
  status?: "LIVE" | "DELETED" | (string & {});
  /** The JSON custom meta-data for the Blog. */
  customMetaData?: string;
  /** The container of pages in this blog. */
  pages?: { totalItems?: number; selfLink?: string };
  /** The kind of this entry. Always blogger#blog. */
  kind?: string;
  /** RFC 3339 date-time when this blog was published. */
  published?: string;
  /** The URL where this blog is published. */
  url?: string;
  /** The name of this blog. This is displayed as the title. */
  name?: string;
  /** The description of this blog. This is displayed underneath the title. */
  description?: string;
  /** The locale this Blog is set to. */
  locale?: { country?: string; language?: string; variant?: string };
  /** RFC 3339 date-time when this blog was last updated. */
  updated?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The container of posts in this blog. */
  posts?: { totalItems?: number; selfLink?: string; items?: Array<Post> };
}

export const Blog: Schema.Schema<Blog> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    customMetaData: Schema.optional(Schema.String),
    pages: Schema.optional(
      Schema.Struct({
        totalItems: Schema.optional(Schema.Number),
        selfLink: Schema.optional(Schema.String),
      }),
    ),
    kind: Schema.optional(Schema.String),
    published: Schema.optional(Schema.String),
    url: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    locale: Schema.optional(
      Schema.Struct({
        country: Schema.optional(Schema.String),
        language: Schema.optional(Schema.String),
        variant: Schema.optional(Schema.String),
      }),
    ),
    updated: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    posts: Schema.optional(
      Schema.Struct({
        totalItems: Schema.optional(Schema.Number),
        selfLink: Schema.optional(Schema.String),
        items: Schema.optional(Schema.Array(Post)),
      }),
    ),
  }),
).annotate({ identifier: "Blog" }) as any as Schema.Schema<Blog>;

export interface BlogUserInfo {
  /** The kind of this entity. Always blogger#blogUserInfo. */
  kind?: string;
  /** Information about a User for the Blog. */
  blog_user_info?: BlogPerUserInfo;
  /** The Blog resource. */
  blog?: Blog;
}

export const BlogUserInfo: Schema.Schema<BlogUserInfo> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    blog_user_info: Schema.optional(BlogPerUserInfo),
    blog: Schema.optional(Blog),
  }),
).annotate({
  identifier: "BlogUserInfo",
}) as any as Schema.Schema<BlogUserInfo>;

export interface CommentList {
  /** The List of Comments for a Post. */
  items?: Array<Comment>;
  /** Etag of the response. */
  etag?: string;
  /** The kind of this entry. Always blogger#commentList. */
  kind?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** Pagination token to fetch the previous page, if one exists. */
  prevPageToken?: string;
}

export const CommentList: Schema.Schema<CommentList> = Schema.suspend(() =>
  Schema.Struct({
    items: Schema.optional(Schema.Array(Comment)),
    etag: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    nextPageToken: Schema.optional(Schema.String),
    prevPageToken: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "CommentList" }) as any as Schema.Schema<CommentList>;

export interface Pageviews {
  /** Blog Id. */
  blogId?: string;
  /** The container of posts in this blog. */
  counts?: Array<{
    count?: string;
    timeRange?: "ALL_TIME" | "THIRTY_DAYS" | "SEVEN_DAYS" | (string & {});
  }>;
  /** The kind of this entry. Always blogger#page_views. */
  kind?: string;
}

export const Pageviews: Schema.Schema<Pageviews> = Schema.suspend(() =>
  Schema.Struct({
    blogId: Schema.optional(Schema.String),
    counts: Schema.optional(
      Schema.Array(
        Schema.Struct({
          count: Schema.optional(Schema.String),
          timeRange: Schema.optional(Schema.String),
        }),
      ),
    ),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Pageviews" }) as any as Schema.Schema<Pageviews>;

export interface BlogList {
  /** The kind of this entity. Always blogger#blogList. */
  kind?: string;
  /** Admin level list of blog per-user information. */
  blogUserInfos?: Array<BlogUserInfo>;
  /** The list of Blogs this user has Authorship or Admin rights over. */
  items?: Array<Blog>;
}

export const BlogList: Schema.Schema<BlogList> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    blogUserInfos: Schema.optional(Schema.Array(BlogUserInfo)),
    items: Schema.optional(Schema.Array(Blog)),
  }),
).annotate({ identifier: "BlogList" }) as any as Schema.Schema<BlogList>;

export interface PostList {
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** Pagination token to fetch the previous page, if one exists. */
  prevPageToken?: string;
  /** The kind of this entity. Always blogger#postList. */
  kind?: string;
  /** The list of Posts for this Blog. */
  items?: Array<Post>;
  /** Etag of the response. */
  etag?: string;
}

export const PostList: Schema.Schema<PostList> = Schema.suspend(() =>
  Schema.Struct({
    nextPageToken: Schema.optional(Schema.String),
    prevPageToken: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    items: Schema.optional(Schema.Array(Post)),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "PostList" }) as any as Schema.Schema<PostList>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetPageViewsRequest {
  blogId: string;
  range?: "all" | "30DAYS" | "7DAYS" | (string & {})[];
}

export const GetPageViewsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  range: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("range"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pageviews" }),
  svc,
) as unknown as Schema.Schema<GetPageViewsRequest>;

export type GetPageViewsResponse = Pageviews;
export const GetPageViewsResponse = Pageviews;

export type GetPageViewsError = DefaultErrors;

/** Gets page views by blog id. */
export const getPageViews: API.OperationMethod<
  GetPageViewsRequest,
  GetPageViewsResponse,
  GetPageViewsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPageViewsRequest,
  output: GetPageViewsResponse,
  errors: [],
}));

export interface GetPagesRequest {
  pageId: string;
  blogId: string;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
}

export const GetPagesRequest = Schema.Struct({
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<GetPagesRequest>;

export type GetPagesResponse = Page;
export const GetPagesResponse = Page;

export type GetPagesError = DefaultErrors;

/** Gets a page by blog id and page id. */
export const getPages: API.OperationMethod<
  GetPagesRequest,
  GetPagesResponse,
  GetPagesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPagesRequest,
  output: GetPagesResponse,
  errors: [],
}));

export interface DeletePagesRequest {
  blogId: string;
  /** Move to Trash if possible */
  useTrash?: boolean;
  pageId: string;
}

export const DeletePagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  useTrash: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useTrash")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/blogs/{blogId}/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<DeletePagesRequest>;

export interface DeletePagesResponse {}
export const DeletePagesResponse: Schema.Schema<DeletePagesResponse> =
  Schema.Struct({}) as any as Schema.Schema<DeletePagesResponse>;

export type DeletePagesError = DefaultErrors;

/** Deletes a page by blog id and page id. */
export const deletePages: API.OperationMethod<
  DeletePagesRequest,
  DeletePagesResponse,
  DeletePagesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePagesRequest,
  output: DeletePagesResponse,
  errors: [],
}));

export interface PatchPagesRequest {
  pageId: string;
  publish?: boolean;
  revert?: boolean;
  blogId: string;
  /** Request body */
  body?: Page;
}

export const PatchPagesRequest = Schema.Struct({
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  body: Schema.optional(Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v3/blogs/{blogId}/pages/{pageId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPagesRequest>;

export type PatchPagesResponse = Page;
export const PatchPagesResponse = Page;

export type PatchPagesError = DefaultErrors;

/** Patches a page. */
export const patchPages: API.OperationMethod<
  PatchPagesRequest,
  PatchPagesResponse,
  PatchPagesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPagesRequest,
  output: PatchPagesResponse,
  errors: [],
}));

export interface PublishPagesRequest {
  blogId: string;
  pageId: string;
}

export const PublishPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/pages/{pageId}/publish",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PublishPagesRequest>;

export type PublishPagesResponse = Page;
export const PublishPagesResponse = Page;

export type PublishPagesError = DefaultErrors;

/** Publishes a page. */
export const publishPages: API.OperationMethod<
  PublishPagesRequest,
  PublishPagesResponse,
  PublishPagesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PublishPagesRequest,
  output: PublishPagesResponse,
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
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/pages/{pageId}/revert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RevertPagesRequest>;

export type RevertPagesResponse = Page;
export const RevertPagesResponse = Page;

export type RevertPagesError = DefaultErrors;

/** Reverts a published or scheduled page to draft state. */
export const revertPages: API.OperationMethod<
  RevertPagesRequest,
  RevertPagesResponse,
  RevertPagesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RevertPagesRequest,
  output: RevertPagesResponse,
  errors: [],
}));

export interface UpdatePagesRequest {
  pageId: string;
  blogId: string;
  publish?: boolean;
  revert?: boolean;
  /** Request body */
  body?: Page;
}

export const UpdatePagesRequest = Schema.Struct({
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  body: Schema.optional(Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "v3/blogs/{blogId}/pages/{pageId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdatePagesRequest>;

export type UpdatePagesResponse = Page;
export const UpdatePagesResponse = Page;

export type UpdatePagesError = DefaultErrors;

/** Updates a page by blog id and page id. */
export const updatePages: API.OperationMethod<
  UpdatePagesRequest,
  UpdatePagesResponse,
  UpdatePagesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePagesRequest,
  output: UpdatePagesResponse,
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

export type InsertPagesError = DefaultErrors;

/** Inserts a page. */
export const insertPages: API.OperationMethod<
  InsertPagesRequest,
  InsertPagesResponse,
  InsertPagesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertPagesRequest,
  output: InsertPagesResponse,
  errors: [],
}));

export interface ListPagesRequest {
  blogId: string;
  pageToken?: string;
  maxResults?: number;
  status?: "LIVE" | "DRAFT" | "SOFT_TRASHED" | (string & {})[];
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  fetchBodies?: boolean;
}

export const ListPagesRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("status"),
  ),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pages" }),
  svc,
) as unknown as Schema.Schema<ListPagesRequest>;

export type ListPagesResponse = PageList;
export const ListPagesResponse = PageList;

export type ListPagesError = DefaultErrors;

/** Lists pages. */
export const listPages: API.PaginatedOperationMethod<
  ListPagesRequest,
  ListPagesResponse,
  ListPagesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPagesRequest,
  output: ListPagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ListPostUserInfosRequest {
  userId: string;
  maxResults?: number;
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {})[];
  fetchBodies?: boolean;
  labels?: string;
  blogId: string;
  pageToken?: string;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  endDate?: string;
  startDate?: string;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
}

export const ListPostUserInfosRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("status"),
  ),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  labels: Schema.optional(Schema.String).pipe(T.HttpQuery("labels")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}/posts" }),
  svc,
) as unknown as Schema.Schema<ListPostUserInfosRequest>;

export type ListPostUserInfosResponse = PostUserInfosList;
export const ListPostUserInfosResponse = PostUserInfosList;

export type ListPostUserInfosError = DefaultErrors;

/** Lists post and user info pairs. */
export const listPostUserInfos: API.PaginatedOperationMethod<
  ListPostUserInfosRequest,
  ListPostUserInfosResponse,
  ListPostUserInfosError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPostUserInfosRequest,
  output: ListPostUserInfosResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetPostUserInfosRequest {
  userId: string;
  postId: string;
  blogId: string;
  maxComments?: number;
}

export const GetPostUserInfosRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v3/users/{userId}/blogs/{blogId}/posts/{postId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPostUserInfosRequest>;

export type GetPostUserInfosResponse = PostUserInfo;
export const GetPostUserInfosResponse = PostUserInfo;

export type GetPostUserInfosError = DefaultErrors;

/** Gets one post and user info pair, by post_id and user_id. */
export const getPostUserInfos: API.OperationMethod<
  GetPostUserInfosRequest,
  GetPostUserInfosResponse,
  GetPostUserInfosError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPostUserInfosRequest,
  output: GetPostUserInfosResponse,
  errors: [],
}));

export interface GetCommentsRequest {
  postId: string;
  blogId: string;
  commentId: string;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
}

export const GetCommentsRequest = Schema.Struct({
  postId: Schema.String.pipe(T.HttpPath("postId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}",
  }),
  svc,
) as unknown as Schema.Schema<GetCommentsRequest>;

export type GetCommentsResponse = Comment;
export const GetCommentsResponse = Comment;

export type GetCommentsError = DefaultErrors;

/** Gets a comment by id. */
export const getComments: API.OperationMethod<
  GetCommentsRequest,
  GetCommentsResponse,
  GetCommentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCommentsRequest,
  output: GetCommentsResponse,
  errors: [],
}));

export interface DeleteCommentsRequest {
  blogId: string;
  commentId: string;
  postId: string;
}

export const DeleteCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteCommentsRequest>;

export interface DeleteCommentsResponse {}
export const DeleteCommentsResponse: Schema.Schema<DeleteCommentsResponse> =
  Schema.Struct({}) as any as Schema.Schema<DeleteCommentsResponse>;

export type DeleteCommentsError = DefaultErrors;

/** Deletes a comment by blog id, post id and comment id. */
export const deleteComments: API.OperationMethod<
  DeleteCommentsRequest,
  DeleteCommentsResponse,
  DeleteCommentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCommentsRequest,
  output: DeleteCommentsResponse,
  errors: [],
}));

export interface ListByBlogCommentsRequest {
  blogId: string;
  pageToken?: string;
  maxResults?: number;
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {})[];
  endDate?: string;
  startDate?: string;
  fetchBodies?: boolean;
}

export const ListByBlogCommentsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("status"),
  ),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListByBlogCommentsRequest>;

export type ListByBlogCommentsResponse = CommentList;
export const ListByBlogCommentsResponse = CommentList;

export type ListByBlogCommentsError = DefaultErrors;

/** Lists comments by blog. */
export const listByBlogComments: API.PaginatedOperationMethod<
  ListByBlogCommentsRequest,
  ListByBlogCommentsResponse,
  ListByBlogCommentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListByBlogCommentsRequest,
  output: ListByBlogCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
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
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/removecontent",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RemoveContentCommentsRequest>;

export type RemoveContentCommentsResponse = Comment;
export const RemoveContentCommentsResponse = Comment;

export type RemoveContentCommentsError = DefaultErrors;

/** Removes the content of a comment by blog id, post id and comment id. */
export const removeContentComments: API.OperationMethod<
  RemoveContentCommentsRequest,
  RemoveContentCommentsResponse,
  RemoveContentCommentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RemoveContentCommentsRequest,
  output: RemoveContentCommentsResponse,
  errors: [],
}));

export interface ApproveCommentsRequest {
  postId: string;
  blogId: string;
  commentId: string;
}

export const ApproveCommentsRequest = Schema.Struct({
  postId: Schema.String.pipe(T.HttpPath("postId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/approve",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ApproveCommentsRequest>;

export type ApproveCommentsResponse = Comment;
export const ApproveCommentsResponse = Comment;

export type ApproveCommentsError = DefaultErrors;

/** Marks a comment as not spam by blog id, post id and comment id. */
export const approveComments: API.OperationMethod<
  ApproveCommentsRequest,
  ApproveCommentsResponse,
  ApproveCommentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ApproveCommentsRequest,
  output: ApproveCommentsResponse,
  errors: [],
}));

export interface ListCommentsRequest {
  endDate?: string;
  startDate?: string;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  postId: string;
  blogId: string;
  pageToken?: string;
  fetchBodies?: boolean;
  maxResults?: number;
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {});
}

export const ListCommentsRequest = Schema.Struct({
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListCommentsRequest>;

export type ListCommentsResponse = CommentList;
export const ListCommentsResponse = CommentList;

export type ListCommentsError = DefaultErrors;

/** Lists comments. */
export const listComments: API.PaginatedOperationMethod<
  ListCommentsRequest,
  ListCommentsResponse,
  ListCommentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface MarkAsSpamCommentsRequest {
  postId: string;
  blogId: string;
  commentId: string;
}

export const MarkAsSpamCommentsRequest = Schema.Struct({
  postId: Schema.String.pipe(T.HttpPath("postId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/spam",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MarkAsSpamCommentsRequest>;

export type MarkAsSpamCommentsResponse = Comment;
export const MarkAsSpamCommentsResponse = Comment;

export type MarkAsSpamCommentsError = DefaultErrors;

/** Marks a comment as spam by blog id, post id and comment id. */
export const markAsSpamComments: API.OperationMethod<
  MarkAsSpamCommentsRequest,
  MarkAsSpamCommentsResponse,
  MarkAsSpamCommentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MarkAsSpamCommentsRequest,
  output: MarkAsSpamCommentsResponse,
  errors: [],
}));

export interface GetPostsRequest {
  maxComments?: number;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  fetchBody?: boolean;
  blogId: string;
  postId: string;
  fetchImages?: boolean;
}

export const GetPostsRequest = Schema.Struct({
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<GetPostsRequest>;

export type GetPostsResponse = Post;
export const GetPostsResponse = Post;

export type GetPostsError = DefaultErrors;

/** Gets a post by blog id and post id */
export const getPosts: API.OperationMethod<
  GetPostsRequest,
  GetPostsResponse,
  GetPostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPostsRequest,
  output: GetPostsResponse,
  errors: [],
}));

export interface DeletePostsRequest {
  postId: string;
  /** Move to Trash if possible */
  useTrash?: boolean;
  blogId: string;
}

export const DeletePostsRequest = Schema.Struct({
  postId: Schema.String.pipe(T.HttpPath("postId")),
  useTrash: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useTrash")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<DeletePostsRequest>;

export interface DeletePostsResponse {}
export const DeletePostsResponse: Schema.Schema<DeletePostsResponse> =
  Schema.Struct({}) as any as Schema.Schema<DeletePostsResponse>;

export type DeletePostsError = DefaultErrors;

/** Deletes a post by blog id and post id. */
export const deletePosts: API.OperationMethod<
  DeletePostsRequest,
  DeletePostsResponse,
  DeletePostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePostsRequest,
  output: DeletePostsResponse,
  errors: [],
}));

export interface PublishPostsRequest {
  postId: string;
  publishDate?: string;
  blogId: string;
}

export const PublishPostsRequest = Schema.Struct({
  postId: Schema.String.pipe(T.HttpPath("postId")),
  publishDate: Schema.optional(Schema.String).pipe(T.HttpQuery("publishDate")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/posts/{postId}/publish",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PublishPostsRequest>;

export type PublishPostsResponse = Post;
export const PublishPostsResponse = Post;

export type PublishPostsError = DefaultErrors;

/** Publishes a post. */
export const publishPosts: API.OperationMethod<
  PublishPostsRequest,
  PublishPostsResponse,
  PublishPostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PublishPostsRequest,
  output: PublishPostsResponse,
  errors: [],
}));

export interface SearchPostsRequest {
  q: string;
  blogId: string;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  fetchBodies?: boolean;
}

export const SearchPostsRequest = Schema.Struct({
  q: Schema.String.pipe(T.HttpQuery("q")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/search" }),
  svc,
) as unknown as Schema.Schema<SearchPostsRequest>;

export type SearchPostsResponse = PostList;
export const SearchPostsResponse = PostList;

export type SearchPostsError = DefaultErrors;

/** Searches for posts matching given query terms in the specified blog. */
export const searchPosts: API.OperationMethod<
  SearchPostsRequest,
  SearchPostsResponse,
  SearchPostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SearchPostsRequest,
  output: SearchPostsResponse,
  errors: [],
}));

export interface GetByPathPostsRequest {
  blogId: string;
  maxComments?: number;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  path: string;
}

export const GetByPathPostsRequest = Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  path: Schema.String.pipe(T.HttpQuery("path")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/bypath" }),
  svc,
) as unknown as Schema.Schema<GetByPathPostsRequest>;

export type GetByPathPostsResponse = Post;
export const GetByPathPostsResponse = Post;

export type GetByPathPostsError = DefaultErrors;

/** Gets a post by path. */
export const getByPathPosts: API.OperationMethod<
  GetByPathPostsRequest,
  GetByPathPostsResponse,
  GetByPathPostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetByPathPostsRequest,
  output: GetByPathPostsResponse,
  errors: [],
}));

export interface ListPostsRequest {
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  startDate?: string;
  /** Sort direction applied to post list. */
  sortOption?:
    | "SORT_OPTION_UNSPECIFIED"
    | "DESCENDING"
    | "ASCENDING"
    | (string & {});
  endDate?: string;
  blogId: string;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  pageToken?: string;
  labels?: string;
  fetchBodies?: boolean;
  fetchImages?: boolean;
  maxResults?: number;
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {})[];
}

export const ListPostsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  sortOption: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOption")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  labels: Schema.optional(Schema.String).pipe(T.HttpQuery("labels")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("status"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts" }),
  svc,
) as unknown as Schema.Schema<ListPostsRequest>;

export type ListPostsResponse = PostList;
export const ListPostsResponse = PostList;

export type ListPostsError = DefaultErrors;

/** Lists posts. */
export const listPosts: API.PaginatedOperationMethod<
  ListPostsRequest,
  ListPostsResponse,
  ListPostsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPostsRequest,
  output: ListPostsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface PatchPostsRequest {
  fetchBody?: boolean;
  maxComments?: number;
  postId: string;
  fetchImages?: boolean;
  publish?: boolean;
  revert?: boolean;
  blogId: string;
  /** Request body */
  body?: Post;
}

export const PatchPostsRequest = Schema.Struct({
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  body: Schema.optional(Post).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v3/blogs/{blogId}/posts/{postId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPostsRequest>;

export type PatchPostsResponse = Post;
export const PatchPostsResponse = Post;

export type PatchPostsError = DefaultErrors;

/** Patches a post. */
export const patchPosts: API.OperationMethod<
  PatchPostsRequest,
  PatchPostsResponse,
  PatchPostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPostsRequest,
  output: PatchPostsResponse,
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
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/posts/{postId}/revert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RevertPostsRequest>;

export type RevertPostsResponse = Post;
export const RevertPostsResponse = Post;

export type RevertPostsError = DefaultErrors;

/** Reverts a published or scheduled post to draft state. */
export const revertPosts: API.OperationMethod<
  RevertPostsRequest,
  RevertPostsResponse,
  RevertPostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RevertPostsRequest,
  output: RevertPostsResponse,
  errors: [],
}));

export interface UpdatePostsRequest {
  postId: string;
  fetchImages?: boolean;
  blogId: string;
  publish?: boolean;
  revert?: boolean;
  fetchBody?: boolean;
  maxComments?: number;
  /** Request body */
  body?: Post;
}

export const UpdatePostsRequest = Schema.Struct({
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  body: Schema.optional(Post).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "v3/blogs/{blogId}/posts/{postId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdatePostsRequest>;

export type UpdatePostsResponse = Post;
export const UpdatePostsResponse = Post;

export type UpdatePostsError = DefaultErrors;

/** Updates a post by blog id and post id. */
export const updatePosts: API.OperationMethod<
  UpdatePostsRequest,
  UpdatePostsResponse,
  UpdatePostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePostsRequest,
  output: UpdatePostsResponse,
  errors: [],
}));

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

export type InsertPostsError = DefaultErrors;

/** Inserts a post. */
export const insertPosts: API.OperationMethod<
  InsertPostsRequest,
  InsertPostsResponse,
  InsertPostsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertPostsRequest,
  output: InsertPostsResponse,
  errors: [],
}));

export interface GetByUrlBlogsRequest {
  url: string;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
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

export type GetByUrlBlogsError = DefaultErrors;

/** Gets a blog by url. */
export const getByUrlBlogs: API.OperationMethod<
  GetByUrlBlogsRequest,
  GetByUrlBlogsResponse,
  GetByUrlBlogsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetByUrlBlogsRequest,
  output: GetByUrlBlogsResponse,
  errors: [],
}));

export interface ListByUserBlogsRequest {
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  fetchUserInfo?: boolean;
  role?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {})[];
  userId: string;
  /** Default value of status is LIVE. */
  status?: "LIVE" | "DELETED" | (string & {})[];
}

export const ListByUserBlogsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  fetchUserInfo: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("fetchUserInfo"),
  ),
  role: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("role")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("status"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs" }),
  svc,
) as unknown as Schema.Schema<ListByUserBlogsRequest>;

export type ListByUserBlogsResponse = BlogList;
export const ListByUserBlogsResponse = BlogList;

export type ListByUserBlogsError = DefaultErrors;

/** Lists blogs by user. */
export const listByUserBlogs: API.OperationMethod<
  ListByUserBlogsRequest,
  ListByUserBlogsResponse,
  ListByUserBlogsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListByUserBlogsRequest,
  output: ListByUserBlogsResponse,
  errors: [],
}));

export interface GetBlogsRequest {
  blogId: string;
  maxPosts?: number;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
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

export type GetBlogsError = DefaultErrors;

/** Gets a blog by id. */
export const getBlogs: API.OperationMethod<
  GetBlogsRequest,
  GetBlogsResponse,
  GetBlogsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBlogsRequest,
  output: GetBlogsResponse,
  errors: [],
}));

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

export type GetBlogUserInfosError = DefaultErrors;

/** Gets one blog and user info pair by blog id and user id. */
export const getBlogUserInfos: API.OperationMethod<
  GetBlogUserInfosRequest,
  GetBlogUserInfosResponse,
  GetBlogUserInfosError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBlogUserInfosRequest,
  output: GetBlogUserInfosResponse,
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

export type GetUsersError = DefaultErrors;

/** Gets one user by user_id. */
export const getUsers: API.OperationMethod<
  GetUsersRequest,
  GetUsersResponse,
  GetUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetUsersRequest,
  output: GetUsersResponse,
  errors: [],
}));
