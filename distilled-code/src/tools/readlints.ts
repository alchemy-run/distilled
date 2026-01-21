import { Tool, Toolkit } from "@effect/ai";
import * as Path from "@effect/platform/Path";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import { LSPManager } from "../lsp/index.ts";
import { formatDiagnostic } from "../services/diagnostics.ts";

export const readLints = Tool.make("readlints", {
  description: `Read and display linter errors from the workspace.

- If a file path is provided, returns diagnostics for that file only
- If a directory path is provided, returns diagnostics for all files within that directory
- If no paths are provided, returns diagnostics for all files in the workspace
- This tool can return linter errors that were already present before your edits, so avoid calling it with a very wide scope of files
- NEVER call this tool on a file unless you've edited it or are about to edit it
`,
  parameters: {
    paths: S.optional(S.Array(S.String)).annotations({
      description:
        "Optional array of paths to files or directories to read linter errors for. If not provided, returns diagnostics for all files in the workspace.",
    }),
  },
  success: S.String,
  failure: S.Never,
});

export const readLintsToolkit = Toolkit.make(readLints);

export const readLintsToolkitLayer = readLintsToolkit.toLayer(
  Effect.gen(function* () {
    const pathService = yield* Path.Path;
    const lspManager = yield* LSPManager;

    return {
      readlints: Effect.fn(function* ({ paths }) {
        yield* Effect.logDebug(`[ReadLints] paths=${JSON.stringify(paths)}`);

        const resolvedPaths = (paths ?? []).map((p) =>
          pathService.isAbsolute(p) ? p : pathService.join(process.cwd(), p),
        );

        // Get diagnostics for each path
        const allDiagnostics = yield* Effect.forEach(
          resolvedPaths,
          (filePath) =>
            lspManager
              .getDiagnostics(filePath)
              .pipe(Effect.map((diags) => ({ filePath, diags }))),
          { concurrency: "unbounded" },
        );

        // Format output grouped by file
        const results: string[] = [];
        for (const { filePath, diags } of allDiagnostics) {
          if (diags.length > 0) {
            results.push(`${filePath}:`);
            for (const d of diags) {
              results.push(`  ${formatDiagnostic(d)}`);
            }
          }
        }

        yield* Effect.logDebug(
          `[ReadLints] found ${results.length} files with diagnostics`,
        );

        if (results.length === 0) {
          return resolvedPaths.length > 0
            ? `No linter errors found in specified paths`
            : `No linter errors found`;
        }

        return results.join("\n");
      }),
    };
  }),
);
