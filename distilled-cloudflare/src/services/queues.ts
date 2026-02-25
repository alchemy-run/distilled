/**
 * Cloudflare QUEUES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service queues
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// Consumer
// =============================================================================

export interface GetConsumerRequest {
  queueId: string;
  consumerId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const GetConsumerRequest = Schema.Struct({
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
      consumerId?: string;
      createdOn?: string;
      queueId?: string;
      script?: string;
      settings?: {
        batchSize?: number;
        maxConcurrency?: number;
        maxRetries?: number;
        maxWaitTimeMs?: number;
        retryDelay?: number;
      };
      type?: "worker";
    }
  | {
      consumerId?: string;
      createdOn?: string;
      queueId?: string;
      settings?: {
        batchSize?: number;
        maxRetries?: number;
        retryDelay?: number;
        visibilityTimeoutMs?: number;
      };
      type?: "http_pull";
    };

export const GetConsumerResponse = Schema.Union([
  Schema.Struct({
    consumerId: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    queueId: Schema.optional(Schema.String),
    script: Schema.optional(Schema.String),
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
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      script: "script",
      settings: "settings",
      type: "type",
    }),
  ),
  Schema.Struct({
    consumerId: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    queueId: Schema.optional(Schema.String),
    settings: Schema.optional(
      Schema.Struct({
        batchSize: Schema.optional(Schema.Number),
        maxRetries: Schema.optional(Schema.Number),
        retryDelay: Schema.optional(Schema.Number),
        visibilityTimeoutMs: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          batchSize: "batch_size",
          maxRetries: "max_retries",
          retryDelay: "retry_delay",
          visibilityTimeoutMs: "visibility_timeout_ms",
        }),
      ),
    ),
    type: Schema.optional(Schema.Literal("http_pull")),
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

export const getConsumer: API.OperationMethod<
  GetConsumerRequest,
  GetConsumerResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConsumerRequest,
  output: GetConsumerResponse,
  errors: [],
}));

export interface ListConsumersRequest {
  queueId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const ListConsumersRequest = Schema.Struct({
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
      consumerId?: string;
      createdOn?: string;
      queueId?: string;
      script?: string;
      settings?: {
        batchSize?: number;
        maxConcurrency?: number;
        maxRetries?: number;
        maxWaitTimeMs?: number;
        retryDelay?: number;
      };
      type?: "worker";
    }
  | {
      consumerId?: string;
      createdOn?: string;
      queueId?: string;
      settings?: {
        batchSize?: number;
        maxRetries?: number;
        retryDelay?: number;
        visibilityTimeoutMs?: number;
      };
      type?: "http_pull";
    }
)[];

export const ListConsumersResponse = Schema.Array(
  Schema.Union([
    Schema.Struct({
      consumerId: Schema.optional(Schema.String),
      createdOn: Schema.optional(Schema.String),
      queueId: Schema.optional(Schema.String),
      script: Schema.optional(Schema.String),
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
        consumerId: "consumer_id",
        createdOn: "created_on",
        queueId: "queue_id",
        script: "script",
        settings: "settings",
        type: "type",
      }),
    ),
    Schema.Struct({
      consumerId: Schema.optional(Schema.String),
      createdOn: Schema.optional(Schema.String),
      queueId: Schema.optional(Schema.String),
      settings: Schema.optional(
        Schema.Struct({
          batchSize: Schema.optional(Schema.Number),
          maxRetries: Schema.optional(Schema.Number),
          retryDelay: Schema.optional(Schema.Number),
          visibilityTimeoutMs: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            batchSize: "batch_size",
            maxRetries: "max_retries",
            retryDelay: "retry_delay",
            visibilityTimeoutMs: "visibility_timeout_ms",
          }),
        ),
      ),
      type: Schema.optional(Schema.Literal("http_pull")),
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

export const listConsumers: API.OperationMethod<
  ListConsumersRequest,
  ListConsumersResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListConsumersRequest,
  output: ListConsumersResponse,
  errors: [],
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

export const CreateConsumerRequest = Schema.Struct({
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
      consumerId?: string;
      createdOn?: string;
      queueId?: string;
      script?: string;
      settings?: {
        batchSize?: number;
        maxConcurrency?: number;
        maxRetries?: number;
        maxWaitTimeMs?: number;
        retryDelay?: number;
      };
      type?: "worker";
    }
  | {
      consumerId?: string;
      createdOn?: string;
      queueId?: string;
      settings?: {
        batchSize?: number;
        maxRetries?: number;
        retryDelay?: number;
        visibilityTimeoutMs?: number;
      };
      type?: "http_pull";
    };

export const CreateConsumerResponse = Schema.Union([
  Schema.Struct({
    consumerId: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    queueId: Schema.optional(Schema.String),
    script: Schema.optional(Schema.String),
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
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      script: "script",
      settings: "settings",
      type: "type",
    }),
  ),
  Schema.Struct({
    consumerId: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    queueId: Schema.optional(Schema.String),
    settings: Schema.optional(
      Schema.Struct({
        batchSize: Schema.optional(Schema.Number),
        maxRetries: Schema.optional(Schema.Number),
        retryDelay: Schema.optional(Schema.Number),
        visibilityTimeoutMs: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          batchSize: "batch_size",
          maxRetries: "max_retries",
          retryDelay: "retry_delay",
          visibilityTimeoutMs: "visibility_timeout_ms",
        }),
      ),
    ),
    type: Schema.optional(Schema.Literal("http_pull")),
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

export const createConsumer: API.OperationMethod<
  CreateConsumerRequest,
  CreateConsumerResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateConsumerRequest,
  output: CreateConsumerResponse,
  errors: [],
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

export const UpdateConsumerRequest = Schema.Struct({
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
      consumerId?: string;
      createdOn?: string;
      queueId?: string;
      script?: string;
      settings?: {
        batchSize?: number;
        maxConcurrency?: number;
        maxRetries?: number;
        maxWaitTimeMs?: number;
        retryDelay?: number;
      };
      type?: "worker";
    }
  | {
      consumerId?: string;
      createdOn?: string;
      queueId?: string;
      settings?: {
        batchSize?: number;
        maxRetries?: number;
        retryDelay?: number;
        visibilityTimeoutMs?: number;
      };
      type?: "http_pull";
    };

export const UpdateConsumerResponse = Schema.Union([
  Schema.Struct({
    consumerId: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    queueId: Schema.optional(Schema.String),
    script: Schema.optional(Schema.String),
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
      consumerId: "consumer_id",
      createdOn: "created_on",
      queueId: "queue_id",
      script: "script",
      settings: "settings",
      type: "type",
    }),
  ),
  Schema.Struct({
    consumerId: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    queueId: Schema.optional(Schema.String),
    settings: Schema.optional(
      Schema.Struct({
        batchSize: Schema.optional(Schema.Number),
        maxRetries: Schema.optional(Schema.Number),
        retryDelay: Schema.optional(Schema.Number),
        visibilityTimeoutMs: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          batchSize: "batch_size",
          maxRetries: "max_retries",
          retryDelay: "retry_delay",
          visibilityTimeoutMs: "visibility_timeout_ms",
        }),
      ),
    ),
    type: Schema.optional(Schema.Literal("http_pull")),
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

export const updateConsumer: API.OperationMethod<
  UpdateConsumerRequest,
  UpdateConsumerResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateConsumerRequest,
  output: UpdateConsumerResponse,
  errors: [],
}));

export interface DeleteConsumerRequest {
  queueId: string;
  consumerId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const DeleteConsumerRequest = Schema.Struct({
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
  errors?: unknown[];
  messages?: string[];
  /** Indicates if the API call was successful or not. */
  success?: true;
}

export const DeleteConsumerResponse = Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.Unknown)),
  messages: Schema.optional(Schema.Array(Schema.String)),
  success: Schema.optional(Schema.Literal(true)),
}) as unknown as Schema.Schema<DeleteConsumerResponse>;

export const deleteConsumer: API.OperationMethod<
  DeleteConsumerRequest,
  DeleteConsumerResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteConsumerRequest,
  output: DeleteConsumerResponse,
  errors: [],
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

export const BulkPushMessagesRequest = Schema.Struct({
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
  errors?: unknown[];
  messages?: string[];
  /** Indicates if the API call was successful or not. */
  success?: true;
}

export const BulkPushMessagesResponse = Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.Unknown)),
  messages: Schema.optional(Schema.Array(Schema.String)),
  success: Schema.optional(Schema.Literal(true)),
}) as unknown as Schema.Schema<BulkPushMessagesResponse>;

export const bulkPushMessages: API.OperationMethod<
  BulkPushMessagesRequest,
  BulkPushMessagesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkPushMessagesRequest,
  output: BulkPushMessagesResponse,
  errors: [],
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

export const PullMessageRequest = Schema.Struct({
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
  messageBacklogCount?: number;
  messages?: {
    id?: string;
    attempts?: number;
    body?: string;
    leaseId?: string;
    metadata?: unknown;
    timestampMs?: number;
  }[];
}

export const PullMessageResponse = Schema.Struct({
  messageBacklogCount: Schema.optional(Schema.Number),
  messages: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        attempts: Schema.optional(Schema.Number),
        body: Schema.optional(Schema.String),
        leaseId: Schema.optional(Schema.String),
        metadata: Schema.optional(Schema.Unknown),
        timestampMs: Schema.optional(Schema.Number),
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
  ),
}).pipe(
  Schema.encodeKeys({
    messageBacklogCount: "message_backlog_count",
    messages: "messages",
  }),
) as unknown as Schema.Schema<PullMessageResponse>;

export const pullMessage: API.OperationMethod<
  PullMessageRequest,
  PullMessageResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PullMessageRequest,
  output: PullMessageResponse,
  errors: [],
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

export const PushMessageRequest = Schema.Struct({
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
  errors?: unknown[];
  messages?: string[];
  /** Indicates if the API call was successful or not. */
  success?: true;
}

export const PushMessageResponse = Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.Unknown)),
  messages: Schema.optional(Schema.Array(Schema.String)),
  success: Schema.optional(Schema.Literal(true)),
}) as unknown as Schema.Schema<PushMessageResponse>;

export const pushMessage: API.OperationMethod<
  PushMessageRequest,
  PushMessageResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PushMessageRequest,
  output: PushMessageResponse,
  errors: [],
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

export const AckMessageRequest = Schema.Struct({
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
  ackCount?: number;
  /** The number of messages that were succesfully retried. */
  retryCount?: number;
  warnings?: string[];
}

export const AckMessageResponse = Schema.Struct({
  ackCount: Schema.optional(Schema.Number),
  retryCount: Schema.optional(Schema.Number),
  warnings: Schema.optional(Schema.Array(Schema.String)),
}) as unknown as Schema.Schema<AckMessageResponse>;

export const ackMessage: API.OperationMethod<
  AckMessageRequest,
  AckMessageResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: AckMessageRequest,
  output: AckMessageResponse,
  errors: [],
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

export const StartPurgeRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<StartPurgeResponse>;

export const startPurge: API.OperationMethod<
  StartPurgeRequest,
  StartPurgeResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StartPurgeRequest,
  output: StartPurgeResponse,
  errors: [],
}));

export interface StatusPurgeRequest {
  queueId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const StatusPurgeRequest = Schema.Struct({
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
  completed?: string;
  /** Timestamp when the last purge operation started. */
  startedAt?: string;
}

export const StatusPurgeResponse = Schema.Struct({
  completed: Schema.optional(Schema.String),
  startedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ completed: "completed", startedAt: "started_at" }),
) as unknown as Schema.Schema<StatusPurgeResponse>;

export const statusPurge: API.OperationMethod<
  StatusPurgeRequest,
  StatusPurgeResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetQueueRequest = Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues/{queueId}" }),
) as unknown as Schema.Schema<GetQueueRequest>;

export interface GetQueueResponse {
  consumers?: unknown[];
  consumersTotalCount?: number;
  createdOn?: string;
  modifiedOn?: string;
  producers?: (
    | { script?: string; type?: "worker" }
    | { bucketName?: string; type?: "r2_bucket" }
  )[];
  producersTotalCount?: number;
  queueId?: string;
  queueName?: string;
  settings?: {
    deliveryDelay?: number;
    deliveryPaused?: boolean;
    messageRetentionPeriod?: number;
  };
}

export const GetQueueResponse = Schema.Struct({
  consumers: Schema.optional(Schema.Array(Schema.Unknown)),
  consumersTotalCount: Schema.optional(Schema.Number),
  createdOn: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  producers: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Struct({
          script: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("worker")),
        }),
        Schema.Struct({
          bucketName: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("r2_bucket")),
        }).pipe(Schema.encodeKeys({ bucketName: "bucket_name", type: "type" })),
      ]),
    ),
  ),
  producersTotalCount: Schema.optional(Schema.Number),
  queueId: Schema.optional(Schema.String),
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

export const getQueue: API.OperationMethod<
  GetQueueRequest,
  GetQueueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetQueueRequest,
  output: GetQueueResponse,
  errors: [],
}));

export interface ListQueuesRequest {
  /** A Resource identifier. */
  accountId: string;
}

export const ListQueuesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues" }),
) as unknown as Schema.Schema<ListQueuesRequest>;

export type ListQueuesResponse = {
  consumers?: unknown[];
  consumersTotalCount?: number;
  createdOn?: string;
  modifiedOn?: string;
  producers?: (
    | { script?: string; type?: "worker" }
    | { bucketName?: string; type?: "r2_bucket" }
  )[];
  producersTotalCount?: number;
  queueId?: string;
  queueName?: string;
  settings?: {
    deliveryDelay?: number;
    deliveryPaused?: boolean;
    messageRetentionPeriod?: number;
  };
}[];

export const ListQueuesResponse = Schema.Array(
  Schema.Struct({
    consumers: Schema.optional(Schema.Array(Schema.Unknown)),
    consumersTotalCount: Schema.optional(Schema.Number),
    createdOn: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    producers: Schema.optional(
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            script: Schema.optional(Schema.String),
            type: Schema.optional(Schema.Literal("worker")),
          }),
          Schema.Struct({
            bucketName: Schema.optional(Schema.String),
            type: Schema.optional(Schema.Literal("r2_bucket")),
          }).pipe(
            Schema.encodeKeys({ bucketName: "bucket_name", type: "type" }),
          ),
        ]),
      ),
    ),
    producersTotalCount: Schema.optional(Schema.Number),
    queueId: Schema.optional(Schema.String),
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

export const listQueues: API.OperationMethod<
  ListQueuesRequest,
  ListQueuesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreateQueueRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  queueName: Schema.String,
}).pipe(
  Schema.encodeKeys({ queueName: "queue_name" }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues" }),
) as unknown as Schema.Schema<CreateQueueRequest>;

export interface CreateQueueResponse {
  consumers?: unknown[];
  consumersTotalCount?: number;
  createdOn?: string;
  modifiedOn?: string;
  producers?: (
    | { script?: string; type?: "worker" }
    | { bucketName?: string; type?: "r2_bucket" }
  )[];
  producersTotalCount?: number;
  queueId?: string;
  queueName?: string;
  settings?: {
    deliveryDelay?: number;
    deliveryPaused?: boolean;
    messageRetentionPeriod?: number;
  };
}

export const CreateQueueResponse = Schema.Struct({
  consumers: Schema.optional(Schema.Array(Schema.Unknown)),
  consumersTotalCount: Schema.optional(Schema.Number),
  createdOn: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  producers: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Struct({
          script: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("worker")),
        }),
        Schema.Struct({
          bucketName: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("r2_bucket")),
        }).pipe(Schema.encodeKeys({ bucketName: "bucket_name", type: "type" })),
      ]),
    ),
  ),
  producersTotalCount: Schema.optional(Schema.Number),
  queueId: Schema.optional(Schema.String),
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

export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateQueueRequest = Schema.Struct({
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
  consumers?: unknown[];
  consumersTotalCount?: number;
  createdOn?: string;
  modifiedOn?: string;
  producers?: (
    | { script?: string; type?: "worker" }
    | { bucketName?: string; type?: "r2_bucket" }
  )[];
  producersTotalCount?: number;
  queueId?: string;
  queueName?: string;
  settings?: {
    deliveryDelay?: number;
    deliveryPaused?: boolean;
    messageRetentionPeriod?: number;
  };
}

export const UpdateQueueResponse = Schema.Struct({
  consumers: Schema.optional(Schema.Array(Schema.Unknown)),
  consumersTotalCount: Schema.optional(Schema.Number),
  createdOn: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  producers: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Struct({
          script: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("worker")),
        }),
        Schema.Struct({
          bucketName: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("r2_bucket")),
        }).pipe(Schema.encodeKeys({ bucketName: "bucket_name", type: "type" })),
      ]),
    ),
  ),
  producersTotalCount: Schema.optional(Schema.Number),
  queueId: Schema.optional(Schema.String),
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

export const updateQueue: API.OperationMethod<
  UpdateQueueRequest,
  UpdateQueueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateQueueRequest,
  output: UpdateQueueResponse,
  errors: [],
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

export const PatchQueueRequest = Schema.Struct({
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
  consumers?: unknown[];
  consumersTotalCount?: number;
  createdOn?: string;
  modifiedOn?: string;
  producers?: (
    | { script?: string; type?: "worker" }
    | { bucketName?: string; type?: "r2_bucket" }
  )[];
  producersTotalCount?: number;
  queueId?: string;
  queueName?: string;
  settings?: {
    deliveryDelay?: number;
    deliveryPaused?: boolean;
    messageRetentionPeriod?: number;
  };
}

export const PatchQueueResponse = Schema.Struct({
  consumers: Schema.optional(Schema.Array(Schema.Unknown)),
  consumersTotalCount: Schema.optional(Schema.Number),
  createdOn: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  producers: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Struct({
          script: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("worker")),
        }),
        Schema.Struct({
          bucketName: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literal("r2_bucket")),
        }).pipe(Schema.encodeKeys({ bucketName: "bucket_name", type: "type" })),
      ]),
    ),
  ),
  producersTotalCount: Schema.optional(Schema.Number),
  queueId: Schema.optional(Schema.String),
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

export const patchQueue: API.OperationMethod<
  PatchQueueRequest,
  PatchQueueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchQueueRequest,
  output: PatchQueueResponse,
  errors: [],
}));

export interface DeleteQueueRequest {
  queueId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const DeleteQueueRequest = Schema.Struct({
  queueId: Schema.String.pipe(T.HttpPath("queueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/queues/{queueId}" }),
) as unknown as Schema.Schema<DeleteQueueRequest>;

export interface DeleteQueueResponse {
  errors?: unknown[];
  messages?: string[];
  /** Indicates if the API call was successful or not. */
  success?: true;
}

export const DeleteQueueResponse = Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.Unknown)),
  messages: Schema.optional(Schema.Array(Schema.String)),
  success: Schema.optional(Schema.Literal(true)),
}) as unknown as Schema.Schema<DeleteQueueResponse>;

export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetSubscriptionRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
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
    | { type?: "images" }
    | { type?: "kv" }
    | { type?: "r2" }
    | { type?: "superSlurper" }
    | { type?: "vectorize" }
    | { modelName?: string; type?: "workersAi.model" }
    | { type?: "workersBuilds.worker"; workerName?: string }
    | { type?: "workflows.workflow"; workflowName?: string };
}

export const GetSubscriptionResponse = Schema.Struct({
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
    }).pipe(Schema.encodeKeys({ type: "type", workflowName: "workflow_name" })),
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

export const getSubscription: API.OperationMethod<
  GetSubscriptionRequest,
  GetSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSubscriptionRequest,
  output: GetSubscriptionResponse,
  errors: [],
}));

export interface ListSubscriptionsRequest {
  /** Path param: A Resource identifier. */
  accountId: string;
  /** Query param: Sort direction */
  direction?: "asc" | "desc";
  /** Query param: Field to sort by */
  order?: "created_at" | "name" | "enabled" | "source";
}

export const ListSubscriptionsRequest = Schema.Struct({
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
    | { type?: "images" }
    | { type?: "kv" }
    | { type?: "r2" }
    | { type?: "superSlurper" }
    | { type?: "vectorize" }
    | { modelName?: string; type?: "workersAi.model" }
    | { type?: "workersBuilds.worker"; workerName?: string }
    | { type?: "workflows.workflow"; workflowName?: string };
}[];

export const ListSubscriptionsResponse = Schema.Array(
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

export const listSubscriptions: API.OperationMethod<
  ListSubscriptionsRequest,
  ListSubscriptionsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreateSubscriptionRequest = Schema.Struct({
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
    | { type?: "images" }
    | { type?: "kv" }
    | { type?: "r2" }
    | { type?: "superSlurper" }
    | { type?: "vectorize" }
    | { modelName?: string; type?: "workersAi.model" }
    | { type?: "workersBuilds.worker"; workerName?: string }
    | { type?: "workflows.workflow"; workflowName?: string };
}

export const CreateSubscriptionResponse = Schema.Struct({
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
    }).pipe(Schema.encodeKeys({ type: "type", workflowName: "workflow_name" })),
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

export const createSubscription: API.OperationMethod<
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSubscriptionRequest,
  output: CreateSubscriptionResponse,
  errors: [],
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

export const PatchSubscriptionRequest = Schema.Struct({
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
    | { type?: "images" }
    | { type?: "kv" }
    | { type?: "r2" }
    | { type?: "superSlurper" }
    | { type?: "vectorize" }
    | { modelName?: string; type?: "workersAi.model" }
    | { type?: "workersBuilds.worker"; workerName?: string }
    | { type?: "workflows.workflow"; workflowName?: string };
}

export const PatchSubscriptionResponse = Schema.Struct({
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
    }).pipe(Schema.encodeKeys({ type: "type", workflowName: "workflow_name" })),
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

export const patchSubscription: API.OperationMethod<
  PatchSubscriptionRequest,
  PatchSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSubscriptionRequest,
  output: PatchSubscriptionResponse,
  errors: [],
}));

export interface DeleteSubscriptionRequest {
  subscriptionId: string;
  /** A Resource identifier. */
  accountId: string;
}

export const DeleteSubscriptionRequest = Schema.Struct({
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
    | { type?: "images" }
    | { type?: "kv" }
    | { type?: "r2" }
    | { type?: "superSlurper" }
    | { type?: "vectorize" }
    | { modelName?: string; type?: "workersAi.model" }
    | { type?: "workersBuilds.worker"; workerName?: string }
    | { type?: "workflows.workflow"; workflowName?: string };
}

export const DeleteSubscriptionResponse = Schema.Struct({
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
    }).pipe(Schema.encodeKeys({ type: "type", workflowName: "workflow_name" })),
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

export const deleteSubscription: API.OperationMethod<
  DeleteSubscriptionRequest,
  DeleteSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSubscriptionRequest,
  output: DeleteSubscriptionResponse,
  errors: [],
}));
