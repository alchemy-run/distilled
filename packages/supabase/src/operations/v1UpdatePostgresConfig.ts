import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdatePostgresConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    effective_cache_size: Schema.optional(Schema.String),
    logical_decoding_work_mem: Schema.optional(Schema.String),
    maintenance_work_mem: Schema.optional(Schema.String),
    track_activity_query_size: Schema.optional(Schema.String),
    max_connections: Schema.optional(Schema.Number),
    max_locks_per_transaction: Schema.optional(Schema.Number),
    max_parallel_maintenance_workers: Schema.optional(Schema.Number),
    max_parallel_workers: Schema.optional(Schema.Number),
    max_parallel_workers_per_gather: Schema.optional(Schema.Number),
    max_replication_slots: Schema.optional(Schema.Number),
    max_slot_wal_keep_size: Schema.optional(Schema.String),
    max_standby_archive_delay: Schema.optional(Schema.String),
    max_standby_streaming_delay: Schema.optional(Schema.String),
    max_wal_size: Schema.optional(Schema.String),
    max_wal_senders: Schema.optional(Schema.Number),
    max_worker_processes: Schema.optional(Schema.Number),
    session_replication_role: Schema.optional(
      Schema.Literals(["origin", "replica", "local"]),
    ),
    shared_buffers: Schema.optional(Schema.String),
    statement_timeout: Schema.optional(Schema.String),
    track_commit_timestamp: Schema.optional(Schema.Boolean),
    wal_keep_size: Schema.optional(Schema.String),
    wal_sender_timeout: Schema.optional(Schema.String),
    work_mem: Schema.optional(Schema.String),
    checkpoint_timeout: Schema.optional(Schema.String),
    hot_standby_feedback: Schema.optional(Schema.Boolean),
    restart_database: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/v1/projects/{ref}/config/database/postgres",
    }),
  );
export type V1UpdatePostgresConfigInput =
  typeof V1UpdatePostgresConfigInput.Type;

// Output Schema
export const V1UpdatePostgresConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    effective_cache_size: Schema.optional(Schema.String),
    logical_decoding_work_mem: Schema.optional(Schema.String),
    maintenance_work_mem: Schema.optional(Schema.String),
    track_activity_query_size: Schema.optional(Schema.String),
    max_connections: Schema.optional(Schema.Number),
    max_locks_per_transaction: Schema.optional(Schema.Number),
    max_parallel_maintenance_workers: Schema.optional(Schema.Number),
    max_parallel_workers: Schema.optional(Schema.Number),
    max_parallel_workers_per_gather: Schema.optional(Schema.Number),
    max_replication_slots: Schema.optional(Schema.Number),
    max_slot_wal_keep_size: Schema.optional(Schema.String),
    max_standby_archive_delay: Schema.optional(Schema.String),
    max_standby_streaming_delay: Schema.optional(Schema.String),
    max_wal_size: Schema.optional(Schema.String),
    max_wal_senders: Schema.optional(Schema.Number),
    max_worker_processes: Schema.optional(Schema.Number),
    session_replication_role: Schema.optional(
      Schema.Literals(["origin", "replica", "local"]),
    ),
    shared_buffers: Schema.optional(Schema.String),
    statement_timeout: Schema.optional(Schema.String),
    track_commit_timestamp: Schema.optional(Schema.Boolean),
    wal_keep_size: Schema.optional(Schema.String),
    wal_sender_timeout: Schema.optional(Schema.String),
    work_mem: Schema.optional(Schema.String),
    checkpoint_timeout: Schema.optional(Schema.String),
    hot_standby_feedback: Schema.optional(Schema.Boolean),
  });
export type V1UpdatePostgresConfigOutput =
  typeof V1UpdatePostgresConfigOutput.Type;

// The operation
/**
 * Updates project's Postgres config
 *
 * @param ref - Project ref
 */
export const v1UpdatePostgresConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdatePostgresConfigInput,
    outputSchema: V1UpdatePostgresConfigOutput,
  }),
);
