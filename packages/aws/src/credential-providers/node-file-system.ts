/**
 * A minimal Node `FileSystem` — just what the Node providers and `Auth`
 * read and write under `~/.aws`.
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as PlatformError from "effect/PlatformError";
import { readFile, writeFile } from "node:fs/promises";

const systemError =
  (method: string, path: string) =>
  (cause: unknown): PlatformError.PlatformError =>
    PlatformError.systemError({
      _tag: "Unknown",
      module: "FileSystem",
      method,
      pathOrDescriptor: path,
      cause,
    });

export const nodeFileSystem = FileSystem.makeNoop({
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

export const readFileString = (path: string) =>
  nodeFileSystem.readFileString(path);
