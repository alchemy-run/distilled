// ==========================================================================
// My Business Q&A API (mybusinessqanda v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "mybusinessqanda",
  version: "v1",
  rootUrl: "https://mybusinessqanda.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Author {
  /** The profile photo URI of the user. */
  profilePhotoUri?: string;
  /** The type of user the author is. */
  type?:
    | "AUTHOR_TYPE_UNSPECIFIED"
    | "REGULAR_USER"
    | "LOCAL_GUIDE"
    | "MERCHANT"
    | (string & {});
  /** The display name of the user */
  displayName?: string;
}

export const Author: Schema.Schema<Author> = Schema.suspend(() =>
  Schema.Struct({
    profilePhotoUri: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Author" }) as any as Schema.Schema<Author>;

export interface Answer {
  /** Required. The text of the answer. It should contain at least one non-whitespace character. The maximum length is 4096 characters. */
  text?: string;
  /** Output only. The timestamp for when the answer was written. Only retrieved during ListResponse fetching. */
  createTime?: string;
  /** Output only. The unique name for the answer locations/* /questions/* /answers/* */
  name?: string;
  /** Output only. The timestamp for when the answer was last modified. */
  updateTime?: string;
  /** Output only. The number of upvotes for the answer. */
  upvoteCount?: number;
  /** Output only. The author of the answer. Will only be set during list operations. */
  author?: Author;
}

export const Answer: Schema.Schema<Answer> = Schema.suspend(() =>
  Schema.Struct({
    text: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    upvoteCount: Schema.optional(Schema.Number),
    author: Schema.optional(Author),
  }),
).annotate({ identifier: "Answer" }) as any as Schema.Schema<Answer>;

export interface ListAnswersResponse {
  /** The requested answers. */
  answers?: Array<Answer>;
  /** The total number of answers posted for this question across all pages. */
  totalSize?: number;
  /** If the number of answers exceeds the requested max page size, this field is populated with a token to fetch the next page of answers on a subsequent call. If there are no more answers, this field is not present in the response. */
  nextPageToken?: string;
}

export const ListAnswersResponse: Schema.Schema<ListAnswersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      answers: Schema.optional(Schema.Array(Answer)),
      totalSize: Schema.optional(Schema.Number),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAnswersResponse",
  }) as any as Schema.Schema<ListAnswersResponse>;

export interface Question {
  /** Required. The text of the question. It should contain at least three words and the total length should be greater than or equal to 10 characters. The maximum length is 4096 characters. */
  text?: string;
  /** Output only. The timestamp for when the question was written. */
  createTime?: string;
  /** Immutable. The unique name for the question. locations/* /questions/* This field will be ignored if set during question creation. */
  name?: string;
  /** Output only. The timestamp for when the question was last modified. */
  updateTime?: string;
  /** Output only. The total number of answers posted for this question. */
  totalAnswerCount?: number;
  /** Output only. The number of upvotes for the question. */
  upvoteCount?: number;
  /** Output only. A list of answers to the question, sorted by upvotes. This may not be a complete list of answers depending on the request parameters (answers_per_question) */
  topAnswers?: Array<Answer>;
  /** Output only. The author of the question. */
  author?: Author;
}

export const Question: Schema.Schema<Question> = Schema.suspend(() =>
  Schema.Struct({
    text: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    totalAnswerCount: Schema.optional(Schema.Number),
    upvoteCount: Schema.optional(Schema.Number),
    topAnswers: Schema.optional(Schema.Array(Answer)),
    author: Schema.optional(Author),
  }),
).annotate({ identifier: "Question" }) as any as Schema.Schema<Question>;

export interface ListQuestionsResponse {
  /** The requested questions, */
  questions?: Array<Question>;
  /** The total number of questions posted for this location across all pages. */
  totalSize?: number;
  /** If the number of questions exceeds the requested max page size, this field is populated with a token to fetch the next page of questions on a subsequent call. If there are no more questions, this field is not present in the response. */
  nextPageToken?: string;
}

export const ListQuestionsResponse: Schema.Schema<ListQuestionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      questions: Schema.optional(Schema.Array(Question)),
      totalSize: Schema.optional(Schema.Number),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListQuestionsResponse",
  }) as any as Schema.Schema<ListQuestionsResponse>;

export interface UpsertAnswerRequest {
  /** Required. The new answer. */
  answer?: Answer;
}

export const UpsertAnswerRequest: Schema.Schema<UpsertAnswerRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      answer: Schema.optional(Answer),
    }),
  ).annotate({
    identifier: "UpsertAnswerRequest",
  }) as any as Schema.Schema<UpsertAnswerRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListLocationsQuestionsRequest {
  /** Optional. How many answers to fetch per question. The default and maximum `answers_per_question` values are 10. */
  answersPerQuestion?: number;
  /** Optional. The order to return the questions. Valid options include 'update_time desc' and 'upvote_count desc', which will return the questions sorted descendingly by the requested field. The default sort order is 'update_time desc'. */
  orderBy?: string;
  /** Optional. A filter constraining the questions to return. The only filter currently supported is "ignore_answered=true" */
  filter?: string;
  /** Optional. How many questions to fetch per page. The default and maximum `page_size` values are 10. */
  pageSize?: number;
  /** Required. The name of the location to fetch questions for. */
  parent: string;
  /** Optional. If specified, the next page of questions is retrieved. */
  pageToken?: string;
}

export const ListLocationsQuestionsRequest = Schema.Struct({
  answersPerQuestion: Schema.optional(Schema.Number).pipe(
    T.HttpQuery("answersPerQuestion"),
  ),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/questions" }),
  svc,
) as unknown as Schema.Schema<ListLocationsQuestionsRequest>;

export type ListLocationsQuestionsResponse = ListQuestionsResponse;
export const ListLocationsQuestionsResponse = ListQuestionsResponse;

export type ListLocationsQuestionsError = DefaultErrors;

/** Returns the paginated list of questions and some of its answers for a specified location. This operation is only valid if the specified location is verified. */
export const listLocationsQuestions: API.PaginatedOperationMethod<
  ListLocationsQuestionsRequest,
  ListLocationsQuestionsResponse,
  ListLocationsQuestionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsQuestionsRequest,
  output: ListLocationsQuestionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchLocationsQuestionsRequest {
  /** Required. The specific fields to update. Only question text can be updated. */
  updateMask?: string;
  /** Immutable. The unique name for the question. locations/* /questions/* This field will be ignored if set during question creation. */
  name: string;
  /** Request body */
  body?: Question;
}

export const PatchLocationsQuestionsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Question).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/locations/{locationsId}/questions/{questionsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchLocationsQuestionsRequest>;

export type PatchLocationsQuestionsResponse = Question;
export const PatchLocationsQuestionsResponse = Question;

export type PatchLocationsQuestionsError = DefaultErrors;

/** Updates a specific question written by the current user. */
export const patchLocationsQuestions: API.OperationMethod<
  PatchLocationsQuestionsRequest,
  PatchLocationsQuestionsResponse,
  PatchLocationsQuestionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLocationsQuestionsRequest,
  output: PatchLocationsQuestionsResponse,
  errors: [],
}));

export interface DeleteLocationsQuestionsRequest {
  /** Required. The name of the question to delete. */
  name: string;
}

export const DeleteLocationsQuestionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/locations/{locationsId}/questions/{questionsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsQuestionsRequest>;

export type DeleteLocationsQuestionsResponse = Empty;
export const DeleteLocationsQuestionsResponse = Empty;

export type DeleteLocationsQuestionsError = DefaultErrors;

/** Deletes a specific question written by the current user. */
export const deleteLocationsQuestions: API.OperationMethod<
  DeleteLocationsQuestionsRequest,
  DeleteLocationsQuestionsResponse,
  DeleteLocationsQuestionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsQuestionsRequest,
  output: DeleteLocationsQuestionsResponse,
  errors: [],
}));

export interface CreateLocationsQuestionsRequest {
  /** Required. The name of the location to write a question for. */
  parent: string;
  /** Request body */
  body?: Question;
}

export const CreateLocationsQuestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Question).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/questions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateLocationsQuestionsRequest>;

export type CreateLocationsQuestionsResponse = Question;
export const CreateLocationsQuestionsResponse = Question;

export type CreateLocationsQuestionsError = DefaultErrors;

/** Adds a question for the specified location. */
export const createLocationsQuestions: API.OperationMethod<
  CreateLocationsQuestionsRequest,
  CreateLocationsQuestionsResponse,
  CreateLocationsQuestionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLocationsQuestionsRequest,
  output: CreateLocationsQuestionsResponse,
  errors: [],
}));

export interface UpsertLocationsQuestionsAnswersRequest {
  /** Required. The name of the question to write an answer for. */
  parent: string;
  /** Request body */
  body?: UpsertAnswerRequest;
}

export const UpsertLocationsQuestionsAnswersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UpsertAnswerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/questions/{questionsId}/answers:upsert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpsertLocationsQuestionsAnswersRequest>;

export type UpsertLocationsQuestionsAnswersResponse = Answer;
export const UpsertLocationsQuestionsAnswersResponse = Answer;

export type UpsertLocationsQuestionsAnswersError = DefaultErrors;

/** Creates an answer or updates the existing answer written by the user for the specified question. A user can only create one answer per question. */
export const upsertLocationsQuestionsAnswers: API.OperationMethod<
  UpsertLocationsQuestionsAnswersRequest,
  UpsertLocationsQuestionsAnswersResponse,
  UpsertLocationsQuestionsAnswersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpsertLocationsQuestionsAnswersRequest,
  output: UpsertLocationsQuestionsAnswersResponse,
  errors: [],
}));

export interface DeleteLocationsQuestionsAnswersRequest {
  /** Required. The name of the question to delete an answer for. */
  name: string;
}

export const DeleteLocationsQuestionsAnswersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/locations/{locationsId}/questions/{questionsId}/answers:delete",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsQuestionsAnswersRequest>;

export type DeleteLocationsQuestionsAnswersResponse = Empty;
export const DeleteLocationsQuestionsAnswersResponse = Empty;

export type DeleteLocationsQuestionsAnswersError = DefaultErrors;

/** Deletes the answer written by the current user to a question. */
export const deleteLocationsQuestionsAnswers: API.OperationMethod<
  DeleteLocationsQuestionsAnswersRequest,
  DeleteLocationsQuestionsAnswersResponse,
  DeleteLocationsQuestionsAnswersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsQuestionsAnswersRequest,
  output: DeleteLocationsQuestionsAnswersResponse,
  errors: [],
}));

export interface ListLocationsQuestionsAnswersRequest {
  /** Optional. The order to return the answers. Valid options include 'update_time desc' and 'upvote_count desc', which will return the answers sorted descendingly by the requested field. The default sort order is 'update_time desc'. */
  orderBy?: string;
  /** Required. The name of the question to fetch answers for. */
  parent: string;
  /** Optional. How many answers to fetch per page. The default and maximum `page_size` values are 10. */
  pageSize?: number;
  /** Optional. If specified, the next page of answers is retrieved. */
  pageToken?: string;
}

export const ListLocationsQuestionsAnswersRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/questions/{questionsId}/answers",
  }),
  svc,
) as unknown as Schema.Schema<ListLocationsQuestionsAnswersRequest>;

export type ListLocationsQuestionsAnswersResponse = ListAnswersResponse;
export const ListLocationsQuestionsAnswersResponse = ListAnswersResponse;

export type ListLocationsQuestionsAnswersError = DefaultErrors;

/** Returns the paginated list of answers for a specified question. */
export const listLocationsQuestionsAnswers: API.PaginatedOperationMethod<
  ListLocationsQuestionsAnswersRequest,
  ListLocationsQuestionsAnswersResponse,
  ListLocationsQuestionsAnswersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsQuestionsAnswersRequest,
  output: ListLocationsQuestionsAnswersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
