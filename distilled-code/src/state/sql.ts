import * as Context from "effect/Context";
import * as Data from "effect/Data";
import type * as Effect from "effect/Effect";

/**
 * Error that occurs when a SQL operation fails.
 */
export class SqlError extends Data.TaggedError("SqlError")<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

/**
 * A prepared SQL statement that can be executed multiple times.
 */
export interface SqlStatement<R = unknown> {
  /**
   * Execute the statement and return all matching rows.
   */
  all<T = R>(...params: unknown[]): Effect.Effect<T[], SqlError>;

  /**
   * Execute the statement and return the first matching row.
   */
  get<T = R>(...params: unknown[]): Effect.Effect<T | undefined, SqlError>;

  /**
   * Execute the statement for its side effects (INSERT, UPDATE, DELETE).
   */
  run(...params: unknown[]): Effect.Effect<void, SqlError>;
}

/**
 * SQL database interface abstraction.
 *
 * This interface decouples from specific SQLite implementations (Bun, better-sqlite3, etc.)
 * and uses Effects for all operations to support async interfaces in the future.
 */
export interface Sql {
  /**
   * Prepare a SQL statement for execution.
   */
  prepare<R = unknown>(sql: string): Effect.Effect<SqlStatement<R>, SqlError>;

  /**
   * Execute raw SQL statements (e.g., for DDL operations).
   */
  exec(sql: string): Effect.Effect<void, SqlError>;

  /**
   * Execute a function within a transaction.
   * If the effect fails, the transaction is rolled back.
   * If the effect succeeds, the transaction is committed.
   *
   * Note: For synchronous implementations (like Bun SQLite), the effect
   * must have no requirements (R = never). Async implementations may
   * support effects with requirements.
   */
  transaction<A, E>(
    fn: Effect.Effect<A, E, never>,
  ): Effect.Effect<A, E | SqlError, never>;
}

export const Sql = Context.GenericTag<Sql>("Sql");
