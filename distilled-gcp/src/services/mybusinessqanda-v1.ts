// ==========================================================================
// My Business Q&A API (mybusinessqanda v1)
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
  name: "mybusinessqanda",
  version: "v1",
  rootUrl: "https://mybusinessqanda.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Author {
  /** The display name of the user */
  displayName?: string;
  /** The profile photo URI of the user. */
  profilePhotoUri?: string;
  /** The type of user the author is. */
  type?: "AUTHOR_TYPE_UNSPECIFIED" | "REGULAR_USER" | "LOCAL_GUIDE" | "MERCHANT" | (string & {});
}

export const Author: Schema.Schema<Author> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  profilePhotoUri: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Author" }) as any as Schema.Schema<Author>;

export interface Answer {
  /** Output only. The unique name for the answer locations/* /questions/* /answers/* */
  name?: string;
  /** Output only. The author of the answer. Will only be set during list operations. */
  author?: Author;
  /** Output only. The number of upvotes for the answer. */
  upvoteCount?: number;
  /** Required. The text of the answer. It should contain at least one non-whitespace character. The maximum length is 4096 characters. */
  text?: string;
  /** Output only. The timestamp for when the answer was written. Only retrieved during ListResponse fetching. */
  createTime?: string;
  /** Output only. The timestamp for when the answer was last modified. */
  updateTime?: string;
}

export const Answer: Schema.Schema<Answer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  author: Schema.optional(Author),
  upvoteCount: Schema.optional(Schema.Number),
  text: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Answer" }) as any as Schema.Schema<Answer>;

export interface Question {
  /** Immutable. The unique name for the question. locations/* /questions/* This field will be ignored if set during question creation. */
  name?: string;
  /** Output only. The author of the question. */
  author?: Author;
  /** Output only. The number of upvotes for the question. */
  upvoteCount?: number;
  /** Required. The text of the question. It should contain at least three words and the total length should be greater than or equal to 10 characters. The maximum length is 4096 characters. */
  text?: string;
  /** Output only. The timestamp for when the question was written. */
  createTime?: string;
  /** Output only. The timestamp for when the question was last modified. */
  updateTime?: string;
  /** Output only. A list of answers to the question, sorted by upvotes. This may not be a complete list of answers depending on the request parameters (answers_per_question) */
  topAnswers?: Array<Answer>;
  /** Output only. The total number of answers posted for this question. */
  totalAnswerCount?: number;
}

export const Question: Schema.Schema<Question> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  author: Schema.optional(Author),
  upvoteCount: Schema.optional(Schema.Number),
  text: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  topAnswers: Schema.optional(Schema.Array(Answer)),
  totalAnswerCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "Question" }) as any as Schema.Schema<Question>;

export interface ListQuestionsResponse {
  /** The requested questions, */
  questions?: Array<Question>;
  /** The total number of questions posted for this location across all pages. */
  totalSize?: number;
  /** If the number of questions exceeds the requested max page size, this field is populated with a token to fetch the next page of questions on a subsequent call. If there are no more questions, this field is not present in the response. */
  nextPageToken?: string;
}

export const ListQuestionsResponse: Schema.Schema<ListQuestionsResponse> = Schema.suspend(() => Schema.Struct({
  questions: Schema.optional(Schema.Array(Question)),
  totalSize: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListQuestionsResponse" }) as any as Schema.Schema<ListQuestionsResponse>;

export interface ListAnswersResponse {
  /** The requested answers. */
  answers?: Array<Answer>;
  /** The total number of answers posted for this question across all pages. */
  totalSize?: number;
  /** If the number of answers exceeds the requested max page size, this field is populated with a token to fetch the next page of answers on a subsequent call. If there are no more answers, this field is not present in the response. */
  nextPageToken?: string;
}

export const ListAnswersResponse: Schema.Schema<ListAnswersResponse> = Schema.suspend(() => Schema.Struct({
  answers: Schema.optional(Schema.Array(Answer)),
  totalSize: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAnswersResponse" }) as any as Schema.Schema<ListAnswersResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface UpsertAnswerRequest {
  /** Required. The new answer. */
  answer?: Answer;
}

export const UpsertAnswerRequest: Schema.Schema<UpsertAnswerRequest> = Schema.suspend(() => Schema.Struct({
  answer: Schema.optional(Answer),
})).annotate({ identifier: "UpsertAnswerRequest" }) as any as Schema.Schema<UpsertAnswerRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns the paginated list of questions and some of its answers for a specified location. This operation is only valid if the specified location is verified. */
export interface ListLocationsQuestionsRequest {
  /** Required. The name of the location to fetch questions for. */
  parent: string;
  /** Optional. How many questions to fetch per page. The default and maximum `page_size` values are 10. */
  pageSize?: number;
  /** Optional. If specified, the next page of questions is retrieved. */
  pageToken?: string;
  /** Optional. How many answers to fetch per question. The default and maximum `answers_per_question` values are 10. */
  answersPerQuestion?: number;
  /** Optional. A filter constraining the questions to return. The only filter currently supported is "ignore_answered=true" */
  filter?: string;
  /** Optional. The order to return the questions. Valid options include 'update_time desc' and 'upvote_count desc', which will return the questions sorted descendingly by the requested field. The default sort order is 'update_time desc'. */
  orderBy?: string;
}

export const ListLocationsQuestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  answersPerQuestion: Schema.optional(Schema.Number).pipe(T.HttpQuery("answersPerQuestion")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/questions" }),
  svc,
) as unknown as Schema.Schema<ListLocationsQuestionsRequest>;

export type ListLocationsQuestionsResponse = ListQuestionsResponse;
export const ListLocationsQuestionsResponse = ListQuestionsResponse;

export type ListLocationsQuestionsError = CommonErrors;

export const listLocationsQuestions = API.makePaginated(() => ({
  input: ListLocationsQuestionsRequest,
  output: ListLocationsQuestionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Adds a question for the specified location. */
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
  T.Http({ method: "POST", path: "v1/locations/{locationsId}/questions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLocationsQuestionsRequest>;

export type CreateLocationsQuestionsResponse = Question;
export const CreateLocationsQuestionsResponse = Question;

export type CreateLocationsQuestionsError = CommonErrors;

export const createLocationsQuestions: API.OperationMethod<CreateLocationsQuestionsRequest, CreateLocationsQuestionsResponse, CreateLocationsQuestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateLocationsQuestionsRequest,
  output: CreateLocationsQuestionsResponse,
  errors: [],
}));

/** Updates a specific question written by the current user. */
export interface PatchLocationsQuestionsRequest {
  /** Immutable. The unique name for the question. locations/* /questions/* This field will be ignored if set during question creation. */
  name: string;
  /** Required. The specific fields to update. Only question text can be updated. */
  updateMask?: string;
  /** Request body */
  body?: Question;
}

export const PatchLocationsQuestionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Question).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/locations/{locationsId}/questions/{questionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchLocationsQuestionsRequest>;

export type PatchLocationsQuestionsResponse = Question;
export const PatchLocationsQuestionsResponse = Question;

export type PatchLocationsQuestionsError = CommonErrors;

export const patchLocationsQuestions: API.OperationMethod<PatchLocationsQuestionsRequest, PatchLocationsQuestionsResponse, PatchLocationsQuestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchLocationsQuestionsRequest,
  output: PatchLocationsQuestionsResponse,
  errors: [],
}));

/** Deletes a specific question written by the current user. */
export interface DeleteLocationsQuestionsRequest {
  /** Required. The name of the question to delete. */
  name: string;
}

export const DeleteLocationsQuestionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/locations/{locationsId}/questions/{questionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsQuestionsRequest>;

export type DeleteLocationsQuestionsResponse = Empty;
export const DeleteLocationsQuestionsResponse = Empty;

export type DeleteLocationsQuestionsError = CommonErrors;

export const deleteLocationsQuestions: API.OperationMethod<DeleteLocationsQuestionsRequest, DeleteLocationsQuestionsResponse, DeleteLocationsQuestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLocationsQuestionsRequest,
  output: DeleteLocationsQuestionsResponse,
  errors: [],
}));

/** Returns the paginated list of answers for a specified question. */
export interface ListLocationsQuestionsAnswersRequest {
  /** Required. The name of the question to fetch answers for. */
  parent: string;
  /** Optional. How many answers to fetch per page. The default and maximum `page_size` values are 10. */
  pageSize?: number;
  /** Optional. If specified, the next page of answers is retrieved. */
  pageToken?: string;
  /** Optional. The order to return the answers. Valid options include 'update_time desc' and 'upvote_count desc', which will return the answers sorted descendingly by the requested field. The default sort order is 'update_time desc'. */
  orderBy?: string;
}

export const ListLocationsQuestionsAnswersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/questions/{questionsId}/answers" }),
  svc,
) as unknown as Schema.Schema<ListLocationsQuestionsAnswersRequest>;

export type ListLocationsQuestionsAnswersResponse = ListAnswersResponse;
export const ListLocationsQuestionsAnswersResponse = ListAnswersResponse;

export type ListLocationsQuestionsAnswersError = CommonErrors;

export const listLocationsQuestionsAnswers = API.makePaginated(() => ({
  input: ListLocationsQuestionsAnswersRequest,
  output: ListLocationsQuestionsAnswersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an answer or updates the existing answer written by the user for the specified question. A user can only create one answer per question. */
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
  T.Http({ method: "POST", path: "v1/locations/{locationsId}/questions/{questionsId}/answers:upsert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpsertLocationsQuestionsAnswersRequest>;

export type UpsertLocationsQuestionsAnswersResponse = Answer;
export const UpsertLocationsQuestionsAnswersResponse = Answer;

export type UpsertLocationsQuestionsAnswersError = CommonErrors;

export const upsertLocationsQuestionsAnswers: API.OperationMethod<UpsertLocationsQuestionsAnswersRequest, UpsertLocationsQuestionsAnswersResponse, UpsertLocationsQuestionsAnswersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpsertLocationsQuestionsAnswersRequest,
  output: UpsertLocationsQuestionsAnswersResponse,
  errors: [],
}));

/** Deletes the answer written by the current user to a question. */
export interface DeleteLocationsQuestionsAnswersRequest {
  /** Required. The name of the question to delete an answer for. */
  name: string;
}

export const DeleteLocationsQuestionsAnswersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/locations/{locationsId}/questions/{questionsId}/answers:delete" }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsQuestionsAnswersRequest>;

export type DeleteLocationsQuestionsAnswersResponse = Empty;
export const DeleteLocationsQuestionsAnswersResponse = Empty;

export type DeleteLocationsQuestionsAnswersError = CommonErrors;

export const deleteLocationsQuestionsAnswers: API.OperationMethod<DeleteLocationsQuestionsAnswersRequest, DeleteLocationsQuestionsAnswersResponse, DeleteLocationsQuestionsAnswersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLocationsQuestionsAnswersRequest,
  output: DeleteLocationsQuestionsAnswersResponse,
  errors: [],
}));

