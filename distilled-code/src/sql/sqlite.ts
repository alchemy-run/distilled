import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";

// Re-export all error types from sqlite-error.ts
export type { SqliteErrorType } from "./sqlite-error.ts";
export {
  parseError,
  isRetryable,
  // Primary result codes
  SqliteError,
  SqliteInternal,
  SqlitePerm,
  SqliteAbort,
  SqliteBusy,
  SqliteLocked,
  SqliteNomem,
  SqliteReadonly,
  SqliteInterrupt,
  SqliteIoerr,
  SqliteCorrupt,
  SqliteNotfound,
  SqliteFull,
  SqliteCantopen,
  SqliteProtocol,
  SqliteEmpty,
  SqliteSchema,
  SqliteToobig,
  SqliteConstraint,
  SqliteMismatch,
  SqliteMisuse,
  SqliteNolfs,
  SqliteAuth,
  SqliteFormat,
  SqliteRange,
  SqliteNotadb,
  SqliteNotice,
  SqliteWarning,
  // Extended - ABORT
  SqliteAbortRollback,
  // Extended - AUTH
  SqliteAuthUser,
  // Extended - BUSY
  SqliteBusyRecovery,
  SqliteBusySnapshot,
  SqliteBusyTimeout,
  // Extended - CANTOPEN
  SqliteCantopenConvpath,
  SqliteCantopenDirtywal,
  SqliteCantopenFullpath,
  SqliteCantopenIsdir,
  SqliteCantopenNotempdir,
  SqliteCantopenSymlink,
  // Extended - CONSTRAINT
  SqliteConstraintCheck,
  SqliteConstraintCommithook,
  SqliteConstraintDatatype,
  SqliteConstraintForeignkey,
  SqliteConstraintFunction,
  SqliteConstraintNotnull,
  SqliteConstraintPinned,
  SqliteConstraintPrimarykey,
  SqliteConstraintRowid,
  SqliteConstraintTrigger,
  SqliteConstraintUnique,
  SqliteConstraintVtab,
  // Extended - CORRUPT
  SqliteCorruptIndex,
  SqliteCorruptSequence,
  SqliteCorruptVtab,
  // Extended - ERROR
  SqliteErrorMissingCollseq,
  SqliteErrorRetry,
  SqliteErrorSnapshot,
  // Extended - IOERR
  SqliteIoerrAccess,
  SqliteIoerrAuth,
  SqliteIoerrBeginAtomic,
  SqliteIoerrBlocked,
  SqliteIoerrCheckreservedlock,
  SqliteIoerrClose,
  SqliteIoerrCommitAtomic,
  SqliteIoerrConvpath,
  SqliteIoerrCorruptfs,
  SqliteIoerrData,
  SqliteIoerrDelete,
  SqliteIoerrDeleteNoent,
  SqliteIoerrDirClose,
  SqliteIoerrDirFsync,
  SqliteIoerrFstat,
  SqliteIoerrFsync,
  SqliteIoerrGettemppath,
  SqliteIoerrLock,
  SqliteIoerrMmap,
  SqliteIoerrNomem,
  SqliteIoerrRdlock,
  SqliteIoerrRead,
  SqliteIoerrRollbackAtomic,
  SqliteIoerrSeek,
  SqliteIoerrShmlock,
  SqliteIoerrShmmap,
  SqliteIoerrShmopen,
  SqliteIoerrShmsize,
  SqliteIoerrShortRead,
  SqliteIoerrTruncate,
  SqliteIoerrUnlock,
  SqliteIoerrVnode,
  SqliteIoerrWrite,
  // Extended - LOCKED
  SqliteLockedSharedcache,
  SqliteLockedVtab,
  // Extended - NOTICE
  SqliteNoticeRecoverRollback,
  SqliteNoticeRecoverWal,
  // Extended - READONLY
  SqliteReadonlyCantinit,
  SqliteReadonlyCantlock,
  SqliteReadonlyDbmoved,
  SqliteReadonlyDirectory,
  SqliteReadonlyRecovery,
  SqliteReadonlyRollback,
  // Extended - WARNING
  SqliteWarningAutoindex,
  // Unknown
  SqliteUnknownError,
} from "./sqlite-error.ts";

import type { SqliteErrorType } from "./sqlite-error.ts";

/**
 * A prepared SQL statement that can be executed multiple times.
 */
export interface SqliteStatement<R = unknown> {
  /**
   * Execute the statement and return all matching rows.
   */
  all<T = R>(...params: unknown[]): Effect.Effect<T[], SqliteErrorType>;

  /**
   * Execute the statement and return the first matching row.
   */
  get<T = R>(
    ...params: unknown[]
  ): Effect.Effect<T | undefined, SqliteErrorType>;

  /**
   * Execute the statement for its side effects (INSERT, UPDATE, DELETE).
   */
  run(...params: unknown[]): Effect.Effect<void, SqliteErrorType>;
}

/**
 * SQL database connection interface abstraction.
 *
 * This interface decouples from specific SQLite implementations (Bun, better-sqlite3, etc.)
 * and uses Effects for all operations to support async interfaces in the future.
 */
export interface SqliteConnection {
  /**
   * Prepare a SQL statement for execution.
   */
  prepare<R = unknown>(
    sql: string,
  ): Effect.Effect<SqliteStatement<R>, SqliteErrorType>;

  /**
   * Execute raw SQL statements (e.g., for DDL operations).
   */
  exec(sql: string): Effect.Effect<void, SqliteErrorType>;

  /**
   * Execute a function within a transaction.
   * If the effect fails, the transaction is rolled back.
   * If the effect succeeds, the transaction is committed.
   *
   * The callback receives a connection that should be used for all operations
   * within the transaction to avoid deadlocks with async implementations.
   *
   * Note: For synchronous implementations (like Bun SQLite), the effect
   * must have no requirements (R = never). Async implementations may
   * support effects with requirements.
   */
  transaction<A, E>(
    fn: (conn: SqliteConnection) => Effect.Effect<A, E, never>,
  ): Effect.Effect<A, E | SqliteErrorType, never>;

  /**
   * Execute a batch of SQL statements atomically.
   *
   * The batch is executed in its own logical database connection and the statements
   * are wrapped in a transaction. This ensures that the batch is applied atomically:
   * either all or no changes are applied.
   *
   * If any of the statements in the batch fails with an error, the batch is aborted,
   * the transaction is rolled back and the effect fails.
   *
   * @param statements - Array of SQL statements with their parameters
   */
  batch(
    statements: Array<{ sql: string; params?: unknown[] }>,
  ): Effect.Effect<void, SqliteErrorType>;
}

/**
 * SQLite service that provides database connection factory.
 */
export interface Sqlite {
  /**
   * Open a SQLite database at the given path.
   */
  open(path: string): Effect.Effect<SqliteConnection, SqliteErrorType>;
}

export const Sqlite = Context.GenericTag<Sqlite>("Sqlite");
