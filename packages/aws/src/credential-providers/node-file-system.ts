import { readFile, writeFile } from "node:fs/promises";
/**
 * A minimal Node `FileSystem` -- just what the Node providers and `Auth`
 * read and write under `~/.aws`.
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as PlatformError from "effect/PlatformError";

const systemErrorTag = (code: string | undefined): PlatformError.SystemErrorTag => {
  switch (code) {
    case "ENOENT":
    case "ENOTDIR":
      return "NotFound";
    case "EACCES":
    case "EPERM":
      return "PermissionDenied";
    case "EEXIST":
      return "AlreadyExists";
    case "EISDIR":
      return "BadResource";
    default:
      return "Unknown";
  }
};

const systemError =
  (method: string, path: string) =>
  (cause: unknown): PlatformError.PlatformError => {
    const { code, syscall } = (cause ?? {}) as NodeJS.ErrnoException;
    return PlatformError.systemError({
      _tag: systemErrorTag(code),
      module: "FileSystem",
      method,
      syscall,
      pathOrDescriptor: path,
      cause,
    });
  };

export const nodeFileSystem = /*@__PURE__*/ FileSystem.makeNoop({
  readFileString: (path) =>
    Effect.tryPromise({
      try: () => readFile(path, "utf8"),
      catch: systemError("readFileString", path),
    }),
  writeFileString: (path, data) =>
    Effect.tryPromise({
      try: () => writeFile(path, data),
      catch: systemError("writeFileString", path),
    }),
});

export const readFileString = (path: string) => nodeFileSystem.readFileString(path);
