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
  /** The author of this Comment. */
  author?: {
    id?: string;
    displayName?: string;
    url?: string;
    image?: { url?: string };
  };
  /** The identifier for this resource. */
  id?: string;
  /** The kind of this entry. Always blogger#comment. */
  kind?: string;
  /** Data about the blog containing this comment. */
  blog?: { id?: string };
  /** Data about the post containing this comment. */
  post?: { id?: string };
  /** The actual content of the comment. May include HTML markup. */
  content?: string;
  /** The status of the comment (only populated for admin users). */
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {});
  /** Data about the comment this is in reply to. */
  inReplyTo?: { id?: string };
  /** RFC 3339 date-time when this comment was published. */
  published?: string;
  /** RFC 3339 date-time when this comment was last updated. */
  updated?: string;
}

export const Comment: Schema.Schema<Comment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selfLink: Schema.optional(Schema.String),
      author: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          url: Schema.optional(Schema.String),
          image: Schema.optional(
            Schema.Struct({ url: Schema.optional(Schema.String) }),
          ),
        }),
      ),
      id: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      blog: Schema.optional(
        Schema.Struct({ id: Schema.optional(Schema.String) }),
      ),
      post: Schema.optional(
        Schema.Struct({ id: Schema.optional(Schema.String) }),
      ),
      content: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      inReplyTo: Schema.optional(
        Schema.Struct({ id: Schema.optional(Schema.String) }),
      ),
      published: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface Post {
  /** The kind of this entity. Always blogger#post. */
  kind?: string;
  /** The title link URL, similar to atom's related link. */
  titleLink?: string;
  /** The identifier of this Post. */
  id?: string;
  /** The author of this Post. */
  author?: {
    image?: { url?: string };
    url?: string;
    displayName?: string;
    id?: string;
  };
  /** Data about the blog containing this Post. */
  blog?: { id?: string };
  /** The URL where this Post is displayed. */
  url?: string;
  /** RFC 3339 date-time when this Post was published. */
  published?: string;
  /** Etag of the resource. */
  etag?: string;
  /** The container of comments on this Post. */
  replies?: { totalItems?: string; selfLink?: string; items?: Array<Comment> };
  /** The list of labels this Post was tagged with. */
  labels?: Array<string>;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** Display image for the Post. */
  images?: Array<{ url?: string }>;
  /** Comment control and display setting for readers of this post. */
  readerComments?:
    | "ALLOW"
    | "DONT_ALLOW_SHOW_EXISTING"
    | "DONT_ALLOW_HIDE_EXISTING"
    | (string & {});
  /** The content of the Post. May contain HTML markup. */
  content?: string;
  /** RFC 3339 date-time when this Post was last trashed. */
  trashed?: string;
  /** The location for geotagged posts. */
  location?: { lat?: number; name?: string; lng?: number; span?: string };
  /** RFC 3339 date-time when this Post was last updated. */
  updated?: string;
  /** Status of the post. Only set for admin-level requests. */
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {});
  /** The title of the Post. */
  title?: string;
  /** The JSON meta-data for the Post. */
  customMetaData?: string;
}

export const Post: Schema.Schema<Post> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      titleLink: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      author: Schema.optional(
        Schema.Struct({
          image: Schema.optional(
            Schema.Struct({ url: Schema.optional(Schema.String) }),
          ),
          url: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
        }),
      ),
      blog: Schema.optional(
        Schema.Struct({ id: Schema.optional(Schema.String) }),
      ),
      url: Schema.optional(Schema.String),
      published: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      replies: Schema.optional(
        Schema.Struct({
          totalItems: Schema.optional(Schema.String),
          selfLink: Schema.optional(Schema.String),
          items: Schema.optional(Schema.Array(Comment)),
        }),
      ),
      labels: Schema.optional(Schema.Array(Schema.String)),
      selfLink: Schema.optional(Schema.String),
      images: Schema.optional(
        Schema.Array(Schema.Struct({ url: Schema.optional(Schema.String) })),
      ),
      readerComments: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      trashed: Schema.optional(Schema.String),
      location: Schema.optional(
        Schema.Struct({
          lat: Schema.optional(Schema.Number),
          name: Schema.optional(Schema.String),
          lng: Schema.optional(Schema.Number),
          span: Schema.optional(Schema.String),
        }),
      ),
      updated: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      customMetaData: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Post" }) as any as Schema.Schema<Post>;

export interface Blog {
  /** The kind of this entry. Always blogger#blog. */
  kind?: string;
  /** The container of pages in this blog. */
  pages?: { totalItems?: number; selfLink?: string };
  /** The identifier for this resource. */
  id?: string;
  /** The name of this blog. This is displayed as the title. */
  name?: string;
  /** RFC 3339 date-time when this blog was published. */
  published?: string;
  /** The URL where this blog is published. */
  url?: string;
  /** The container of posts in this blog. */
  posts?: { items?: Array<Post>; totalItems?: number; selfLink?: string };
  /** The locale this Blog is set to. */
  locale?: { variant?: string; language?: string; country?: string };
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The description of this blog. This is displayed underneath the title. */
  description?: string;
  /** RFC 3339 date-time when this blog was last updated. */
  updated?: string;
  /** The status of the blog. */
  status?: "LIVE" | "DELETED" | (string & {});
  /** The JSON custom meta-data for the Blog. */
  customMetaData?: string;
}

export const Blog: Schema.Schema<Blog> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      pages: Schema.optional(
        Schema.Struct({
          totalItems: Schema.optional(Schema.Number),
          selfLink: Schema.optional(Schema.String),
        }),
      ),
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      published: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      posts: Schema.optional(
        Schema.Struct({
          items: Schema.optional(Schema.Array(Post)),
          totalItems: Schema.optional(Schema.Number),
          selfLink: Schema.optional(Schema.String),
        }),
      ),
      locale: Schema.optional(
        Schema.Struct({
          variant: Schema.optional(Schema.String),
          language: Schema.optional(Schema.String),
          country: Schema.optional(Schema.String),
        }),
      ),
      selfLink: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      customMetaData: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Blog" }) as any as Schema.Schema<Blog>;

export interface BlogPerUserInfo {
  /** The Photo Album Key for the user when adding photos to the blog. */
  photosAlbumKey?: string;
  /** Access permissions that the user has for the blog (ADMIN, AUTHOR, or READER). */
  role?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  /** True if the user has Admin level access to the blog. */
  hasAdminAccess?: boolean;
  /** The kind of this entity. Always blogger#blogPerUserInfo. */
  kind?: string;
  /** ID of the Blog resource. */
  blogId?: string;
  /** ID of the User. */
  userId?: string;
}

export const BlogPerUserInfo: Schema.Schema<BlogPerUserInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      photosAlbumKey: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
      hasAdminAccess: Schema.optional(Schema.Boolean),
      kind: Schema.optional(Schema.String),
      blogId: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BlogPerUserInfo",
  }) as any as Schema.Schema<BlogPerUserInfo>;

export interface PostList {
  /** Etag of the response. */
  etag?: string;
  /** The list of Posts for this Blog. */
  items?: Array<Post>;
  /** Pagination token to fetch the previous page, if one exists. */
  prevPageToken?: string;
  /** The kind of this entity. Always blogger#postList. */
  kind?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
}

export const PostList: Schema.Schema<PostList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Post)),
      prevPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "PostList" }) as any as Schema.Schema<PostList>;

export interface Page {
  /** RFC 3339 date-time when this Page was trashed. */
  trashed?: string;
  /** The body content of this Page, in HTML. */
  content?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The status of the page for admin resources (either LIVE or DRAFT). */
  status?: "LIVE" | "DRAFT" | "SOFT_TRASHED" | (string & {});
  /** The title of this entity. This is the name displayed in the Admin user interface. */
  title?: string;
  /** RFC 3339 date-time when this Page was last updated. */
  updated?: string;
  /** Data about the blog containing this Page. */
  blog?: { id?: string };
  /** The identifier for this resource. */
  id?: string;
  /** The author of this Page. */
  author?: {
    id?: string;
    displayName?: string;
    url?: string;
    image?: { url?: string };
  };
  /** The kind of this entity. Always blogger#page. */
  kind?: string;
  /** Etag of the resource. */
  etag?: string;
  /** The URL that this Page is displayed at. */
  url?: string;
  /** RFC 3339 date-time when this Page was published. */
  published?: string;
}

export const Page: Schema.Schema<Page> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trashed: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      blog: Schema.optional(
        Schema.Struct({ id: Schema.optional(Schema.String) }),
      ),
      id: Schema.optional(Schema.String),
      author: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          url: Schema.optional(Schema.String),
          image: Schema.optional(
            Schema.Struct({ url: Schema.optional(Schema.String) }),
          ),
        }),
      ),
      kind: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      published: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface PageList {
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** The list of Pages for a Blog. */
  items?: Array<Page>;
  /** The kind of this entity. Always blogger#pageList. */
  kind?: string;
  /** Etag of the response. */
  etag?: string;
}

export const PageList: Schema.Schema<PageList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Page)),
      kind: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "PageList" }) as any as Schema.Schema<PageList>;

export interface PostPerUserInfo {
  /** The kind of this entity. Always blogger#postPerUserInfo. */
  kind?: string;
  /** True if the user has Author level access to the post. */
  hasEditAccess?: boolean;
  /** ID of the Post resource. */
  postId?: string;
  /** ID of the User. */
  userId?: string;
  /** ID of the Blog that the post resource belongs to. */
  blogId?: string;
}

export const PostPerUserInfo: Schema.Schema<PostPerUserInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      hasEditAccess: Schema.optional(Schema.Boolean),
      postId: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      blogId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PostPerUserInfo",
  }) as any as Schema.Schema<PostPerUserInfo>;

export interface PostUserInfo {
  /** The kind of this entity. Always blogger#postUserInfo. */
  kind?: string;
  /** The Post resource. */
  post?: Post;
  /** Information about a User for the Post. */
  post_user_info?: PostPerUserInfo;
}

export const PostUserInfo: Schema.Schema<PostUserInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      post: Schema.optional(Post),
      post_user_info: Schema.optional(PostPerUserInfo),
    }),
  ).annotate({
    identifier: "PostUserInfo",
  }) as any as Schema.Schema<PostUserInfo>;

export interface PostUserInfosList {
  /** The list of Posts with User information for the post, for this Blog. */
  items?: Array<PostUserInfo>;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** The kind of this entity. Always blogger#postList. */
  kind?: string;
}

export const PostUserInfosList: Schema.Schema<PostUserInfosList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(PostUserInfo)),
      nextPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PostUserInfosList",
  }) as any as Schema.Schema<PostUserInfosList>;

export interface CommentList {
  /** The kind of this entry. Always blogger#commentList. */
  kind?: string;
  /** Pagination token to fetch the next page, if one exists. */
  nextPageToken?: string;
  /** Etag of the response. */
  etag?: string;
  /** Pagination token to fetch the previous page, if one exists. */
  prevPageToken?: string;
  /** The List of Comments for a Post. */
  items?: Array<Comment>;
}

export const CommentList: Schema.Schema<CommentList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      prevPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Comment)),
    }),
  ).annotate({
    identifier: "CommentList",
  }) as any as Schema.Schema<CommentList>;

export interface BlogUserInfo {
  /** The kind of this entity. Always blogger#blogUserInfo. */
  kind?: string;
  /** The Blog resource. */
  blog?: Blog;
  /** Information about a User for the Blog. */
  blog_user_info?: BlogPerUserInfo;
}

export const BlogUserInfo: Schema.Schema<BlogUserInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      blog: Schema.optional(Blog),
      blog_user_info: Schema.optional(BlogPerUserInfo),
    }),
  ).annotate({
    identifier: "BlogUserInfo",
  }) as any as Schema.Schema<BlogUserInfo>;

export interface BlogList {
  /** The list of Blogs this user has Authorship or Admin rights over. */
  items?: Array<Blog>;
  /** The kind of this entity. Always blogger#blogList. */
  kind?: string;
  /** Admin level list of blog per-user information. */
  blogUserInfos?: Array<BlogUserInfo>;
}

export const BlogList: Schema.Schema<BlogList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(Blog)),
      kind: Schema.optional(Schema.String),
      blogUserInfos: Schema.optional(Schema.Array(BlogUserInfo)),
    }),
  ).annotate({ identifier: "BlogList" }) as any as Schema.Schema<BlogList>;

export interface Pageviews {
  /** Blog Id. */
  blogId?: string;
  /** The container of posts in this blog. */
  counts?: Array<{
    timeRange?: "ALL_TIME" | "THIRTY_DAYS" | "SEVEN_DAYS" | (string & {});
    count?: string;
  }>;
  /** The kind of this entry. Always blogger#page_views. */
  kind?: string;
}

export const Pageviews: Schema.Schema<Pageviews> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      blogId: Schema.optional(Schema.String),
      counts: Schema.optional(
        Schema.Array(
          Schema.Struct({
            timeRange: Schema.optional(Schema.String),
            count: Schema.optional(Schema.String),
          }),
        ),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Pageviews" }) as any as Schema.Schema<Pageviews>;

export interface User {
  /** Profile summary information. */
  about?: string;
  /** The user's profile page. */
  url?: string;
  /** This user's locale */
  locale?: { variant?: string; language?: string; country?: string };
  /** The timestamp of when this profile was created, in seconds since epoch. */
  created?: string;
  /** The API REST URL to fetch this resource from. */
  selfLink?: string;
  /** The identifier for this User. */
  id?: string;
  /** The container of blogs for this user. */
  blogs?: { selfLink?: string };
  /** The kind of this entity. Always blogger#user. */
  kind?: string;
  /** The display name. */
  displayName?: string;
}

export const User: Schema.Schema<User> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      about: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      locale: Schema.optional(
        Schema.Struct({
          variant: Schema.optional(Schema.String),
          language: Schema.optional(Schema.String),
          country: Schema.optional(Schema.String),
        }),
      ),
      created: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      blogs: Schema.optional(
        Schema.Struct({ selfLink: Schema.optional(Schema.String) }),
      ),
      kind: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetUsersRequest {
  userId: string;
}

export const GetUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersRequest>;

export type GetUsersResponse = User;
export const GetUsersResponse = /*@__PURE__*/ /*#__PURE__*/ User;

export type GetUsersError = DefaultErrors;

/** Gets one user by user_id. */
export const getUsers: API.OperationMethod<
  GetUsersRequest,
  GetUsersResponse,
  GetUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersRequest,
  output: GetUsersResponse,
  errors: [],
}));

export interface InsertPostsRequest {
  fetchImages?: boolean;
  isDraft?: boolean;
  blogId: string;
  fetchBody?: boolean;
  /** Request body */
  body?: Post;
}

export const InsertPostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  isDraft: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("isDraft")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  body: Schema.optional(Post).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/posts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPostsRequest>;

export type InsertPostsResponse = Post;
export const InsertPostsResponse = /*@__PURE__*/ /*#__PURE__*/ Post;

export type InsertPostsError = DefaultErrors;

/** Inserts a post. */
export const insertPosts: API.OperationMethod<
  InsertPostsRequest,
  InsertPostsResponse,
  InsertPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertPostsRequest,
  output: InsertPostsResponse,
  errors: [],
}));

export interface PublishPostsRequest {
  blogId: string;
  postId: string;
  publishDate?: string;
}

export const PublishPostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  publishDate: Schema.optional(Schema.String).pipe(T.HttpQuery("publishDate")),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/posts/{postId}/publish",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PublishPostsRequest>;

export type PublishPostsResponse = Post;
export const PublishPostsResponse = /*@__PURE__*/ /*#__PURE__*/ Post;

export type PublishPostsError = DefaultErrors;

/** Publishes a post. */
export const publishPosts: API.OperationMethod<
  PublishPostsRequest,
  PublishPostsResponse,
  PublishPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const DeletePostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  useTrash: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useTrash")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<DeletePostsRequest>;

export interface DeletePostsResponse {}
export const DeletePostsResponse: Schema.Schema<DeletePostsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeletePostsResponse>;

export type DeletePostsError = DefaultErrors;

/** Deletes a post by blog id and post id. */
export const deletePosts: API.OperationMethod<
  DeletePostsRequest,
  DeletePostsResponse,
  DeletePostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePostsRequest,
  output: DeletePostsResponse,
  errors: [],
}));

export interface PatchPostsRequest {
  postId: string;
  fetchBody?: boolean;
  fetchImages?: boolean;
  maxComments?: number;
  blogId: string;
  publish?: boolean;
  revert?: boolean;
  /** Request body */
  body?: Post;
}

export const PatchPostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
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
export const PatchPostsResponse = /*@__PURE__*/ /*#__PURE__*/ Post;

export type PatchPostsError = DefaultErrors;

/** Patches a post. */
export const patchPosts: API.OperationMethod<
  PatchPostsRequest,
  PatchPostsResponse,
  PatchPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchPostsRequest,
  output: PatchPostsResponse,
  errors: [],
}));

export interface GetPostsRequest {
  fetchImages?: boolean;
  maxComments?: number;
  postId: string;
  fetchBody?: boolean;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  blogId: string;
}

export const GetPostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}" }),
  svc,
) as unknown as Schema.Schema<GetPostsRequest>;

export type GetPostsResponse = Post;
export const GetPostsResponse = /*@__PURE__*/ /*#__PURE__*/ Post;

export type GetPostsError = DefaultErrors;

/** Gets a post by blog id and post id */
export const getPosts: API.OperationMethod<
  GetPostsRequest,
  GetPostsResponse,
  GetPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPostsRequest,
  output: GetPostsResponse,
  errors: [],
}));

export interface GetByPathPostsRequest {
  path: string;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  maxComments?: number;
  blogId: string;
}

export const GetByPathPostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  path: Schema.String.pipe(T.HttpQuery("path")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  maxComments: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxComments")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/bypath" }),
  svc,
) as unknown as Schema.Schema<GetByPathPostsRequest>;

export type GetByPathPostsResponse = Post;
export const GetByPathPostsResponse = /*@__PURE__*/ /*#__PURE__*/ Post;

export type GetByPathPostsError = DefaultErrors;

/** Gets a post by path. */
export const getByPathPosts: API.OperationMethod<
  GetByPathPostsRequest,
  GetByPathPostsResponse,
  GetByPathPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetByPathPostsRequest,
  output: GetByPathPostsResponse,
  errors: [],
}));

export interface ListPostsRequest {
  endDate?: string;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  /** Sort direction applied to post list. */
  sortOption?:
    | "SORT_OPTION_UNSPECIFIED"
    | "DESCENDING"
    | "ASCENDING"
    | (string & {});
  fetchBodies?: boolean;
  maxResults?: number;
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {})[];
  blogId: string;
  labels?: string;
  pageToken?: string;
  startDate?: string;
  fetchImages?: boolean;
}

export const ListPostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  sortOption: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOption")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("status"),
  ),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  labels: Schema.optional(Schema.String).pipe(T.HttpQuery("labels")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts" }),
  svc,
) as unknown as Schema.Schema<ListPostsRequest>;

export type ListPostsResponse = PostList;
export const ListPostsResponse = /*@__PURE__*/ /*#__PURE__*/ PostList;

export type ListPostsError = DefaultErrors;

/** Lists posts. */
export const listPosts: API.PaginatedOperationMethod<
  ListPostsRequest,
  ListPostsResponse,
  ListPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPostsRequest,
  output: ListPostsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface SearchPostsRequest {
  fetchBodies?: boolean;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  blogId: string;
  q: string;
}

export const SearchPostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  q: Schema.String.pipe(T.HttpQuery("q")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/search" }),
  svc,
) as unknown as Schema.Schema<SearchPostsRequest>;

export type SearchPostsResponse = PostList;
export const SearchPostsResponse = /*@__PURE__*/ /*#__PURE__*/ PostList;

export type SearchPostsError = DefaultErrors;

/** Searches for posts matching given query terms in the specified blog. */
export const searchPosts: API.OperationMethod<
  SearchPostsRequest,
  SearchPostsResponse,
  SearchPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SearchPostsRequest,
  output: SearchPostsResponse,
  errors: [],
}));

export interface RevertPostsRequest {
  blogId: string;
  postId: string;
}

export const RevertPostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export const RevertPostsResponse = /*@__PURE__*/ /*#__PURE__*/ Post;

export type RevertPostsError = DefaultErrors;

/** Reverts a published or scheduled post to draft state. */
export const revertPosts: API.OperationMethod<
  RevertPostsRequest,
  RevertPostsResponse,
  RevertPostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RevertPostsRequest,
  output: RevertPostsResponse,
  errors: [],
}));

export interface UpdatePostsRequest {
  blogId: string;
  publish?: boolean;
  revert?: boolean;
  postId: string;
  fetchBody?: boolean;
  fetchImages?: boolean;
  maxComments?: number;
  /** Request body */
  body?: Post;
}

export const UpdatePostsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
  fetchBody: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBody")),
  fetchImages: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchImages")),
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
export const UpdatePostsResponse = /*@__PURE__*/ /*#__PURE__*/ Post;

export type UpdatePostsError = DefaultErrors;

/** Updates a post by blog id and post id. */
export const updatePosts: API.OperationMethod<
  UpdatePostsRequest,
  UpdatePostsResponse,
  UpdatePostsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePostsRequest,
  output: UpdatePostsResponse,
  errors: [],
}));

export interface GetPageViewsRequest {
  blogId: string;
  range?: "all" | "30DAYS" | "7DAYS" | (string & {})[];
}

export const GetPageViewsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  range: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("range"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pageviews" }),
  svc,
) as unknown as Schema.Schema<GetPageViewsRequest>;

export type GetPageViewsResponse = Pageviews;
export const GetPageViewsResponse = /*@__PURE__*/ /*#__PURE__*/ Pageviews;

export type GetPageViewsError = DefaultErrors;

/** Gets page views by blog id. */
export const getPageViews: API.OperationMethod<
  GetPageViewsRequest,
  GetPageViewsResponse,
  GetPageViewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPageViewsRequest,
  output: GetPageViewsResponse,
  errors: [],
}));

export interface GetCommentsRequest {
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  commentId: string;
  blogId: string;
  postId: string;
}

export const GetCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  postId: Schema.String.pipe(T.HttpPath("postId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}",
  }),
  svc,
) as unknown as Schema.Schema<GetCommentsRequest>;

export type GetCommentsResponse = Comment;
export const GetCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type GetCommentsError = DefaultErrors;

/** Gets a comment by id. */
export const getComments: API.OperationMethod<
  GetCommentsRequest,
  GetCommentsResponse,
  GetCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCommentsRequest,
  output: GetCommentsResponse,
  errors: [],
}));

export interface ListCommentsRequest {
  postId: string;
  startDate?: string;
  pageToken?: string;
  blogId: string;
  maxResults?: number;
  fetchBodies?: boolean;
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {});
  endDate?: string;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
}

export const ListCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  postId: Schema.String.pipe(T.HttpPath("postId")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/posts/{postId}/comments" }),
  svc,
) as unknown as Schema.Schema<ListCommentsRequest>;

export type ListCommentsResponse = CommentList;
export const ListCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ CommentList;

export type ListCommentsError = DefaultErrors;

/** Lists comments. */
export const listComments: API.PaginatedOperationMethod<
  ListCommentsRequest,
  ListCommentsResponse,
  ListCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ListByBlogCommentsRequest {
  endDate?: string;
  blogId: string;
  startDate?: string;
  pageToken?: string;
  maxResults?: number;
  fetchBodies?: boolean;
  status?: "LIVE" | "EMPTIED" | "PENDING" | "SPAM" | (string & {})[];
}

export const ListByBlogCommentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
    blogId: Schema.String.pipe(T.HttpPath("blogId")),
    startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    fetchBodies: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("fetchBodies"),
    ),
    status: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("status"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v3/blogs/{blogId}/comments" }),
    svc,
  ) as unknown as Schema.Schema<ListByBlogCommentsRequest>;

export type ListByBlogCommentsResponse = CommentList;
export const ListByBlogCommentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CommentList;

export type ListByBlogCommentsError = DefaultErrors;

/** Lists comments by blog. */
export const listByBlogComments: API.PaginatedOperationMethod<
  ListByBlogCommentsRequest,
  ListByBlogCommentsResponse,
  ListByBlogCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListByBlogCommentsRequest,
  output: ListByBlogCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ApproveCommentsRequest {
  commentId: string;
  blogId: string;
  postId: string;
}

export const ApproveCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    commentId: Schema.String.pipe(T.HttpPath("commentId")),
    blogId: Schema.String.pipe(T.HttpPath("blogId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/approve",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ApproveCommentsRequest>;

export type ApproveCommentsResponse = Comment;
export const ApproveCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type ApproveCommentsError = DefaultErrors;

/** Marks a comment as not spam by blog id, post id and comment id. */
export const approveComments: API.OperationMethod<
  ApproveCommentsRequest,
  ApproveCommentsResponse,
  ApproveCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ApproveCommentsRequest,
  output: ApproveCommentsResponse,
  errors: [],
}));

export interface MarkAsSpamCommentsRequest {
  commentId: string;
  blogId: string;
  postId: string;
}

export const MarkAsSpamCommentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    commentId: Schema.String.pipe(T.HttpPath("commentId")),
    blogId: Schema.String.pipe(T.HttpPath("blogId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/spam",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<MarkAsSpamCommentsRequest>;

export type MarkAsSpamCommentsResponse = Comment;
export const MarkAsSpamCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type MarkAsSpamCommentsError = DefaultErrors;

/** Marks a comment as spam by blog id, post id and comment id. */
export const markAsSpamComments: API.OperationMethod<
  MarkAsSpamCommentsRequest,
  MarkAsSpamCommentsResponse,
  MarkAsSpamCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MarkAsSpamCommentsRequest,
  output: MarkAsSpamCommentsResponse,
  errors: [],
}));

export interface RemoveContentCommentsRequest {
  blogId: string;
  postId: string;
  commentId: string;
}

export const RemoveContentCommentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    blogId: Schema.String.pipe(T.HttpPath("blogId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
    commentId: Schema.String.pipe(T.HttpPath("commentId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/removecontent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RemoveContentCommentsRequest>;

export type RemoveContentCommentsResponse = Comment;
export const RemoveContentCommentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Comment;

export type RemoveContentCommentsError = DefaultErrors;

/** Removes the content of a comment by blog id, post id and comment id. */
export const removeContentComments: API.OperationMethod<
  RemoveContentCommentsRequest,
  RemoveContentCommentsResponse,
  RemoveContentCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveContentCommentsRequest,
  output: RemoveContentCommentsResponse,
  errors: [],
}));

export interface DeleteCommentsRequest {
  commentId: string;
  blogId: string;
  postId: string;
}

export const DeleteCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  commentId: Schema.String.pipe(T.HttpPath("commentId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteCommentsResponse>;

export type DeleteCommentsError = DefaultErrors;

/** Deletes a comment by blog id, post id and comment id. */
export const deleteComments: API.OperationMethod<
  DeleteCommentsRequest,
  DeleteCommentsResponse,
  DeleteCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCommentsRequest,
  output: DeleteCommentsResponse,
  errors: [],
}));

export interface ListByUserBlogsRequest {
  role?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {})[];
  /** Default value of status is LIVE. */
  status?: "LIVE" | "DELETED" | (string & {})[];
  userId: string;
  fetchUserInfo?: boolean;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
}

export const ListByUserBlogsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    role: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("role"),
    ),
    status: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("status"),
    ),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    fetchUserInfo: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("fetchUserInfo"),
    ),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  },
).pipe(
  T.Http({ method: "GET", path: "v3/users/{userId}/blogs" }),
  svc,
) as unknown as Schema.Schema<ListByUserBlogsRequest>;

export type ListByUserBlogsResponse = BlogList;
export const ListByUserBlogsResponse = /*@__PURE__*/ /*#__PURE__*/ BlogList;

export type ListByUserBlogsError = DefaultErrors;

/** Lists blogs by user. */
export const listByUserBlogs: API.OperationMethod<
  ListByUserBlogsRequest,
  ListByUserBlogsResponse,
  ListByUserBlogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListByUserBlogsRequest,
  output: ListByUserBlogsResponse,
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

export const GetByUrlBlogsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  url: Schema.String.pipe(T.HttpQuery("url")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/byurl" }),
  svc,
) as unknown as Schema.Schema<GetByUrlBlogsRequest>;

export type GetByUrlBlogsResponse = Blog;
export const GetByUrlBlogsResponse = /*@__PURE__*/ /*#__PURE__*/ Blog;

export type GetByUrlBlogsError = DefaultErrors;

/** Gets a blog by url. */
export const getByUrlBlogs: API.OperationMethod<
  GetByUrlBlogsRequest,
  GetByUrlBlogsResponse,
  GetByUrlBlogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetByUrlBlogsRequest,
  output: GetByUrlBlogsResponse,
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

export const GetBlogsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  maxPosts: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxPosts")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}" }),
  svc,
) as unknown as Schema.Schema<GetBlogsRequest>;

export type GetBlogsResponse = Blog;
export const GetBlogsResponse = /*@__PURE__*/ /*#__PURE__*/ Blog;

export type GetBlogsError = DefaultErrors;

/** Gets a blog by id. */
export const getBlogs: API.OperationMethod<
  GetBlogsRequest,
  GetBlogsResponse,
  GetBlogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBlogsRequest,
  output: GetBlogsResponse,
  errors: [],
}));

export interface PublishPagesRequest {
  blogId: string;
  pageId: string;
}

export const PublishPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export const PublishPagesResponse = /*@__PURE__*/ /*#__PURE__*/ Page;

export type PublishPagesError = DefaultErrors;

/** Publishes a page. */
export const publishPages: API.OperationMethod<
  PublishPagesRequest,
  PublishPagesResponse,
  PublishPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PublishPagesRequest,
  output: PublishPagesResponse,
  errors: [],
}));

export interface RevertPagesRequest {
  blogId: string;
  pageId: string;
}

export const RevertPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export const RevertPagesResponse = /*@__PURE__*/ /*#__PURE__*/ Page;

export type RevertPagesError = DefaultErrors;

/** Reverts a published or scheduled page to draft state. */
export const revertPages: API.OperationMethod<
  RevertPagesRequest,
  RevertPagesResponse,
  RevertPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RevertPagesRequest,
  output: RevertPagesResponse,
  errors: [],
}));

export interface UpdatePagesRequest {
  blogId: string;
  publish?: boolean;
  revert?: boolean;
  pageId: string;
  /** Request body */
  body?: Page;
}

export const UpdatePagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
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
export const UpdatePagesResponse = /*@__PURE__*/ /*#__PURE__*/ Page;

export type UpdatePagesError = DefaultErrors;

/** Updates a page by blog id and page id. */
export const updatePages: API.OperationMethod<
  UpdatePagesRequest,
  UpdatePagesResponse,
  UpdatePagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePagesRequest,
  output: UpdatePagesResponse,
  errors: [],
}));

export interface InsertPagesRequest {
  isDraft?: boolean;
  blogId: string;
  /** Request body */
  body?: Page;
}

export const InsertPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  isDraft: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("isDraft")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  body: Schema.optional(Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/blogs/{blogId}/pages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPagesRequest>;

export type InsertPagesResponse = Page;
export const InsertPagesResponse = /*@__PURE__*/ /*#__PURE__*/ Page;

export type InsertPagesError = DefaultErrors;

/** Inserts a page. */
export const insertPages: API.OperationMethod<
  InsertPagesRequest,
  InsertPagesResponse,
  InsertPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertPagesRequest,
  output: InsertPagesResponse,
  errors: [],
}));

export interface DeletePagesRequest {
  /** Move to Trash if possible */
  useTrash?: boolean;
  pageId: string;
  blogId: string;
}

export const DeletePagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  useTrash: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("useTrash")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/blogs/{blogId}/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<DeletePagesRequest>;

export interface DeletePagesResponse {}
export const DeletePagesResponse: Schema.Schema<DeletePagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeletePagesResponse>;

export type DeletePagesError = DefaultErrors;

/** Deletes a page by blog id and page id. */
export const deletePages: API.OperationMethod<
  DeletePagesRequest,
  DeletePagesResponse,
  DeletePagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePagesRequest,
  output: DeletePagesResponse,
  errors: [],
}));

export interface PatchPagesRequest {
  pageId: string;
  blogId: string;
  publish?: boolean;
  revert?: boolean;
  /** Request body */
  body?: Page;
}

export const PatchPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  publish: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("publish")),
  revert: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revert")),
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
export const PatchPagesResponse = /*@__PURE__*/ /*#__PURE__*/ Page;

export type PatchPagesError = DefaultErrors;

/** Patches a page. */
export const patchPages: API.OperationMethod<
  PatchPagesRequest,
  PatchPagesResponse,
  PatchPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchPagesRequest,
  output: PatchPagesResponse,
  errors: [],
}));

export interface GetPagesRequest {
  blogId: string;
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  pageId: string;
}

export const GetPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<GetPagesRequest>;

export type GetPagesResponse = Page;
export const GetPagesResponse = /*@__PURE__*/ /*#__PURE__*/ Page;

export type GetPagesError = DefaultErrors;

/** Gets a page by blog id and page id. */
export const getPages: API.OperationMethod<
  GetPagesRequest,
  GetPagesResponse,
  GetPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPagesRequest,
  output: GetPagesResponse,
  errors: [],
}));

export interface ListPagesRequest {
  pageToken?: string;
  fetchBodies?: boolean;
  maxResults?: number;
  status?: "LIVE" | "DRAFT" | "SOFT_TRASHED" | (string & {})[];
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  blogId: string;
}

export const ListPagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  fetchBodies: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("fetchBodies")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("status"),
  ),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  blogId: Schema.String.pipe(T.HttpPath("blogId")),
}).pipe(
  T.Http({ method: "GET", path: "v3/blogs/{blogId}/pages" }),
  svc,
) as unknown as Schema.Schema<ListPagesRequest>;

export type ListPagesResponse = PageList;
export const ListPagesResponse = /*@__PURE__*/ /*#__PURE__*/ PageList;

export type ListPagesError = DefaultErrors;

/** Lists pages. */
export const listPages: API.PaginatedOperationMethod<
  ListPagesRequest,
  ListPagesResponse,
  ListPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPagesRequest,
  output: ListPagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetBlogUserInfosRequest {
  userId: string;
  maxPosts?: number;
  blogId: string;
}

export const GetBlogUserInfosRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    maxPosts: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxPosts")),
    blogId: Schema.String.pipe(T.HttpPath("blogId")),
  }).pipe(
    T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}" }),
    svc,
  ) as unknown as Schema.Schema<GetBlogUserInfosRequest>;

export type GetBlogUserInfosResponse = BlogUserInfo;
export const GetBlogUserInfosResponse =
  /*@__PURE__*/ /*#__PURE__*/ BlogUserInfo;

export type GetBlogUserInfosError = DefaultErrors;

/** Gets one blog and user info pair by blog id and user id. */
export const getBlogUserInfos: API.OperationMethod<
  GetBlogUserInfosRequest,
  GetBlogUserInfosResponse,
  GetBlogUserInfosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBlogUserInfosRequest,
  output: GetBlogUserInfosResponse,
  errors: [],
}));

export interface GetPostUserInfosRequest {
  blogId: string;
  postId: string;
  userId: string;
  maxComments?: number;
}

export const GetPostUserInfosRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    blogId: Schema.String.pipe(T.HttpPath("blogId")),
    postId: Schema.String.pipe(T.HttpPath("postId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    maxComments: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("maxComments"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/users/{userId}/blogs/{blogId}/posts/{postId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPostUserInfosRequest>;

export type GetPostUserInfosResponse = PostUserInfo;
export const GetPostUserInfosResponse =
  /*@__PURE__*/ /*#__PURE__*/ PostUserInfo;

export type GetPostUserInfosError = DefaultErrors;

/** Gets one post and user info pair, by post_id and user_id. */
export const getPostUserInfos: API.OperationMethod<
  GetPostUserInfosRequest,
  GetPostUserInfosResponse,
  GetPostUserInfosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPostUserInfosRequest,
  output: GetPostUserInfosResponse,
  errors: [],
}));

export interface ListPostUserInfosRequest {
  endDate?: string;
  orderBy?: "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED" | (string & {});
  view?:
    | "VIEW_TYPE_UNSPECIFIED"
    | "READER"
    | "AUTHOR"
    | "ADMIN"
    | (string & {});
  userId: string;
  fetchBodies?: boolean;
  maxResults?: number;
  status?: "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED" | (string & {})[];
  blogId: string;
  labels?: string;
  startDate?: string;
  pageToken?: string;
}

export const ListPostUserInfosRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("endDate")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    fetchBodies: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("fetchBodies"),
    ),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    status: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("status"),
    ),
    blogId: Schema.String.pipe(T.HttpPath("blogId")),
    labels: Schema.optional(Schema.String).pipe(T.HttpQuery("labels")),
    startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("startDate")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v3/users/{userId}/blogs/{blogId}/posts" }),
    svc,
  ) as unknown as Schema.Schema<ListPostUserInfosRequest>;

export type ListPostUserInfosResponse = PostUserInfosList;
export const ListPostUserInfosResponse =
  /*@__PURE__*/ /*#__PURE__*/ PostUserInfosList;

export type ListPostUserInfosError = DefaultErrors;

/** Lists post and user info pairs. */
export const listPostUserInfos: API.PaginatedOperationMethod<
  ListPostUserInfosRequest,
  ListPostUserInfosResponse,
  ListPostUserInfosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPostUserInfosRequest,
  output: ListPostUserInfosResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));
