import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
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
  writeFileString: (path, data, options) =>
    Effect.tryPromise({
      try: () => writeFile(path, data, { flag: options?.flag, mode: options?.mode }),
      catch: systemError("writeFileString", path),
    }),
  chmod: (path, mode) =>
    Effect.tryPromise({
      try: () => chmod(path, mode),
      catch: systemError("chmod", path),
    }),
  makeDirectory: (path, options) =>
    Effect.tryPromise({
      try: () => mkdir(path, { recursive: options?.recursive, mode: options?.mode }),
      catch: systemError("makeDirectory", path),
    }).pipe(Effect.asVoid),
});

export const readFileString = (path: string) => nodeFileSystem.readFileString(path);
