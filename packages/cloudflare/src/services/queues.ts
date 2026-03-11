/**
 * Cloudflare QUEUES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service queues
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Errors
// =============================================================================

export class InvalidMessageBody extends Schema.TaggedErrorClass<InvalidMessageBody>()(
  "InvalidMessageBody",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidMessageBody, [{ code: 10207 }]);

export class InvalidQueueName extends Schema.TaggedErrorClass<InvalidQueueName>()(
  "InvalidQueueName",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidQueueName, [{ code: 11003 }]);

export class InvalidRequestBody extends Schema.TaggedErrorClass<InvalidRequestBody>()(
  "InvalidRequestBody",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRequestBody, [{ code: 10026 }]);

export class UnrecognizedEventType extends Schema.TaggedErrorClass<UnrecognizedEventType>()(
  "UnrecognizedEventType",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(UnrecognizedEventType, [
  { code: 0, message: { includes: "Unrecognized event types" } },
]);

// =============================================================================
// Consumer
// =============================================================================

export interface GetConsumerRequest {
  queueId: string;
  consumerId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const GetConsumerRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  consumerId: Schema.String.pipe(T.HttpPath("consumerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/queues/{queueId}/consumers/{consumerId}",
  }),
) as unknown as Schema.Schema<GetConsumerRequest>;

export type GetConsumerResponse =
  | {
      consumerId?: string | null;
      createdOn?: string | null;
      queueId?: string | null;
      script?: string | null;
      settings?: {
        batchSize?: number | null;
        maxConcurrency?: number | null;
        maxRetries?: number | null;
        maxWaitTimeMs?: number | null;
        retryDelay?: number | null;
      } | null;
      type?: "worker" | null;
    }
  | {
      consumerId?: string | null;
      createdOn?: string | null;
      queueId?: string | null;
      settings?: {
        batchSize?: number | null;
        maxRetries?: number | null;
        retryDelay?: number | null;
        visibilityTimeoutMs?: number | null;
      } | null;
      type?: "http_pull" | null;
    };

export const GetConsumerResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    consumerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    settings: Schema.optional(
      Schema.Union([
        Schema.Struct({
          batchSize: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxConcurrency: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxRetries: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxWaitTimeMs: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          retryDelay: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            batchSize: "batch_size",
            maxConcurrency: "max_concurrency",
            maxRetries: "max_retries",
            maxWaitTimeMs: "max_wait_time_ms",
            retryDelay: "retry_delay",
          }),
        ),
        Schema.Null,
      ]),
    ),
    type: Schema.optional(
      Schema.Union([Schema.Literal("worker"), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      script: "script",
      settings: "settings",
      type: "type",
    }),
  ),
  Schema.Struct({
    consumerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    settings: Schema.optional(
      Schema.Union([
        Schema.Struct({
          batchSize: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxRetries: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          retryDelay: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          visibilityTimeoutMs: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            batchSize: "batch_size",
            maxRetries: "max_retries",
            retryDelay: "retry_delay",
            visibilityTimeoutMs: "visibility_timeout_ms",
          }),
        ),
        Schema.Null,
      ]),
    ),
    type: Schema.optional(
      Schema.Union([Schema.Literal("http_pull"), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      settings: "settings",
      type: "type",
    }),
  ),
]) as unknown as Schema.Schema<GetConsumerResponse>;

export type GetConsumerError = DefaultErrors | InvalidRequestBody;

export const getConsumer: API.OperationMethod<
  GetConsumerRequest,
  GetConsumerResponse,
  GetConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConsumerRequest,
  output: GetConsumerResponse,
  errors: [InvalidRequestBody],
}));

export interface ListConsumersRequest {
  queueId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const ListConsumersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/queues/{queueId}/consumers",
  }),
) as unknown as Schema.Schema<ListConsumersRequest>;

export type ListConsumersResponse = (
  | {
      consumerId?: string | null;
      createdOn?: string | null;
      queueId?: string | null;
      script?: string | null;
      settings?: {
        batchSize?: number | null;
        maxConcurrency?: number | null;
        maxRetries?: number | null;
        maxWaitTimeMs?: number | null;
        retryDelay?: number | null;
      } | null;
      type?: "worker" | null;
    }
  | {
      consumerId?: string | null;
      createdOn?: string | null;
      queueId?: string | null;
      settings?: {
        batchSize?: number | null;
        maxRetries?: number | null;
        retryDelay?: number | null;
        visibilityTimeoutMs?: number | null;
      } | null;
      type?: "http_pull" | null;
    }
)[];

export const ListConsumersResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Union([
    Schema.Struct({
      consumerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      settings: Schema.optional(
        Schema.Union([
          Schema.Struct({
            batchSize: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            maxConcurrency: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            maxRetries: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            maxWaitTimeMs: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            retryDelay: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              batchSize: "batch_size",
              maxConcurrency: "max_concurrency",
              maxRetries: "max_retries",
              maxWaitTimeMs: "max_wait_time_ms",
              retryDelay: "retry_delay",
            }),
          ),
          Schema.Null,
        ]),
      ),
      type: Schema.optional(
        Schema.Union([Schema.Literal("worker"), Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        consumerId: "consumer_id",
        createdOn: "created_on",
        queueId: "queue_id",
        script: "script",
        settings: "settings",
        type: "type",
      }),
    ),
    Schema.Struct({
      consumerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      settings: Schema.optional(
        Schema.Union([
          Schema.Struct({
            batchSize: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            maxRetries: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            retryDelay: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            visibilityTimeoutMs: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              batchSize: "batch_size",
              maxRetries: "max_retries",
              retryDelay: "retry_delay",
              visibilityTimeoutMs: "visibility_timeout_ms",
            }),
          ),
          Schema.Null,
        ]),
      ),
      type: Schema.optional(
        Schema.Union([Schema.Literal("http_pull"), Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        consumerId: "consumer_id",
        createdOn: "created_on",
        queueId: "queue_id",
        settings: "settings",
        type: "type",
      }),
    ),
  ]),
) as unknown as Schema.Schema<ListConsumersResponse>;

export type ListConsumersError = DefaultErrors | InvalidRequestBody;

export const listConsumers: API.OperationMethod<
  ListConsumersRequest,
  ListConsumersResponse,
  ListConsumersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListConsumersRequest,
  output: ListConsumersResponse,
  errors: [InvalidRequestBody],
}));

export interface CreateConsumerRequest {
  queueId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: */
  deadLetterQueue?: string;
  /** Body param: Name of a Worker */
  scriptName?: string;
  /** Body param: */
  settings?: {
    batchSize?: number;
    maxConcurrency?: number;
    maxRetries?: number;
    maxWaitTimeMs?: number;
    retryDelay?: number;
  };
  /** Body param: */
  type?: "worker";
}

export const CreateConsumerRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  deadLetterQueue: Schema.optional(Schema.String),
  scriptName: Schema.optional(Schema.String),
  settings: Schema.optional(
    Schema.Struct({
      batchSize: Schema.optional(Schema.Number),
      maxConcurrency: Schema.optional(Schema.Number),
      maxRetries: Schema.optional(Schema.Number),
      maxWaitTimeMs: Schema.optional(Schema.Number),
      retryDelay: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        batchSize: "batch_size",
        maxConcurrency: "max_concurrency",
        maxRetries: "max_retries",
        maxWaitTimeMs: "max_wait_time_ms",
        retryDelay: "retry_delay",
      }),
    ),
  ),
  type: Schema.optional(Schema.Literal("worker")),
}).pipe(
  Schema.encodeKeys({
    deadLetterQueue: "dead_letter_queue",
    scriptName: "script_name",
    settings: "settings",
    type: "type",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/queues/{queueId}/consumers",
  }),
) as unknown as Schema.Schema<CreateConsumerRequest>;

export type CreateConsumerResponse =
  | {
      consumerId?: string | null;
      createdOn?: string | null;
      queueId?: string | null;
      script?: string | null;
      settings?: {
        batchSize?: number | null;
        maxConcurrency?: number | null;
        maxRetries?: number | null;
        maxWaitTimeMs?: number | null;
        retryDelay?: number | null;
      } | null;
      type?: "worker" | null;
    }
  | {
      consumerId?: string | null;
      createdOn?: string | null;
      queueId?: string | null;
      settings?: {
        batchSize?: number | null;
        maxRetries?: number | null;
        retryDelay?: number | null;
        visibilityTimeoutMs?: number | null;
      } | null;
      type?: "http_pull" | null;
    };

export const CreateConsumerResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    consumerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    settings: Schema.optional(
      Schema.Union([
        Schema.Struct({
          batchSize: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxConcurrency: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxRetries: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxWaitTimeMs: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          retryDelay: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            batchSize: "batch_size",
            maxConcurrency: "max_concurrency",
            maxRetries: "max_retries",
            maxWaitTimeMs: "max_wait_time_ms",
            retryDelay: "retry_delay",
          }),
        ),
        Schema.Null,
      ]),
    ),
    type: Schema.optional(
      Schema.Union([Schema.Literal("worker"), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      script: "script",
      settings: "settings",
      type: "type",
    }),
  ),
  Schema.Struct({
    consumerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    settings: Schema.optional(
      Schema.Union([
        Schema.Struct({
          batchSize: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxRetries: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          retryDelay: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          visibilityTimeoutMs: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            batchSize: "batch_size",
            maxRetries: "max_retries",
            retryDelay: "retry_delay",
            visibilityTimeoutMs: "visibility_timeout_ms",
          }),
        ),
        Schema.Null,
      ]),
    ),
    type: Schema.optional(
      Schema.Union([Schema.Literal("http_pull"), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      settings: "settings",
      type: "type",
    }),
  ),
]) as unknown as Schema.Schema<CreateConsumerResponse>;

export type CreateConsumerError = DefaultErrors | InvalidRequestBody;

export const createConsumer: API.OperationMethod<
  CreateConsumerRequest,
  CreateConsumerResponse,
  CreateConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConsumerRequest,
  output: CreateConsumerResponse,
  errors: [InvalidRequestBody],
}));

export interface UpdateConsumerRequest {
  queueId: string;
  consumerId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: */
  deadLetterQueue?: string;
  /** Body param: Name of a Worker */
  scriptName?: string;
  /** Body param: */
  settings?: {
    batchSize?: number;
    maxConcurrency?: number;
    maxRetries?: number;
    maxWaitTimeMs?: number;
    retryDelay?: number;
  };
  /** Body param: */
  type?: "worker";
}

export const UpdateConsumerRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  consumerId: Schema.String.pipe(T.HttpPath("consumerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  deadLetterQueue: Schema.optional(Schema.String),
  scriptName: Schema.optional(Schema.String),
  settings: Schema.optional(
    Schema.Struct({
      batchSize: Schema.optional(Schema.Number),
      maxConcurrency: Schema.optional(Schema.Number),
      maxRetries: Schema.optional(Schema.Number),
      maxWaitTimeMs: Schema.optional(Schema.Number),
      retryDelay: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        batchSize: "batch_size",
        maxConcurrency: "max_concurrency",
        maxRetries: "max_retries",
        maxWaitTimeMs: "max_wait_time_ms",
        retryDelay: "retry_delay",
      }),
    ),
  ),
  type: Schema.optional(Schema.Literal("worker")),
}).pipe(
  Schema.encodeKeys({
    deadLetterQueue: "dead_letter_queue",
    scriptName: "script_name",
    settings: "settings",
    type: "type",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/queues/{queueId}/consumers/{consumerId}",
  }),
) as unknown as Schema.Schema<UpdateConsumerRequest>;

export type UpdateConsumerResponse =
  | {
      consumerId?: string | null;
      createdOn?: string | null;
      queueId?: string | null;
      script?: string | null;
      settings?: {
        batchSize?: number | null;
        maxConcurrency?: number | null;
        maxRetries?: number | null;
        maxWaitTimeMs?: number | null;
        retryDelay?: number | null;
      } | null;
      type?: "worker" | null;
    }
  | {
      consumerId?: string | null;
      createdOn?: string | null;
      queueId?: string | null;
      settings?: {
        batchSize?: number | null;
        maxRetries?: number | null;
        retryDelay?: number | null;
        visibilityTimeoutMs?: number | null;
      } | null;
      type?: "http_pull" | null;
    };

export const UpdateConsumerResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    consumerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    settings: Schema.optional(
      Schema.Union([
        Schema.Struct({
          batchSize: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxConcurrency: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxRetries: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxWaitTimeMs: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          retryDelay: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            batchSize: "batch_size",
            maxConcurrency: "max_concurrency",
            maxRetries: "max_retries",
            maxWaitTimeMs: "max_wait_time_ms",
            retryDelay: "retry_delay",
          }),
        ),
        Schema.Null,
      ]),
    ),
    type: Schema.optional(
      Schema.Union([Schema.Literal("worker"), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      script: "script",
      settings: "settings",
      type: "type",
    }),
  ),
  Schema.Struct({
    consumerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    settings: Schema.optional(
      Schema.Union([
        Schema.Struct({
          batchSize: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxRetries: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          retryDelay: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          visibilityTimeoutMs: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            batchSize: "batch_size",
            maxRetries: "max_retries",
            retryDelay: "retry_delay",
            visibilityTimeoutMs: "visibility_timeout_ms",
          }),
        ),
        Schema.Null,
      ]),
    ),
    type: Schema.optional(
      Schema.Union([Schema.Literal("http_pull"), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      settings: "settings",
      type: "type",
    }),
  ),
]) as unknown as Schema.Schema<UpdateConsumerResponse>;

export type UpdateConsumerError = DefaultErrors | InvalidRequestBody;

export const updateConsumer: API.OperationMethod<
  UpdateConsumerRequest,
  UpdateConsumerResponse,
  UpdateConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConsumerRequest,
  output: UpdateConsumerResponse,
  errors: [InvalidRequestBody],
}));

export interface DeleteConsumerRequest {
  queueId: string;
  consumerId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const DeleteConsumerRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  consumerId: Schema.String.pipe(T.HttpPath("consumerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/queues/{queueId}/consumers/{consumerId}",
  }),
) as unknown as Schema.Schema<DeleteConsumerRequest>;

export interface DeleteConsumerResponse {
  errors?: unknown[] | null;
  messages?: string[] | null;
  /** Indicates if the API call was successful or not. */
  success?: true | null;
}

export const DeleteConsumerResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    errors: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    messages: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    success: Schema.optional(Schema.Union([Schema.Literal(true), Schema.Null])),
  },
) as unknown as Schema.Schema<DeleteConsumerResponse>;

export type DeleteConsumerError = DefaultErrors | InvalidRequestBody;

export const deleteConsumer: API.OperationMethod<
  DeleteConsumerRequest,
  DeleteConsumerResponse,
  DeleteConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConsumerRequest,
  output: DeleteConsumerResponse,
  errors: [InvalidRequestBody],
}));

// =============================================================================
// Message
// =============================================================================

export interface BulkPushMessagesRequest {
  queueId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: The number of seconds to wait for attempting to deliver this batch to consumers */
  delaySeconds?: number;
  /** Body param: */
  messages?: (
    | { body?: string; contentType?: "text"; delaySeconds?: number }
    | { body?: unknown; contentType?: "json"; delaySeconds?: number }
  )[];
}

export const BulkPushMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    queueId: Schema.String.pipe(T.HttpPath("queueId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    delaySeconds: Schema.optional(Schema.Number),
    messages: Schema.optional(
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            body: Schema.optional(Schema.String),
            contentType: Schema.optional(Schema.Literal("text")),
            delaySeconds: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              body: "body",
              contentType: "content_type",
              delaySeconds: "delay_seconds",
            }),
          ),
          Schema.Struct({
            body: Schema.optional(Schema.Unknown),
            contentType: Schema.optional(Schema.Literal("json")),
            delaySeconds: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              body: "body",
              contentType: "content_type",
              delaySeconds: "delay_seconds",
            }),
          ),
        ]),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({ delaySeconds: "delay_seconds", messages: "messages" }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/queues/{queueId}/messages/batch",
    }),
  ) as unknown as Schema.Schema<BulkPushMessagesRequest>;

export interface BulkPushMessagesResponse {
  errors?: unknown[] | null;
  messages?: string[] | null;
  /** Indicates if the API call was successful or not. */
  success?: true | null;
}

export const BulkPushMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    messages: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    success: Schema.optional(Schema.Union([Schema.Literal(true), Schema.Null])),
  }) as unknown as Schema.Schema<BulkPushMessagesResponse>;

export type BulkPushMessagesError = DefaultErrors | InvalidMessageBody;

export const bulkPushMessages: API.OperationMethod<
  BulkPushMessagesRequest,
  BulkPushMessagesResponse,
  BulkPushMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPushMessagesRequest,
  output: BulkPushMessagesResponse,
  errors: [InvalidMessageBody],
}));

export interface PullMessageRequest {
  queueId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: The maximum number of messages to include in a batch. */
  batchSize?: number;
  /** Body param: The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt. */
  visibilityTimeoutMs?: number;
}

export const PullMessageRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  batchSize: Schema.optional(Schema.Number),
  visibilityTimeoutMs: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    batchSize: "batch_size",
    visibilityTimeoutMs: "visibility_timeout_ms",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/queues/{queueId}/messages/pull",
  }),
) as unknown as Schema.Schema<PullMessageRequest>;

export interface PullMessageResponse {
  /** The number of unacknowledged messages in the queue */
  messageBacklogCount?: number | null;
  messages?:
    | {
        id?: string | null;
        attempts?: number | null;
        body?: string | null;
        leaseId?: string | null;
        metadata?: unknown | null;
        timestampMs?: number | null;
      }[]
    | null;
}

export const PullMessageResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  messageBacklogCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  messages: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          attempts: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          body: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          leaseId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          metadata: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          timestampMs: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            attempts: "attempts",
            body: "body",
            leaseId: "lease_id",
            metadata: "metadata",
            timestampMs: "timestamp_ms",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    messageBacklogCount: "message_backlog_count",
    messages: "messages",
  }),
) as unknown as Schema.Schema<PullMessageResponse>;

export type PullMessageError = DefaultErrors | InvalidRequestBody;

export const pullMessage: API.OperationMethod<
  PullMessageRequest,
  PullMessageResponse,
  PullMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PullMessageRequest,
  output: PullMessageResponse,
  errors: [InvalidRequestBody],
}));

export interface PushMessageRequest {
  queueId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: */
  body?: string;
  /** Body param: */
  contentType?: "text";
  /** Body param: The number of seconds to wait for attempting to deliver this message to consumers */
  delaySeconds?: number;
}

export const PushMessageRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.optional(Schema.String).pipe(T.HttpBody()),
  contentType: Schema.optional(Schema.Literal("text")),
  delaySeconds: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    contentType: "content_type",
    delaySeconds: "delay_seconds",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/queues/{queueId}/messages",
  }),
) as unknown as Schema.Schema<PushMessageRequest>;

export interface PushMessageResponse {
  errors?: unknown[] | null;
  messages?: string[] | null;
  /** Indicates if the API call was successful or not. */
  success?: true | null;
}

export const PushMessageResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  errors: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  messages: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  success: Schema.optional(Schema.Union([Schema.Literal(true), Schema.Null])),
}) as unknown as Schema.Schema<PushMessageResponse>;

export type PushMessageError = DefaultErrors | InvalidMessageBody;

export const pushMessage: API.OperationMethod<
  PushMessageRequest,
  PushMessageResponse,
  PushMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PushMessageRequest,
  output: PushMessageResponse,
  errors: [InvalidMessageBody],
}));

export interface AckMessageRequest {
  queueId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: */
  acks?: { leaseId?: string }[];
  /** Body param: */
  retries?: { delaySeconds?: number; leaseId?: string }[];
}

export const AckMessageRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  acks: Schema.optional(
    Schema.Array(
      Schema.Struct({
        leaseId: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ leaseId: "lease_id" })),
    ),
  ),
  retries: Schema.optional(
    Schema.Array(
      Schema.Struct({
        delaySeconds: Schema.optional(Schema.Number),
        leaseId: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          delaySeconds: "delay_seconds",
          leaseId: "lease_id",
        }),
      ),
    ),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/queues/{queueId}/messages/ack",
  }),
) as unknown as Schema.Schema<AckMessageRequest>;

export interface AckMessageResponse {
  /** The number of messages that were succesfully acknowledged. */
  ackCount?: number | null;
  /** The number of messages that were succesfully retried. */
  retryCount?: number | null;
  warnings?: string[] | null;
}

export const AckMessageResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ackCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  retryCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  warnings: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
}) as unknown as Schema.Schema<AckMessageResponse>;

export type AckMessageError = DefaultErrors | InvalidRequestBody;

export const ackMessage: API.OperationMethod<
  AckMessageRequest,
  AckMessageResponse,
  AckMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AckMessageRequest,
  output: AckMessageResponse,
  errors: [InvalidRequestBody],
}));

// =============================================================================
// Purge
// =============================================================================

export interface StartPurgeRequest {
  queueId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: Confimation that all messages will be deleted permanently. */
  deleteMessagesPermanently?: boolean;
}

export const StartPurgeRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  deleteMessagesPermanently: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    deleteMessagesPermanently: "delete_messages_permanently",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/queues/{queueId}/purge",
  }),
) as unknown as Schema.Schema<StartPurgeRequest>;

export type StartPurgeResponse = unknown;

export const StartPurgeResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<StartPurgeResponse>;

export type StartPurgeError = DefaultErrors;

export const startPurge: API.OperationMethod<
  StartPurgeRequest,
  StartPurgeResponse,
  StartPurgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartPurgeRequest,
  output: StartPurgeResponse,
  errors: [],
}));

export interface StatusPurgeRequest {
  queueId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const StatusPurgeRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/queues/{queueId}/purge",
  }),
) as unknown as Schema.Schema<StatusPurgeRequest>;

export interface StatusPurgeResponse {
  /** Indicates if the last purge operation completed successfully. */
  completed?: string | null;
  /** Timestamp when the last purge operation started. */
  startedAt?: string | null;
}

export const StatusPurgeResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  completed: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  startedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({ completed: "completed", startedAt: "started_at" }),
) as unknown as Schema.Schema<StatusPurgeResponse>;

export type StatusPurgeError = DefaultErrors;

export const statusPurge: API.OperationMethod<
  StatusPurgeRequest,
  StatusPurgeResponse,
  StatusPurgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StatusPurgeRequest,
  output: StatusPurgeResponse,
  errors: [],
}));

// =============================================================================
// Queue
// =============================================================================

export interface GetQueueRequest {
  queueId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const GetQueueRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues/{queueId}" }),
) as unknown as Schema.Schema<GetQueueRequest>;

export interface GetQueueResponse {
  consumers?: unknown[] | null;
  consumersTotalCount?: number | null;
  createdOn?: string | null;
  modifiedOn?: string | null;
  producers?:
    | (
        | { script?: string | null; type?: "worker" | null }
        | { bucketName?: string | null; type?: "r2_bucket" | null }
      )[]
    | null;
  producersTotalCount?: number | null;
  queueId?: string | null;
  queueName?: string | null;
  settings?: {
    deliveryDelay?: number | null;
    deliveryPaused?: boolean | null;
    messageRetentionPeriod?: number | null;
  } | null;
}

export const GetQueueResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  consumers: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  consumersTotalCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  producers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            type: Schema.optional(
              Schema.Union([Schema.Literal("worker"), Schema.Null]),
            ),
          }),
          Schema.Struct({
            bucketName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            type: Schema.optional(
              Schema.Union([Schema.Literal("r2_bucket"), Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({ bucketName: "bucket_name", type: "type" }),
          ),
        ]),
      ),
      Schema.Null,
    ]),
  ),
  producersTotalCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  queueName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  settings: Schema.optional(
    Schema.Union([
      Schema.Struct({
        deliveryDelay: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        deliveryPaused: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        messageRetentionPeriod: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          deliveryDelay: "delivery_delay",
          deliveryPaused: "delivery_paused",
          messageRetentionPeriod: "message_retention_period",
        }),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    consumers: "consumers",
    consumersTotalCount: "consumers_total_count",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    producers: "producers",
    producersTotalCount: "producers_total_count",
    queueId: "queue_id",
    queueName: "queue_name",
    settings: "settings",
  }),
) as unknown as Schema.Schema<GetQueueResponse>;

export type GetQueueError = DefaultErrors;

export const getQueue: API.OperationMethod<
  GetQueueRequest,
  GetQueueResponse,
  GetQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetQueueRequest,
  output: GetQueueResponse,
  errors: [],
}));

export interface ListQueuesRequest {
  /** A Resource identifier. */
  accountId: string;
}

export const ListQueuesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues" }),
) as unknown as Schema.Schema<ListQueuesRequest>;

export type ListQueuesResponse = {
  consumers?: unknown[] | null;
  consumersTotalCount?: number | null;
  createdOn?: string | null;
  modifiedOn?: string | null;
  producers?:
    | (
        | { script?: string | null; type?: "worker" | null }
        | { bucketName?: string | null; type?: "r2_bucket" | null }
      )[]
    | null;
  producersTotalCount?: number | null;
  queueId?: string | null;
  queueName?: string | null;
  settings?: {
    deliveryDelay?: number | null;
    deliveryPaused?: boolean | null;
    messageRetentionPeriod?: number | null;
  } | null;
}[];

export const ListQueuesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    consumers: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    consumersTotalCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    producers: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              script: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              type: Schema.optional(
                Schema.Union([Schema.Literal("worker"), Schema.Null]),
              ),
            }),
            Schema.Struct({
              bucketName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              type: Schema.optional(
                Schema.Union([Schema.Literal("r2_bucket"), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({ bucketName: "bucket_name", type: "type" }),
            ),
          ]),
        ),
        Schema.Null,
      ]),
    ),
    producersTotalCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    queueName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    settings: Schema.optional(
      Schema.Union([
        Schema.Struct({
          deliveryDelay: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          deliveryPaused: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          messageRetentionPeriod: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            deliveryDelay: "delivery_delay",
            deliveryPaused: "delivery_paused",
            messageRetentionPeriod: "message_retention_period",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      consumers: "consumers",
      consumersTotalCount: "consumers_total_count",
      createdOn: "created_on",
      modifiedOn: "modified_on",
      producers: "producers",
      producersTotalCount: "producers_total_count",
      queueId: "queue_id",
      queueName: "queue_name",
      settings: "settings",
    }),
  ),
) as unknown as Schema.Schema<ListQueuesResponse>;

export type ListQueuesError = DefaultErrors;

export const listQueues: API.OperationMethod<
  ListQueuesRequest,
  ListQueuesResponse,
  ListQueuesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListQueuesRequest,
  output: ListQueuesResponse,
  errors: [],
}));

export interface CreateQueueRequest {
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: */
  queueName: string;
}

export const CreateQueueRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  queueName: Schema.String,
}).pipe(
  Schema.encodeKeys({ queueName: "queue_name" }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues" }),
) as unknown as Schema.Schema<CreateQueueRequest>;

export interface CreateQueueResponse {
  consumers?: unknown[] | null;
  consumersTotalCount?: number | null;
  createdOn?: string | null;
  modifiedOn?: string | null;
  producers?:
    | (
        | { script?: string | null; type?: "worker" | null }
        | { bucketName?: string | null; type?: "r2_bucket" | null }
      )[]
    | null;
  producersTotalCount?: number | null;
  queueId?: string | null;
  queueName?: string | null;
  settings?: {
    deliveryDelay?: number | null;
    deliveryPaused?: boolean | null;
    messageRetentionPeriod?: number | null;
  } | null;
}

export const CreateQueueResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  consumers: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  consumersTotalCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  producers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            type: Schema.optional(
              Schema.Union([Schema.Literal("worker"), Schema.Null]),
            ),
          }),
          Schema.Struct({
            bucketName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            type: Schema.optional(
              Schema.Union([Schema.Literal("r2_bucket"), Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({ bucketName: "bucket_name", type: "type" }),
          ),
        ]),
      ),
      Schema.Null,
    ]),
  ),
  producersTotalCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  queueName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  settings: Schema.optional(
    Schema.Union([
      Schema.Struct({
        deliveryDelay: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        deliveryPaused: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        messageRetentionPeriod: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          deliveryDelay: "delivery_delay",
          deliveryPaused: "delivery_paused",
          messageRetentionPeriod: "message_retention_period",
        }),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    consumers: "consumers",
    consumersTotalCount: "consumers_total_count",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    producers: "producers",
    producersTotalCount: "producers_total_count",
    queueId: "queue_id",
    queueName: "queue_name",
    settings: "settings",
  }),
) as unknown as Schema.Schema<CreateQueueResponse>;

export type CreateQueueError = DefaultErrors;

export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResponse,
  CreateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateQueueRequest,
  output: CreateQueueResponse,
  errors: [],
}));

export interface UpdateQueueRequest {
  queueId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: */
  queueName?: string;
  /** Body param: */
  settings?: {
    deliveryDelay?: number;
    deliveryPaused?: boolean;
    messageRetentionPeriod?: number;
  };
}

export const UpdateQueueRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  queueName: Schema.optional(Schema.String),
  settings: Schema.optional(
    Schema.Struct({
      deliveryDelay: Schema.optional(Schema.Number),
      deliveryPaused: Schema.optional(Schema.Boolean),
      messageRetentionPeriod: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        deliveryDelay: "delivery_delay",
        deliveryPaused: "delivery_paused",
        messageRetentionPeriod: "message_retention_period",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ queueName: "queue_name", settings: "settings" }),
  T.Http({ method: "PUT", path: "/accounts/{account_id}/queues/{queueId}" }),
) as unknown as Schema.Schema<UpdateQueueRequest>;

export interface UpdateQueueResponse {
  consumers?: unknown[] | null;
  consumersTotalCount?: number | null;
  createdOn?: string | null;
  modifiedOn?: string | null;
  producers?:
    | (
        | { script?: string | null; type?: "worker" | null }
        | { bucketName?: string | null; type?: "r2_bucket" | null }
      )[]
    | null;
  producersTotalCount?: number | null;
  queueId?: string | null;
  queueName?: string | null;
  settings?: {
    deliveryDelay?: number | null;
    deliveryPaused?: boolean | null;
    messageRetentionPeriod?: number | null;
  } | null;
}

export const UpdateQueueResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  consumers: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  consumersTotalCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  producers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            type: Schema.optional(
              Schema.Union([Schema.Literal("worker"), Schema.Null]),
            ),
          }),
          Schema.Struct({
            bucketName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            type: Schema.optional(
              Schema.Union([Schema.Literal("r2_bucket"), Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({ bucketName: "bucket_name", type: "type" }),
          ),
        ]),
      ),
      Schema.Null,
    ]),
  ),
  producersTotalCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  queueName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  settings: Schema.optional(
    Schema.Union([
      Schema.Struct({
        deliveryDelay: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        deliveryPaused: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        messageRetentionPeriod: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          deliveryDelay: "delivery_delay",
          deliveryPaused: "delivery_paused",
          messageRetentionPeriod: "message_retention_period",
        }),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    consumers: "consumers",
    consumersTotalCount: "consumers_total_count",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    producers: "producers",
    producersTotalCount: "producers_total_count",
    queueId: "queue_id",
    queueName: "queue_name",
    settings: "settings",
  }),
) as unknown as Schema.Schema<UpdateQueueResponse>;

export type UpdateQueueError = DefaultErrors | InvalidQueueName;

export const updateQueue: API.OperationMethod<
  UpdateQueueRequest,
  UpdateQueueResponse,
  UpdateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateQueueRequest,
  output: UpdateQueueResponse,
  errors: [InvalidQueueName],
}));

export interface PatchQueueRequest {
  queueId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: */
  queueName?: string;
  /** Body param: */
  settings?: {
    deliveryDelay?: number;
    deliveryPaused?: boolean;
    messageRetentionPeriod?: number;
  };
}

export const PatchQueueRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  queueName: Schema.optional(Schema.String),
  settings: Schema.optional(
    Schema.Struct({
      deliveryDelay: Schema.optional(Schema.Number),
      deliveryPaused: Schema.optional(Schema.Boolean),
      messageRetentionPeriod: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        deliveryDelay: "delivery_delay",
        deliveryPaused: "delivery_paused",
        messageRetentionPeriod: "message_retention_period",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ queueName: "queue_name", settings: "settings" }),
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/queues/{queueId}" }),
) as unknown as Schema.Schema<PatchQueueRequest>;

export interface PatchQueueResponse {
  consumers?: unknown[] | null;
  consumersTotalCount?: number | null;
  createdOn?: string | null;
  modifiedOn?: string | null;
  producers?:
    | (
        | { script?: string | null; type?: "worker" | null }
        | { bucketName?: string | null; type?: "r2_bucket" | null }
      )[]
    | null;
  producersTotalCount?: number | null;
  queueId?: string | null;
  queueName?: string | null;
  settings?: {
    deliveryDelay?: number | null;
    deliveryPaused?: boolean | null;
    messageRetentionPeriod?: number | null;
  } | null;
}

export const PatchQueueResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  consumers: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  consumersTotalCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  producers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            type: Schema.optional(
              Schema.Union([Schema.Literal("worker"), Schema.Null]),
            ),
          }),
          Schema.Struct({
            bucketName: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            type: Schema.optional(
              Schema.Union([Schema.Literal("r2_bucket"), Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({ bucketName: "bucket_name", type: "type" }),
          ),
        ]),
      ),
      Schema.Null,
    ]),
  ),
  producersTotalCount: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  queueId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  queueName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  settings: Schema.optional(
    Schema.Union([
      Schema.Struct({
        deliveryDelay: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        deliveryPaused: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        messageRetentionPeriod: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          deliveryDelay: "delivery_delay",
          deliveryPaused: "delivery_paused",
          messageRetentionPeriod: "message_retention_period",
        }),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    consumers: "consumers",
    consumersTotalCount: "consumers_total_count",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    producers: "producers",
    producersTotalCount: "producers_total_count",
    queueId: "queue_id",
    queueName: "queue_name",
    settings: "settings",
  }),
) as unknown as Schema.Schema<PatchQueueResponse>;

export type PatchQueueError = DefaultErrors;

export const patchQueue: API.OperationMethod<
  PatchQueueRequest,
  PatchQueueResponse,
  PatchQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchQueueRequest,
  output: PatchQueueResponse,
  errors: [],
}));

export interface DeleteQueueRequest {
  queueId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const DeleteQueueRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/queues/{queueId}" }),
) as unknown as Schema.Schema<DeleteQueueRequest>;

export interface DeleteQueueResponse {
  errors?: unknown[] | null;
  messages?: string[] | null;
  /** Indicates if the API call was successful or not. */
  success?: true | null;
}

export const DeleteQueueResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  errors: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  messages: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  success: Schema.optional(Schema.Union([Schema.Literal(true), Schema.Null])),
}) as unknown as Schema.Schema<DeleteQueueResponse>;

export type DeleteQueueError = DefaultErrors;

export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  DeleteQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteQueueRequest,
  output: DeleteQueueResponse,
  errors: [],
}));

// =============================================================================
// Subscription
// =============================================================================

export interface GetSubscriptionRequest {
  subscriptionId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const GetSubscriptionRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/event_subscriptions/subscriptions/{subscriptionId}",
  }),
) as unknown as Schema.Schema<GetSubscriptionRequest>;

export interface GetSubscriptionResponse {
  /** Unique identifier for the subscription */
  id: string;
  /** When the subscription was created */
  createdAt: string;
  /** Destination configuration for the subscription */
  destination: { queueId: string; type: "queues.queue" };
  /** Whether the subscription is active */
  enabled: boolean;
  /** List of event types this subscription handles */
  events: string[];
  /** When the subscription was last modified */
  modifiedAt: string;
  /** Name of the subscription */
  name: string;
  /** Source configuration for the subscription */
  source:
    | { type?: "images" | null }
    | { type?: "kv" | null }
    | { type?: "r2" | null }
    | { type?: "superSlurper" | null }
    | { type?: "vectorize" | null }
    | { modelName?: string | null; type?: "workersAi.model" | null }
    | { type?: "workersBuilds.worker" | null; workerName?: string | null }
    | { type?: "workflows.workflow" | null; workflowName?: string | null };
}

export const GetSubscriptionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    destination: Schema.Struct({
      queueId: Schema.String,
      type: Schema.Literal("queues.queue"),
    }).pipe(Schema.encodeKeys({ queueId: "queue_id", type: "type" })),
    enabled: Schema.Boolean,
    events: Schema.Array(Schema.String),
    modifiedAt: Schema.String,
    name: Schema.String,
    source: Schema.Union([
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("images"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("kv"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("r2"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("superSlurper"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("vectorize"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        modelName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.optional(
          Schema.Union([Schema.Literal("workersAi.model"), Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ modelName: "model_name", type: "type" })),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("workersBuilds.worker"), Schema.Null]),
        ),
        workerName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(Schema.encodeKeys({ type: "type", workerName: "worker_name" })),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("workflows.workflow"), Schema.Null]),
        ),
        workflowName: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({ type: "type", workflowName: "workflow_name" }),
      ),
    ]),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      destination: "destination",
      enabled: "enabled",
      events: "events",
      modifiedAt: "modified_at",
      name: "name",
      source: "source",
    }),
  ) as unknown as Schema.Schema<GetSubscriptionResponse>;

export type GetSubscriptionError = DefaultErrors | UnrecognizedEventType;

export const getSubscription: API.OperationMethod<
  GetSubscriptionRequest,
  GetSubscriptionResponse,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSubscriptionRequest,
  output: GetSubscriptionResponse,
  errors: [UnrecognizedEventType],
}));

export interface ListSubscriptionsRequest {
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Query param: Sort direction */
  direction?: "asc" | "desc";
  /** Query param: Field to sort by */
  order?: "created_at" | "name" | "enabled" | "source";
}

export const ListSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
      T.HttpQuery("direction"),
    ),
    order: Schema.optional(
      Schema.Literals(["created_at", "name", "enabled", "source"]),
    ).pipe(T.HttpQuery("order")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/event_subscriptions/subscriptions",
    }),
  ) as unknown as Schema.Schema<ListSubscriptionsRequest>;

export type ListSubscriptionsResponse = {
  id: string;
  createdAt: string;
  destination: { queueId: string; type: "queues.queue" };
  enabled: boolean;
  events: string[];
  modifiedAt: string;
  name: string;
  source:
    | { type?: "images" | null }
    | { type?: "kv" | null }
    | { type?: "r2" | null }
    | { type?: "superSlurper" | null }
    | { type?: "vectorize" | null }
    | { modelName?: string | null; type?: "workersAi.model" | null }
    | { type?: "workersBuilds.worker" | null; workerName?: string | null }
    | { type?: "workflows.workflow" | null; workflowName?: string | null };
}[];

export const ListSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String,
      destination: Schema.Struct({
        queueId: Schema.String,
        type: Schema.Literal("queues.queue"),
      }).pipe(Schema.encodeKeys({ queueId: "queue_id", type: "type" })),
      enabled: Schema.Boolean,
      events: Schema.Array(Schema.String),
      modifiedAt: Schema.String,
      name: Schema.String,
      source: Schema.Union([
        Schema.Struct({
          type: Schema.optional(
            Schema.Union([Schema.Literal("images"), Schema.Null]),
          ),
        }),
        Schema.Struct({
          type: Schema.optional(
            Schema.Union([Schema.Literal("kv"), Schema.Null]),
          ),
        }),
        Schema.Struct({
          type: Schema.optional(
            Schema.Union([Schema.Literal("r2"), Schema.Null]),
          ),
        }),
        Schema.Struct({
          type: Schema.optional(
            Schema.Union([Schema.Literal("superSlurper"), Schema.Null]),
          ),
        }),
        Schema.Struct({
          type: Schema.optional(
            Schema.Union([Schema.Literal("vectorize"), Schema.Null]),
          ),
        }),
        Schema.Struct({
          modelName: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          type: Schema.optional(
            Schema.Union([Schema.Literal("workersAi.model"), Schema.Null]),
          ),
        }).pipe(Schema.encodeKeys({ modelName: "model_name", type: "type" })),
        Schema.Struct({
          type: Schema.optional(
            Schema.Union([Schema.Literal("workersBuilds.worker"), Schema.Null]),
          ),
          workerName: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(Schema.encodeKeys({ type: "type", workerName: "worker_name" })),
        Schema.Struct({
          type: Schema.optional(
            Schema.Union([Schema.Literal("workflows.workflow"), Schema.Null]),
          ),
          workflowName: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({ type: "type", workflowName: "workflow_name" }),
        ),
      ]),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        destination: "destination",
        enabled: "enabled",
        events: "events",
        modifiedAt: "modified_at",
        name: "name",
        source: "source",
      }),
    ),
  ) as unknown as Schema.Schema<ListSubscriptionsResponse>;

export type ListSubscriptionsError = DefaultErrors;

export const listSubscriptions: API.OperationMethod<
  ListSubscriptionsRequest,
  ListSubscriptionsResponse,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListSubscriptionsRequest,
  output: ListSubscriptionsResponse,
  errors: [],
}));

export interface CreateSubscriptionRequest {
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: Destination configuration for the subscription */
  destination?: { queueId: string; type: "queues.queue" };
  /** Body param: Whether the subscription is active */
  enabled?: boolean;
  /** Body param: List of event types this subscription handles */
  events?: string[];
  /** Body param: Name of the subscription */
  name?: string;
  /** Body param: Source configuration for the subscription */
  source?:
    | { type?: "images" }
    | { type?: "kv" }
    | { type?: "r2" }
    | { type?: "superSlurper" }
    | { type?: "vectorize" }
    | { modelName?: string; type?: "workersAi.model" }
    | { type?: "workersBuilds.worker"; workerName?: string }
    | { type?: "workflows.workflow"; workflowName?: string };
}

export const CreateSubscriptionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    destination: Schema.optional(
      Schema.Struct({
        queueId: Schema.String,
        type: Schema.Literal("queues.queue"),
      }).pipe(Schema.encodeKeys({ queueId: "queue_id", type: "type" })),
    ),
    enabled: Schema.optional(Schema.Boolean),
    events: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
    source: Schema.optional(
      Schema.Union([
        Schema.Struct({
          type: Schema.optional(Schema.Literal("images")),
        }),
        Schema.Struct({
          type: Schema.optional(Schema.Literal("kv")),
        }),
        Schema.Struct({
          type: Schema.optional(Schema.Literal("r2")),
        }),
        Schema.Struct({
          type: Schema.optional(Schema.Literal("superSlurper")),
        }),
        Schema.Struct({
          type: Schema.optional(Schema.Literal("vectorize")),
        }),
        Schema.Struct({
          modelName: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("workersAi.model")),
        }).pipe(Schema.encodeKeys({ modelName: "model_name", type: "type" })),
        Schema.Struct({
          type: Schema.optional(Schema.Literal("workersBuilds.worker")),
          workerName: Schema.optional(Schema.String),
        }).pipe(Schema.encodeKeys({ type: "type", workerName: "worker_name" })),
        Schema.Struct({
          type: Schema.optional(Schema.Literal("workflows.workflow")),
          workflowName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({ type: "type", workflowName: "workflow_name" }),
        ),
      ]),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/event_subscriptions/subscriptions",
    }),
  ) as unknown as Schema.Schema<CreateSubscriptionRequest>;

export interface CreateSubscriptionResponse {
  /** Unique identifier for the subscription */
  id: string;
  /** When the subscription was created */
  createdAt: string;
  /** Destination configuration for the subscription */
  destination: { queueId: string; type: "queues.queue" };
  /** Whether the subscription is active */
  enabled: boolean;
  /** List of event types this subscription handles */
  events: string[];
  /** When the subscription was last modified */
  modifiedAt: string;
  /** Name of the subscription */
  name: string;
  /** Source configuration for the subscription */
  source:
    | { type?: "images" | null }
    | { type?: "kv" | null }
    | { type?: "r2" | null }
    | { type?: "superSlurper" | null }
    | { type?: "vectorize" | null }
    | { modelName?: string | null; type?: "workersAi.model" | null }
    | { type?: "workersBuilds.worker" | null; workerName?: string | null }
    | { type?: "workflows.workflow" | null; workflowName?: string | null };
}

export const CreateSubscriptionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    destination: Schema.Struct({
      queueId: Schema.String,
      type: Schema.Literal("queues.queue"),
    }).pipe(Schema.encodeKeys({ queueId: "queue_id", type: "type" })),
    enabled: Schema.Boolean,
    events: Schema.Array(Schema.String),
    modifiedAt: Schema.String,
    name: Schema.String,
    source: Schema.Union([
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("images"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("kv"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("r2"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("superSlurper"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("vectorize"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        modelName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.optional(
          Schema.Union([Schema.Literal("workersAi.model"), Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ modelName: "model_name", type: "type" })),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("workersBuilds.worker"), Schema.Null]),
        ),
        workerName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(Schema.encodeKeys({ type: "type", workerName: "worker_name" })),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("workflows.workflow"), Schema.Null]),
        ),
        workflowName: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({ type: "type", workflowName: "workflow_name" }),
      ),
    ]),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      destination: "destination",
      enabled: "enabled",
      events: "events",
      modifiedAt: "modified_at",
      name: "name",
      source: "source",
    }),
  ) as unknown as Schema.Schema<CreateSubscriptionResponse>;

export type CreateSubscriptionError = DefaultErrors | UnrecognizedEventType;

export const createSubscription: API.OperationMethod<
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  CreateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSubscriptionRequest,
  output: CreateSubscriptionResponse,
  errors: [UnrecognizedEventType],
}));

export interface PatchSubscriptionRequest {
  subscriptionId: string;
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Body param: Destination configuration for the subscription */
  destination?: { queueId: string; type: "queues.queue" };
  /** Body param: Whether the subscription is active */
  enabled?: boolean;
  /** Body param: List of event types this subscription handles */
  events?: string[];
  /** Body param: Name of the subscription */
  name?: string;
}

export const PatchSubscriptionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    destination: Schema.optional(
      Schema.Struct({
        queueId: Schema.String,
        type: Schema.Literal("queues.queue"),
      }).pipe(Schema.encodeKeys({ queueId: "queue_id", type: "type" })),
    ),
    enabled: Schema.optional(Schema.Boolean),
    events: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/event_subscriptions/subscriptions/{subscriptionId}",
    }),
  ) as unknown as Schema.Schema<PatchSubscriptionRequest>;

export interface PatchSubscriptionResponse {
  /** Unique identifier for the subscription */
  id: string;
  /** When the subscription was created */
  createdAt: string;
  /** Destination configuration for the subscription */
  destination: { queueId: string; type: "queues.queue" };
  /** Whether the subscription is active */
  enabled: boolean;
  /** List of event types this subscription handles */
  events: string[];
  /** When the subscription was last modified */
  modifiedAt: string;
  /** Name of the subscription */
  name: string;
  /** Source configuration for the subscription */
  source:
    | { type?: "images" | null }
    | { type?: "kv" | null }
    | { type?: "r2" | null }
    | { type?: "superSlurper" | null }
    | { type?: "vectorize" | null }
    | { modelName?: string | null; type?: "workersAi.model" | null }
    | { type?: "workersBuilds.worker" | null; workerName?: string | null }
    | { type?: "workflows.workflow" | null; workflowName?: string | null };
}

export const PatchSubscriptionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    destination: Schema.Struct({
      queueId: Schema.String,
      type: Schema.Literal("queues.queue"),
    }).pipe(Schema.encodeKeys({ queueId: "queue_id", type: "type" })),
    enabled: Schema.Boolean,
    events: Schema.Array(Schema.String),
    modifiedAt: Schema.String,
    name: Schema.String,
    source: Schema.Union([
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("images"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("kv"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("r2"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("superSlurper"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("vectorize"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        modelName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.optional(
          Schema.Union([Schema.Literal("workersAi.model"), Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ modelName: "model_name", type: "type" })),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("workersBuilds.worker"), Schema.Null]),
        ),
        workerName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(Schema.encodeKeys({ type: "type", workerName: "worker_name" })),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("workflows.workflow"), Schema.Null]),
        ),
        workflowName: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({ type: "type", workflowName: "workflow_name" }),
      ),
    ]),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      destination: "destination",
      enabled: "enabled",
      events: "events",
      modifiedAt: "modified_at",
      name: "name",
      source: "source",
    }),
  ) as unknown as Schema.Schema<PatchSubscriptionResponse>;

export type PatchSubscriptionError = DefaultErrors | UnrecognizedEventType;

export const patchSubscription: API.OperationMethod<
  PatchSubscriptionRequest,
  PatchSubscriptionResponse,
  PatchSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSubscriptionRequest,
  output: PatchSubscriptionResponse,
  errors: [UnrecognizedEventType],
}));

export interface DeleteSubscriptionRequest {
  subscriptionId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const DeleteSubscriptionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/event_subscriptions/subscriptions/{subscriptionId}",
    }),
  ) as unknown as Schema.Schema<DeleteSubscriptionRequest>;

export interface DeleteSubscriptionResponse {
  /** Unique identifier for the subscription */
  id: string;
  /** When the subscription was created */
  createdAt: string;
  /** Destination configuration for the subscription */
  destination: { queueId: string; type: "queues.queue" };
  /** Whether the subscription is active */
  enabled: boolean;
  /** List of event types this subscription handles */
  events: string[];
  /** When the subscription was last modified */
  modifiedAt: string;
  /** Name of the subscription */
  name: string;
  /** Source configuration for the subscription */
  source:
    | { type?: "images" | null }
    | { type?: "kv" | null }
    | { type?: "r2" | null }
    | { type?: "superSlurper" | null }
    | { type?: "vectorize" | null }
    | { modelName?: string | null; type?: "workersAi.model" | null }
    | { type?: "workersBuilds.worker" | null; workerName?: string | null }
    | { type?: "workflows.workflow" | null; workflowName?: string | null };
}

export const DeleteSubscriptionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    destination: Schema.Struct({
      queueId: Schema.String,
      type: Schema.Literal("queues.queue"),
    }).pipe(Schema.encodeKeys({ queueId: "queue_id", type: "type" })),
    enabled: Schema.Boolean,
    events: Schema.Array(Schema.String),
    modifiedAt: Schema.String,
    name: Schema.String,
    source: Schema.Union([
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("images"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("kv"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("r2"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("superSlurper"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("vectorize"), Schema.Null]),
        ),
      }),
      Schema.Struct({
        modelName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.optional(
          Schema.Union([Schema.Literal("workersAi.model"), Schema.Null]),
        ),
      }).pipe(Schema.encodeKeys({ modelName: "model_name", type: "type" })),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("workersBuilds.worker"), Schema.Null]),
        ),
        workerName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(Schema.encodeKeys({ type: "type", workerName: "worker_name" })),
      Schema.Struct({
        type: Schema.optional(
          Schema.Union([Schema.Literal("workflows.workflow"), Schema.Null]),
        ),
        workflowName: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({ type: "type", workflowName: "workflow_name" }),
      ),
    ]),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      destination: "destination",
      enabled: "enabled",
      events: "events",
      modifiedAt: "modified_at",
      name: "name",
      source: "source",
    }),
  ) as unknown as Schema.Schema<DeleteSubscriptionResponse>;

export type DeleteSubscriptionError = DefaultErrors | UnrecognizedEventType;

export const deleteSubscription: API.OperationMethod<
  DeleteSubscriptionRequest,
  DeleteSubscriptionResponse,
  DeleteSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSubscriptionRequest,
  output: DeleteSubscriptionResponse,
  errors: [UnrecognizedEventType],
}));
