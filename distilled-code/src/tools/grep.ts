import { Tool, Toolkit } from "@effect/ai";
import * as Command from "@effect/platform/Command";
import { CommandExecutor } from "@effect/platform/CommandExecutor";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as S from "effect/Schema";
import { Scope } from "effect/Scope";
import { exec } from "../util/exec.ts";

const MAX_LINE_LENGTH = 2000;

export const grep = Tool.make("grep", {
  description: `- Fast content search tool that works with any codebase size
- Searches file contents using regular expressions
- Supports full regex syntax (eg. "log.*Error", "function\\s+\\w+", etc.)
- Filter files by pattern with the include parameter (eg. "*.js", "*.{ts,tsx}")
- Returns file paths and line numbers with at least one match sorted by modification time
- Use this tool when you need to find files containing specific patterns
- If you need to identify/count the number of matches within files, use the Bash tool with \`rg\` (ripgrep) directly. Do NOT use \`grep\`.
- When you are doing an open-ended search that may require multiple rounds of globbing and grepping, use the Task tool instead
`,
  dependencies: [CommandExecutor, Scope],
  parameters: {
    pattern: S.String.annotations({
      description: "The regex pattern to search for in file contents",
    }),
    path: S.optional(S.String).annotations({
      description:
        "The directory to search in. Defaults to the current working directory.",
    }),
    // include: S.optional(S.String).annotations({
    //   description:
    //     'File pattern to include in the search (e.g. "*.js", "*.{ts,tsx}")',
    // }),
  },
  success: S.String,
  failure: S.Never,
});

export const grepTooklit = Toolkit.make(grep);

export const grepTooklitLayer = grepTooklit.toLayer(
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    return {
      grep: (args: { readonly pattern: string; readonly path?: string }) =>
        Effect.gen(function* () {
          const { pattern, path } = args;
          yield* Effect.logDebug(`[grep] pattern=${pattern} path=${path}`);

          // TODO: add include once effect/ai supports non-strict schemas
          const include = undefined;
          const searchPath = path || process.cwd();

          const rgArgs = [
            "-nH",
            "--field-match-separator=|",
            "--regexp",
            pattern,
          ];
          if (include) {
            rgArgs.push("--glob", include);
          }
          rgArgs.push(searchPath);

          const { stdout, stderr, exitCode } = yield* Command.make(
            "rg",
            ...rgArgs,
          ).pipe(Command.stdout("pipe"), Command.stderr("pipe"), exec);

          if (exitCode === 1) {
            return `No matches found for pattern "${pattern}" in ${searchPath}`;
          } else if (exitCode !== 0) {
            return `ripgrep failed with exit code ${exitCode}: ${stderr}`;
          }

          const lines = stdout.split(/\r?\n/);
          const matches: {
            path: string;
            modTime: number;
            lineNum: number;
            lineText: string;
          }[] = [];

          for (const line of lines) {
            if (!line) continue;

            const [filePath, lineNumStr, ...lineTextParts] = line.split("|");
            if (!filePath || !lineNumStr || lineTextParts.length === 0)
              continue;

            const lineNum = parseInt(lineNumStr, 10);
            const lineText = lineTextParts.join("|");

            const stats = yield* fs
              .stat(filePath)
              .pipe(Effect.catchAll(() => Effect.succeed(null)));
            if (!stats) continue;

            const modTime = stats.mtime.pipe(Option.getOrUndefined);
            if (!modTime) continue;
            matches.push({
              path: filePath,
              modTime: modTime.getTime(),
              lineNum,
              lineText,
            });
          }

          matches.sort((a, b) => b.modTime - a.modTime);

          const limit = 100;
          const truncated = matches.length > limit;
          const finalMatches = truncated ? matches.slice(0, limit) : matches;

          if (finalMatches.length === 0) {
            return `No matches found for pattern "${pattern}" in ${searchPath}`;
          }

          const outputLines = [`Found ${finalMatches.length} matches`];

          let currentFile = "";
          for (const match of finalMatches) {
            if (currentFile !== match.path) {
              if (currentFile !== "") {
                outputLines.push("");
              }
              currentFile = match.path;
              outputLines.push(`${match.path}:`);
            }
            const truncatedLineText =
              match.lineText.length > MAX_LINE_LENGTH
                ? match.lineText.substring(0, MAX_LINE_LENGTH) + "..."
                : match.lineText;
            outputLines.push(`  Line ${match.lineNum}: ${truncatedLineText}`);
          }

          if (truncated) {
            outputLines.push("");
            outputLines.push(
              "(Results are truncated. Consider using a more specific path or pattern.)",
            );
          }

          return outputLines.join("\n");
        }).pipe(
          Effect.catchAll((e) => Effect.succeed(`Grep search failed: ${e}`)),
        ),
    };
  }),
);
