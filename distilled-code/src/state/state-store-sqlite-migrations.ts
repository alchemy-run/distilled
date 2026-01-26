import * as Effect from "effect/Effect";
import * as Schedule from "effect/Schedule";
import { isRetryable, isSqliteError, SqliteBusy } from "../sql/sqlite-error.ts";
import type { SqliteConnection } from "../sql/sqlite.ts";

/**
 * Migration definition.
 */
interface Migration {
  /** Unique version identifier (e.g., "001_initial_schema") */
  version: string;
  /** SQL statements to execute for this migration (array for libsql compatibility) */
  statements: string[];
}

/**
 * Ordered list of migrations.
 * New migrations should be appended to this array.
 * Never modify or remove existing migrations - only add new ones.
 */
export const MIGRATIONS: Migration[] = [
  {
    version: "001_initial_schema",
    statements: [
      `CREATE TABLE IF NOT EXISTS threads (
        thread_id TEXT NOT NULL,
        agent_id TEXT NOT NULL,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
        PRIMARY KEY (thread_id, agent_id)
      )`,
      `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        thread_id TEXT NOT NULL,
        agent_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        position INTEGER NOT NULL,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        FOREIGN KEY (thread_id, agent_id) REFERENCES threads(thread_id, agent_id)
      )`,
      `CREATE TABLE IF NOT EXISTS parts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        thread_id TEXT NOT NULL,
        agent_id TEXT NOT NULL,
        type TEXT NOT NULL,
        content TEXT NOT NULL,
        position INTEGER NOT NULL,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        FOREIGN KEY (thread_id, agent_id) REFERENCES threads(thread_id, agent_id)
      )`,
      `CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(thread_id, agent_id)`,
      `CREATE INDEX IF NOT EXISTS idx_parts_thread ON parts(thread_id, agent_id)`,
    ],
  },
  // Add new migrations here:
  // {
  //   version: "002_add_some_column",
  //   sql: `ALTER TABLE threads ADD COLUMN some_column TEXT;`,
  // },
];

/**
 * Run all pending migrations on the database.
 * Creates the migrations table if it doesn't exist.
 * Uses retry logic to handle concurrent migration attempts.
 */
export const runMigrations = (conn: SqliteConnection) =>
  Effect.gen(function* () {
    // Create migrations table if it doesn't exist
    yield* conn.exec(`
      CREATE TABLE IF NOT EXISTS _migrations (
        version TEXT PRIMARY KEY,
        applied_at INTEGER NOT NULL DEFAULT (unixepoch())
      );
    `);

    // Get already applied migrations
    const selectMigrations = yield* conn.prepare<{ version: string }>(
      "SELECT version FROM _migrations ORDER BY version",
    );
    const appliedRows = yield* selectMigrations.all();
    const appliedVersions = new Set(appliedRows.map((r) => r.version));

    // Run pending migrations in order
    for (const migration of MIGRATIONS) {
      if (appliedVersions.has(migration.version)) {
        continue; // Already applied
      }

      // Execute migration in a transaction with retry for busy errors
      yield* conn
        .transaction((tx) =>
          Effect.gen(function* () {
            // Check again inside transaction in case another process applied it
            const checkMigration = yield* tx.prepare<{ version: string }>(
              "SELECT version FROM _migrations WHERE version = ?",
            );
            const existing = yield* checkMigration.get(migration.version);
            if (existing) {
              // Another process already applied this migration
              return;
            }

            // Execute each migration statement
            for (const sql of migration.statements) {
              yield* tx.exec(sql);
            }

            const insertMigration = yield* tx.prepare(
              "INSERT INTO _migrations (version) VALUES (?)",
            );
            yield* insertMigration.run(migration.version);
          }),
        )
        .pipe(
          Effect.tapError((e) =>
            Effect.log(`[sqlite] Migration failed: ${e.message}`),
          ),
          Effect.retry(
            Schedule.recurWhile((e) => isSqliteError(e) && isRetryable(e)).pipe(
              Schedule.intersect(Schedule.exponential("100 millis")),
              Schedule.intersect(Schedule.recurs(10)),
            ),
          ),
          // If we still fail, check if the migration was applied by another process
          Effect.catchIf(
            (e) => isSqliteError(e) && isRetryable(e),
            () =>
              Effect.gen(function* () {
                const checkMigration = yield* conn.prepare<{ version: string }>(
                  "SELECT version FROM _migrations WHERE version = ?",
                );
                const existing = yield* checkMigration.get(migration.version);
                if (existing) {
                  // Migration was applied by another process, continue
                  return;
                }
                // Still not applied and we can't get a lock, fail
                yield* Effect.fail(
                  new SqliteBusy({
                    message: `Failed to apply migration ${migration.version}: database is locked`,
                  }),
                );
              }),
          ),
        );

      yield* Effect.log(`[sqlite] Applied migration: ${migration.version}`);
    }
  });
