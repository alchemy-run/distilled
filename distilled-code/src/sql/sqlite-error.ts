import * as Data from "effect/Data";

/**
 * Base error properties shared by all SQLite errors.
 */
interface SqliteErrorProps {
  readonly message: string;
  readonly cause?: unknown;
}

// =============================================================================
// Primary Result Codes
// =============================================================================

/**
 * SQLITE_ERROR (1) - Generic error code.
 */
export class SqliteError extends Data.TaggedError(
  "SQLITE_ERROR",
)<SqliteErrorProps> {}

/**
 * SQLITE_INTERNAL (2) - Internal malfunction.
 */
export class SqliteInternal extends Data.TaggedError(
  "SQLITE_INTERNAL",
)<SqliteErrorProps> {}

/**
 * SQLITE_PERM (3) - Access permission denied.
 */
export class SqlitePerm extends Data.TaggedError(
  "SQLITE_PERM",
)<SqliteErrorProps> {}

/**
 * SQLITE_ABORT (4) - Operation aborted.
 */
export class SqliteAbort extends Data.TaggedError(
  "SQLITE_ABORT",
)<SqliteErrorProps> {}

/**
 * SQLITE_BUSY (5) - Database file is locked.
 */
export class SqliteBusy extends Data.TaggedError(
  "SQLITE_BUSY",
)<SqliteErrorProps> {}

/**
 * SQLITE_LOCKED (6) - A table in the database is locked.
 */
export class SqliteLocked extends Data.TaggedError(
  "SQLITE_LOCKED",
)<SqliteErrorProps> {}

/**
 * SQLITE_NOMEM (7) - Memory allocation failed.
 */
export class SqliteNomem extends Data.TaggedError(
  "SQLITE_NOMEM",
)<SqliteErrorProps> {}

/**
 * SQLITE_READONLY (8) - Attempt to write a readonly database.
 */
export class SqliteReadonly extends Data.TaggedError(
  "SQLITE_READONLY",
)<SqliteErrorProps> {}

/**
 * SQLITE_INTERRUPT (9) - Operation interrupted.
 */
export class SqliteInterrupt extends Data.TaggedError(
  "SQLITE_INTERRUPT",
)<SqliteErrorProps> {}

/**
 * SQLITE_IOERR (10) - I/O error.
 */
export class SqliteIoerr extends Data.TaggedError(
  "SQLITE_IOERR",
)<SqliteErrorProps> {}

/**
 * SQLITE_CORRUPT (11) - Database disk image is malformed.
 */
export class SqliteCorrupt extends Data.TaggedError(
  "SQLITE_CORRUPT",
)<SqliteErrorProps> {}

/**
 * SQLITE_NOTFOUND (12) - Unknown opcode or table not found.
 */
export class SqliteNotfound extends Data.TaggedError(
  "SQLITE_NOTFOUND",
)<SqliteErrorProps> {}

/**
 * SQLITE_FULL (13) - Database or disk is full.
 */
export class SqliteFull extends Data.TaggedError(
  "SQLITE_FULL",
)<SqliteErrorProps> {}

/**
 * SQLITE_CANTOPEN (14) - Unable to open database file.
 */
export class SqliteCantopen extends Data.TaggedError(
  "SQLITE_CANTOPEN",
)<SqliteErrorProps> {}

/**
 * SQLITE_PROTOCOL (15) - Database lock protocol error.
 */
export class SqliteProtocol extends Data.TaggedError(
  "SQLITE_PROTOCOL",
)<SqliteErrorProps> {}

/**
 * SQLITE_EMPTY (16) - Internal use only.
 */
export class SqliteEmpty extends Data.TaggedError(
  "SQLITE_EMPTY",
)<SqliteErrorProps> {}

/**
 * SQLITE_SCHEMA (17) - Database schema changed.
 */
export class SqliteSchema extends Data.TaggedError(
  "SQLITE_SCHEMA",
)<SqliteErrorProps> {}

/**
 * SQLITE_TOOBIG (18) - String or BLOB exceeds size limit.
 */
export class SqliteToobig extends Data.TaggedError(
  "SQLITE_TOOBIG",
)<SqliteErrorProps> {}

/**
 * SQLITE_CONSTRAINT (19) - Constraint violation.
 */
export class SqliteConstraint extends Data.TaggedError(
  "SQLITE_CONSTRAINT",
)<SqliteErrorProps> {}

/**
 * SQLITE_MISMATCH (20) - Data type mismatch.
 */
export class SqliteMismatch extends Data.TaggedError(
  "SQLITE_MISMATCH",
)<SqliteErrorProps> {}

/**
 * SQLITE_MISUSE (21) - Library used incorrectly.
 */
export class SqliteMisuse extends Data.TaggedError(
  "SQLITE_MISUSE",
)<SqliteErrorProps> {}

/**
 * SQLITE_NOLFS (22) - Uses OS features not supported on host.
 */
export class SqliteNolfs extends Data.TaggedError(
  "SQLITE_NOLFS",
)<SqliteErrorProps> {}

/**
 * SQLITE_AUTH (23) - Authorization denied.
 */
export class SqliteAuth extends Data.TaggedError(
  "SQLITE_AUTH",
)<SqliteErrorProps> {}

/**
 * SQLITE_FORMAT (24) - Not used.
 */
export class SqliteFormat extends Data.TaggedError(
  "SQLITE_FORMAT",
)<SqliteErrorProps> {}

/**
 * SQLITE_RANGE (25) - 2nd parameter to sqlite3_bind out of range.
 */
export class SqliteRange extends Data.TaggedError(
  "SQLITE_RANGE",
)<SqliteErrorProps> {}

/**
 * SQLITE_NOTADB (26) - File opened that is not a database file.
 */
export class SqliteNotadb extends Data.TaggedError(
  "SQLITE_NOTADB",
)<SqliteErrorProps> {}

/**
 * SQLITE_NOTICE (27) - Notifications from sqlite3_log().
 */
export class SqliteNotice extends Data.TaggedError(
  "SQLITE_NOTICE",
)<SqliteErrorProps> {}

/**
 * SQLITE_WARNING (28) - Warnings from sqlite3_log().
 */
export class SqliteWarning extends Data.TaggedError(
  "SQLITE_WARNING",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - ABORT
// =============================================================================

export class SqliteAbortRollback extends Data.TaggedError(
  "SQLITE_ABORT_ROLLBACK",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - AUTH
// =============================================================================

export class SqliteAuthUser extends Data.TaggedError(
  "SQLITE_AUTH_USER",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - BUSY
// =============================================================================

export class SqliteBusyRecovery extends Data.TaggedError(
  "SQLITE_BUSY_RECOVERY",
)<SqliteErrorProps> {}
export class SqliteBusySnapshot extends Data.TaggedError(
  "SQLITE_BUSY_SNAPSHOT",
)<SqliteErrorProps> {}
export class SqliteBusyTimeout extends Data.TaggedError(
  "SQLITE_BUSY_TIMEOUT",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - CANTOPEN
// =============================================================================

export class SqliteCantopenConvpath extends Data.TaggedError(
  "SQLITE_CANTOPEN_CONVPATH",
)<SqliteErrorProps> {}
export class SqliteCantopenDirtywal extends Data.TaggedError(
  "SQLITE_CANTOPEN_DIRTYWAL",
)<SqliteErrorProps> {}
export class SqliteCantopenFullpath extends Data.TaggedError(
  "SQLITE_CANTOPEN_FULLPATH",
)<SqliteErrorProps> {}
export class SqliteCantopenIsdir extends Data.TaggedError(
  "SQLITE_CANTOPEN_ISDIR",
)<SqliteErrorProps> {}
export class SqliteCantopenNotempdir extends Data.TaggedError(
  "SQLITE_CANTOPEN_NOTEMPDIR",
)<SqliteErrorProps> {}
export class SqliteCantopenSymlink extends Data.TaggedError(
  "SQLITE_CANTOPEN_SYMLINK",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - CONSTRAINT
// =============================================================================

export class SqliteConstraintCheck extends Data.TaggedError(
  "SQLITE_CONSTRAINT_CHECK",
)<SqliteErrorProps> {}
export class SqliteConstraintCommithook extends Data.TaggedError(
  "SQLITE_CONSTRAINT_COMMITHOOK",
)<SqliteErrorProps> {}
export class SqliteConstraintDatatype extends Data.TaggedError(
  "SQLITE_CONSTRAINT_DATATYPE",
)<SqliteErrorProps> {}
export class SqliteConstraintForeignkey extends Data.TaggedError(
  "SQLITE_CONSTRAINT_FOREIGNKEY",
)<SqliteErrorProps> {}
export class SqliteConstraintFunction extends Data.TaggedError(
  "SQLITE_CONSTRAINT_FUNCTION",
)<SqliteErrorProps> {}
export class SqliteConstraintNotnull extends Data.TaggedError(
  "SQLITE_CONSTRAINT_NOTNULL",
)<SqliteErrorProps> {}
export class SqliteConstraintPinned extends Data.TaggedError(
  "SQLITE_CONSTRAINT_PINNED",
)<SqliteErrorProps> {}
export class SqliteConstraintPrimarykey extends Data.TaggedError(
  "SQLITE_CONSTRAINT_PRIMARYKEY",
)<SqliteErrorProps> {}
export class SqliteConstraintRowid extends Data.TaggedError(
  "SQLITE_CONSTRAINT_ROWID",
)<SqliteErrorProps> {}
export class SqliteConstraintTrigger extends Data.TaggedError(
  "SQLITE_CONSTRAINT_TRIGGER",
)<SqliteErrorProps> {}
export class SqliteConstraintUnique extends Data.TaggedError(
  "SQLITE_CONSTRAINT_UNIQUE",
)<SqliteErrorProps> {}
export class SqliteConstraintVtab extends Data.TaggedError(
  "SQLITE_CONSTRAINT_VTAB",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - CORRUPT
// =============================================================================

export class SqliteCorruptIndex extends Data.TaggedError(
  "SQLITE_CORRUPT_INDEX",
)<SqliteErrorProps> {}
export class SqliteCorruptSequence extends Data.TaggedError(
  "SQLITE_CORRUPT_SEQUENCE",
)<SqliteErrorProps> {}
export class SqliteCorruptVtab extends Data.TaggedError(
  "SQLITE_CORRUPT_VTAB",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - ERROR
// =============================================================================

export class SqliteErrorMissingCollseq extends Data.TaggedError(
  "SQLITE_ERROR_MISSING_COLLSEQ",
)<SqliteErrorProps> {}
export class SqliteErrorRetry extends Data.TaggedError(
  "SQLITE_ERROR_RETRY",
)<SqliteErrorProps> {}
export class SqliteErrorSnapshot extends Data.TaggedError(
  "SQLITE_ERROR_SNAPSHOT",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - IOERR
// =============================================================================

export class SqliteIoerrAccess extends Data.TaggedError(
  "SQLITE_IOERR_ACCESS",
)<SqliteErrorProps> {}
export class SqliteIoerrAuth extends Data.TaggedError(
  "SQLITE_IOERR_AUTH",
)<SqliteErrorProps> {}
export class SqliteIoerrBeginAtomic extends Data.TaggedError(
  "SQLITE_IOERR_BEGIN_ATOMIC",
)<SqliteErrorProps> {}
export class SqliteIoerrBlocked extends Data.TaggedError(
  "SQLITE_IOERR_BLOCKED",
)<SqliteErrorProps> {}
export class SqliteIoerrCheckreservedlock extends Data.TaggedError(
  "SQLITE_IOERR_CHECKRESERVEDLOCK",
)<SqliteErrorProps> {}
export class SqliteIoerrClose extends Data.TaggedError(
  "SQLITE_IOERR_CLOSE",
)<SqliteErrorProps> {}
export class SqliteIoerrCommitAtomic extends Data.TaggedError(
  "SQLITE_IOERR_COMMIT_ATOMIC",
)<SqliteErrorProps> {}
export class SqliteIoerrConvpath extends Data.TaggedError(
  "SQLITE_IOERR_CONVPATH",
)<SqliteErrorProps> {}
export class SqliteIoerrCorruptfs extends Data.TaggedError(
  "SQLITE_IOERR_CORRUPTFS",
)<SqliteErrorProps> {}
export class SqliteIoerrData extends Data.TaggedError(
  "SQLITE_IOERR_DATA",
)<SqliteErrorProps> {}
export class SqliteIoerrDelete extends Data.TaggedError(
  "SQLITE_IOERR_DELETE",
)<SqliteErrorProps> {}
export class SqliteIoerrDeleteNoent extends Data.TaggedError(
  "SQLITE_IOERR_DELETE_NOENT",
)<SqliteErrorProps> {}
export class SqliteIoerrDirClose extends Data.TaggedError(
  "SQLITE_IOERR_DIR_CLOSE",
)<SqliteErrorProps> {}
export class SqliteIoerrDirFsync extends Data.TaggedError(
  "SQLITE_IOERR_DIR_FSYNC",
)<SqliteErrorProps> {}
export class SqliteIoerrFstat extends Data.TaggedError(
  "SQLITE_IOERR_FSTAT",
)<SqliteErrorProps> {}
export class SqliteIoerrFsync extends Data.TaggedError(
  "SQLITE_IOERR_FSYNC",
)<SqliteErrorProps> {}
export class SqliteIoerrGettemppath extends Data.TaggedError(
  "SQLITE_IOERR_GETTEMPPATH",
)<SqliteErrorProps> {}
export class SqliteIoerrLock extends Data.TaggedError(
  "SQLITE_IOERR_LOCK",
)<SqliteErrorProps> {}
export class SqliteIoerrMmap extends Data.TaggedError(
  "SQLITE_IOERR_MMAP",
)<SqliteErrorProps> {}
export class SqliteIoerrNomem extends Data.TaggedError(
  "SQLITE_IOERR_NOMEM",
)<SqliteErrorProps> {}
export class SqliteIoerrRdlock extends Data.TaggedError(
  "SQLITE_IOERR_RDLOCK",
)<SqliteErrorProps> {}
export class SqliteIoerrRead extends Data.TaggedError(
  "SQLITE_IOERR_READ",
)<SqliteErrorProps> {}
export class SqliteIoerrRollbackAtomic extends Data.TaggedError(
  "SQLITE_IOERR_ROLLBACK_ATOMIC",
)<SqliteErrorProps> {}
export class SqliteIoerrSeek extends Data.TaggedError(
  "SQLITE_IOERR_SEEK",
)<SqliteErrorProps> {}
export class SqliteIoerrShmlock extends Data.TaggedError(
  "SQLITE_IOERR_SHMLOCK",
)<SqliteErrorProps> {}
export class SqliteIoerrShmmap extends Data.TaggedError(
  "SQLITE_IOERR_SHMMAP",
)<SqliteErrorProps> {}
export class SqliteIoerrShmopen extends Data.TaggedError(
  "SQLITE_IOERR_SHMOPEN",
)<SqliteErrorProps> {}
export class SqliteIoerrShmsize extends Data.TaggedError(
  "SQLITE_IOERR_SHMSIZE",
)<SqliteErrorProps> {}
export class SqliteIoerrShortRead extends Data.TaggedError(
  "SQLITE_IOERR_SHORT_READ",
)<SqliteErrorProps> {}
export class SqliteIoerrTruncate extends Data.TaggedError(
  "SQLITE_IOERR_TRUNCATE",
)<SqliteErrorProps> {}
export class SqliteIoerrUnlock extends Data.TaggedError(
  "SQLITE_IOERR_UNLOCK",
)<SqliteErrorProps> {}
export class SqliteIoerrVnode extends Data.TaggedError(
  "SQLITE_IOERR_VNODE",
)<SqliteErrorProps> {}
export class SqliteIoerrWrite extends Data.TaggedError(
  "SQLITE_IOERR_WRITE",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - LOCKED
// =============================================================================

export class SqliteLockedSharedcache extends Data.TaggedError(
  "SQLITE_LOCKED_SHAREDCACHE",
)<SqliteErrorProps> {}
export class SqliteLockedVtab extends Data.TaggedError(
  "SQLITE_LOCKED_VTAB",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - NOTICE
// =============================================================================

export class SqliteNoticeRecoverRollback extends Data.TaggedError(
  "SQLITE_NOTICE_RECOVER_ROLLBACK",
)<SqliteErrorProps> {}
export class SqliteNoticeRecoverWal extends Data.TaggedError(
  "SQLITE_NOTICE_RECOVER_WAL",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - READONLY
// =============================================================================

export class SqliteReadonlyCantinit extends Data.TaggedError(
  "SQLITE_READONLY_CANTINIT",
)<SqliteErrorProps> {}
export class SqliteReadonlyCantlock extends Data.TaggedError(
  "SQLITE_READONLY_CANTLOCK",
)<SqliteErrorProps> {}
export class SqliteReadonlyDbmoved extends Data.TaggedError(
  "SQLITE_READONLY_DBMOVED",
)<SqliteErrorProps> {}
export class SqliteReadonlyDirectory extends Data.TaggedError(
  "SQLITE_READONLY_DIRECTORY",
)<SqliteErrorProps> {}
export class SqliteReadonlyRecovery extends Data.TaggedError(
  "SQLITE_READONLY_RECOVERY",
)<SqliteErrorProps> {}
export class SqliteReadonlyRollback extends Data.TaggedError(
  "SQLITE_READONLY_ROLLBACK",
)<SqliteErrorProps> {}

// =============================================================================
// Extended Result Codes - WARNING
// =============================================================================

export class SqliteWarningAutoindex extends Data.TaggedError(
  "SQLITE_WARNING_AUTOINDEX",
)<SqliteErrorProps> {}

// =============================================================================
// Unknown Error (fallback)
// =============================================================================

/**
 * Fallback for unknown or unrecognized SQLite error codes.
 */
export class SqliteUnknownError extends Data.TaggedError("SQLITE_UNKNOWN")<
  SqliteErrorProps & {
    readonly code?: string;
  }
> {}

// =============================================================================
// Union Type
// =============================================================================

/**
 * Union of all SQLite error types.
 */
export type SqliteErrorType =
  // Primary result codes
  | SqliteError
  | SqliteInternal
  | SqlitePerm
  | SqliteAbort
  | SqliteBusy
  | SqliteLocked
  | SqliteNomem
  | SqliteReadonly
  | SqliteInterrupt
  | SqliteIoerr
  | SqliteCorrupt
  | SqliteNotfound
  | SqliteFull
  | SqliteCantopen
  | SqliteProtocol
  | SqliteEmpty
  | SqliteSchema
  | SqliteToobig
  | SqliteConstraint
  | SqliteMismatch
  | SqliteMisuse
  | SqliteNolfs
  | SqliteAuth
  | SqliteFormat
  | SqliteRange
  | SqliteNotadb
  | SqliteNotice
  | SqliteWarning
  // Extended - ABORT
  | SqliteAbortRollback
  // Extended - AUTH
  | SqliteAuthUser
  // Extended - BUSY
  | SqliteBusyRecovery
  | SqliteBusySnapshot
  | SqliteBusyTimeout
  // Extended - CANTOPEN
  | SqliteCantopenConvpath
  | SqliteCantopenDirtywal
  | SqliteCantopenFullpath
  | SqliteCantopenIsdir
  | SqliteCantopenNotempdir
  | SqliteCantopenSymlink
  // Extended - CONSTRAINT
  | SqliteConstraintCheck
  | SqliteConstraintCommithook
  | SqliteConstraintDatatype
  | SqliteConstraintForeignkey
  | SqliteConstraintFunction
  | SqliteConstraintNotnull
  | SqliteConstraintPinned
  | SqliteConstraintPrimarykey
  | SqliteConstraintRowid
  | SqliteConstraintTrigger
  | SqliteConstraintUnique
  | SqliteConstraintVtab
  // Extended - CORRUPT
  | SqliteCorruptIndex
  | SqliteCorruptSequence
  | SqliteCorruptVtab
  // Extended - ERROR
  | SqliteErrorMissingCollseq
  | SqliteErrorRetry
  | SqliteErrorSnapshot
  // Extended - IOERR
  | SqliteIoerrAccess
  | SqliteIoerrAuth
  | SqliteIoerrBeginAtomic
  | SqliteIoerrBlocked
  | SqliteIoerrCheckreservedlock
  | SqliteIoerrClose
  | SqliteIoerrCommitAtomic
  | SqliteIoerrConvpath
  | SqliteIoerrCorruptfs
  | SqliteIoerrData
  | SqliteIoerrDelete
  | SqliteIoerrDeleteNoent
  | SqliteIoerrDirClose
  | SqliteIoerrDirFsync
  | SqliteIoerrFstat
  | SqliteIoerrFsync
  | SqliteIoerrGettemppath
  | SqliteIoerrLock
  | SqliteIoerrMmap
  | SqliteIoerrNomem
  | SqliteIoerrRdlock
  | SqliteIoerrRead
  | SqliteIoerrRollbackAtomic
  | SqliteIoerrSeek
  | SqliteIoerrShmlock
  | SqliteIoerrShmmap
  | SqliteIoerrShmopen
  | SqliteIoerrShmsize
  | SqliteIoerrShortRead
  | SqliteIoerrTruncate
  | SqliteIoerrUnlock
  | SqliteIoerrVnode
  | SqliteIoerrWrite
  // Extended - LOCKED
  | SqliteLockedSharedcache
  | SqliteLockedVtab
  // Extended - NOTICE
  | SqliteNoticeRecoverRollback
  | SqliteNoticeRecoverWal
  // Extended - READONLY
  | SqliteReadonlyCantinit
  | SqliteReadonlyCantlock
  | SqliteReadonlyDbmoved
  | SqliteReadonlyDirectory
  | SqliteReadonlyRecovery
  | SqliteReadonlyRollback
  // Extended - WARNING
  | SqliteWarningAutoindex
  // Unknown
  | SqliteUnknownError;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Type guard to check if an error is a SQLite error with a _tag.
 */
export const isSqliteError = (error: unknown): error is SqliteErrorType => {
  return (
    typeof error === "object" &&
    error !== null &&
    "_tag" in error &&
    typeof error._tag === "string" &&
    error._tag.startsWith("SQLITE_")
  );
};

/**
 * Check if the error is retryable (busy or locked errors).
 */
export const isRetryable = (e: SqliteErrorType): boolean => {
  switch (e._tag) {
    case "SQLITE_BUSY":
    case "SQLITE_BUSY_RECOVERY":
    case "SQLITE_BUSY_SNAPSHOT":
    case "SQLITE_BUSY_TIMEOUT":
    case "SQLITE_LOCKED":
    case "SQLITE_LOCKED_SHAREDCACHE":
    case "SQLITE_LOCKED_VTAB":
      return true;
    default:
      return false;
  }
};

/**
 * Parse an error from a SQLite client into a typed error.
 */
export const parseError = (
  code: string | undefined,
  message: string,
  cause?: unknown,
): SqliteErrorType => {
  switch (code) {
    // Primary result codes
    case "SQLITE_ERROR":
      return new SqliteError({ message, cause });
    case "SQLITE_INTERNAL":
      return new SqliteInternal({ message, cause });
    case "SQLITE_PERM":
      return new SqlitePerm({ message, cause });
    case "SQLITE_ABORT":
      return new SqliteAbort({ message, cause });
    case "SQLITE_BUSY":
      return new SqliteBusy({ message, cause });
    case "SQLITE_LOCKED":
      return new SqliteLocked({ message, cause });
    case "SQLITE_NOMEM":
      return new SqliteNomem({ message, cause });
    case "SQLITE_READONLY":
      return new SqliteReadonly({ message, cause });
    case "SQLITE_INTERRUPT":
      return new SqliteInterrupt({ message, cause });
    case "SQLITE_IOERR":
      return new SqliteIoerr({ message, cause });
    case "SQLITE_CORRUPT":
      return new SqliteCorrupt({ message, cause });
    case "SQLITE_NOTFOUND":
      return new SqliteNotfound({ message, cause });
    case "SQLITE_FULL":
      return new SqliteFull({ message, cause });
    case "SQLITE_CANTOPEN":
      return new SqliteCantopen({ message, cause });
    case "SQLITE_PROTOCOL":
      return new SqliteProtocol({ message, cause });
    case "SQLITE_EMPTY":
      return new SqliteEmpty({ message, cause });
    case "SQLITE_SCHEMA":
      return new SqliteSchema({ message, cause });
    case "SQLITE_TOOBIG":
      return new SqliteToobig({ message, cause });
    case "SQLITE_CONSTRAINT":
      return new SqliteConstraint({ message, cause });
    case "SQLITE_MISMATCH":
      return new SqliteMismatch({ message, cause });
    case "SQLITE_MISUSE":
      return new SqliteMisuse({ message, cause });
    case "SQLITE_NOLFS":
      return new SqliteNolfs({ message, cause });
    case "SQLITE_AUTH":
      return new SqliteAuth({ message, cause });
    case "SQLITE_FORMAT":
      return new SqliteFormat({ message, cause });
    case "SQLITE_RANGE":
      return new SqliteRange({ message, cause });
    case "SQLITE_NOTADB":
      return new SqliteNotadb({ message, cause });
    case "SQLITE_NOTICE":
      return new SqliteNotice({ message, cause });
    case "SQLITE_WARNING":
      return new SqliteWarning({ message, cause });

    // Extended - ABORT
    case "SQLITE_ABORT_ROLLBACK":
      return new SqliteAbortRollback({ message, cause });

    // Extended - AUTH
    case "SQLITE_AUTH_USER":
      return new SqliteAuthUser({ message, cause });

    // Extended - BUSY
    case "SQLITE_BUSY_RECOVERY":
      return new SqliteBusyRecovery({ message, cause });
    case "SQLITE_BUSY_SNAPSHOT":
      return new SqliteBusySnapshot({ message, cause });
    case "SQLITE_BUSY_TIMEOUT":
      return new SqliteBusyTimeout({ message, cause });

    // Extended - CANTOPEN
    case "SQLITE_CANTOPEN_CONVPATH":
      return new SqliteCantopenConvpath({ message, cause });
    case "SQLITE_CANTOPEN_DIRTYWAL":
      return new SqliteCantopenDirtywal({ message, cause });
    case "SQLITE_CANTOPEN_FULLPATH":
      return new SqliteCantopenFullpath({ message, cause });
    case "SQLITE_CANTOPEN_ISDIR":
      return new SqliteCantopenIsdir({ message, cause });
    case "SQLITE_CANTOPEN_NOTEMPDIR":
      return new SqliteCantopenNotempdir({ message, cause });
    case "SQLITE_CANTOPEN_SYMLINK":
      return new SqliteCantopenSymlink({ message, cause });

    // Extended - CONSTRAINT
    case "SQLITE_CONSTRAINT_CHECK":
      return new SqliteConstraintCheck({ message, cause });
    case "SQLITE_CONSTRAINT_COMMITHOOK":
      return new SqliteConstraintCommithook({ message, cause });
    case "SQLITE_CONSTRAINT_DATATYPE":
      return new SqliteConstraintDatatype({ message, cause });
    case "SQLITE_CONSTRAINT_FOREIGNKEY":
      return new SqliteConstraintForeignkey({ message, cause });
    case "SQLITE_CONSTRAINT_FUNCTION":
      return new SqliteConstraintFunction({ message, cause });
    case "SQLITE_CONSTRAINT_NOTNULL":
      return new SqliteConstraintNotnull({ message, cause });
    case "SQLITE_CONSTRAINT_PINNED":
      return new SqliteConstraintPinned({ message, cause });
    case "SQLITE_CONSTRAINT_PRIMARYKEY":
      return new SqliteConstraintPrimarykey({ message, cause });
    case "SQLITE_CONSTRAINT_ROWID":
      return new SqliteConstraintRowid({ message, cause });
    case "SQLITE_CONSTRAINT_TRIGGER":
      return new SqliteConstraintTrigger({ message, cause });
    case "SQLITE_CONSTRAINT_UNIQUE":
      return new SqliteConstraintUnique({ message, cause });
    case "SQLITE_CONSTRAINT_VTAB":
      return new SqliteConstraintVtab({ message, cause });

    // Extended - CORRUPT
    case "SQLITE_CORRUPT_INDEX":
      return new SqliteCorruptIndex({ message, cause });
    case "SQLITE_CORRUPT_SEQUENCE":
      return new SqliteCorruptSequence({ message, cause });
    case "SQLITE_CORRUPT_VTAB":
      return new SqliteCorruptVtab({ message, cause });

    // Extended - ERROR
    case "SQLITE_ERROR_MISSING_COLLSEQ":
      return new SqliteErrorMissingCollseq({ message, cause });
    case "SQLITE_ERROR_RETRY":
      return new SqliteErrorRetry({ message, cause });
    case "SQLITE_ERROR_SNAPSHOT":
      return new SqliteErrorSnapshot({ message, cause });

    // Extended - IOERR
    case "SQLITE_IOERR_ACCESS":
      return new SqliteIoerrAccess({ message, cause });
    case "SQLITE_IOERR_AUTH":
      return new SqliteIoerrAuth({ message, cause });
    case "SQLITE_IOERR_BEGIN_ATOMIC":
      return new SqliteIoerrBeginAtomic({ message, cause });
    case "SQLITE_IOERR_BLOCKED":
      return new SqliteIoerrBlocked({ message, cause });
    case "SQLITE_IOERR_CHECKRESERVEDLOCK":
      return new SqliteIoerrCheckreservedlock({ message, cause });
    case "SQLITE_IOERR_CLOSE":
      return new SqliteIoerrClose({ message, cause });
    case "SQLITE_IOERR_COMMIT_ATOMIC":
      return new SqliteIoerrCommitAtomic({ message, cause });
    case "SQLITE_IOERR_CONVPATH":
      return new SqliteIoerrConvpath({ message, cause });
    case "SQLITE_IOERR_CORRUPTFS":
      return new SqliteIoerrCorruptfs({ message, cause });
    case "SQLITE_IOERR_DATA":
      return new SqliteIoerrData({ message, cause });
    case "SQLITE_IOERR_DELETE":
      return new SqliteIoerrDelete({ message, cause });
    case "SQLITE_IOERR_DELETE_NOENT":
      return new SqliteIoerrDeleteNoent({ message, cause });
    case "SQLITE_IOERR_DIR_CLOSE":
      return new SqliteIoerrDirClose({ message, cause });
    case "SQLITE_IOERR_DIR_FSYNC":
      return new SqliteIoerrDirFsync({ message, cause });
    case "SQLITE_IOERR_FSTAT":
      return new SqliteIoerrFstat({ message, cause });
    case "SQLITE_IOERR_FSYNC":
      return new SqliteIoerrFsync({ message, cause });
    case "SQLITE_IOERR_GETTEMPPATH":
      return new SqliteIoerrGettemppath({ message, cause });
    case "SQLITE_IOERR_LOCK":
      return new SqliteIoerrLock({ message, cause });
    case "SQLITE_IOERR_MMAP":
      return new SqliteIoerrMmap({ message, cause });
    case "SQLITE_IOERR_NOMEM":
      return new SqliteIoerrNomem({ message, cause });
    case "SQLITE_IOERR_RDLOCK":
      return new SqliteIoerrRdlock({ message, cause });
    case "SQLITE_IOERR_READ":
      return new SqliteIoerrRead({ message, cause });
    case "SQLITE_IOERR_ROLLBACK_ATOMIC":
      return new SqliteIoerrRollbackAtomic({ message, cause });
    case "SQLITE_IOERR_SEEK":
      return new SqliteIoerrSeek({ message, cause });
    case "SQLITE_IOERR_SHMLOCK":
      return new SqliteIoerrShmlock({ message, cause });
    case "SQLITE_IOERR_SHMMAP":
      return new SqliteIoerrShmmap({ message, cause });
    case "SQLITE_IOERR_SHMOPEN":
      return new SqliteIoerrShmopen({ message, cause });
    case "SQLITE_IOERR_SHMSIZE":
      return new SqliteIoerrShmsize({ message, cause });
    case "SQLITE_IOERR_SHORT_READ":
      return new SqliteIoerrShortRead({ message, cause });
    case "SQLITE_IOERR_TRUNCATE":
      return new SqliteIoerrTruncate({ message, cause });
    case "SQLITE_IOERR_UNLOCK":
      return new SqliteIoerrUnlock({ message, cause });
    case "SQLITE_IOERR_VNODE":
      return new SqliteIoerrVnode({ message, cause });
    case "SQLITE_IOERR_WRITE":
      return new SqliteIoerrWrite({ message, cause });

    // Extended - LOCKED
    case "SQLITE_LOCKED_SHAREDCACHE":
      return new SqliteLockedSharedcache({ message, cause });
    case "SQLITE_LOCKED_VTAB":
      return new SqliteLockedVtab({ message, cause });

    // Extended - NOTICE
    case "SQLITE_NOTICE_RECOVER_ROLLBACK":
      return new SqliteNoticeRecoverRollback({ message, cause });
    case "SQLITE_NOTICE_RECOVER_WAL":
      return new SqliteNoticeRecoverWal({ message, cause });

    // Extended - READONLY
    case "SQLITE_READONLY_CANTINIT":
      return new SqliteReadonlyCantinit({ message, cause });
    case "SQLITE_READONLY_CANTLOCK":
      return new SqliteReadonlyCantlock({ message, cause });
    case "SQLITE_READONLY_DBMOVED":
      return new SqliteReadonlyDbmoved({ message, cause });
    case "SQLITE_READONLY_DIRECTORY":
      return new SqliteReadonlyDirectory({ message, cause });
    case "SQLITE_READONLY_RECOVERY":
      return new SqliteReadonlyRecovery({ message, cause });
    case "SQLITE_READONLY_ROLLBACK":
      return new SqliteReadonlyRollback({ message, cause });

    // Extended - WARNING
    case "SQLITE_WARNING_AUTOINDEX":
      return new SqliteWarningAutoindex({ message, cause });

    // Unknown/default
    default:
      return new SqliteUnknownError({ message, cause, code });
  }
};
