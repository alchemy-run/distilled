import { Tool, Toolkit } from "@effect/ai";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import { replace } from "../util/replace.ts";

export const edit = Tool.make("AnthropicTextEditor", {
  description: `Performs exact string replacements in files. 

Usage:
- You must use your \`Read\` tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file. 
- When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appears AFTER the line number prefix. The line number prefix format is: spaces + line number + tab. Everything after that tab is the actual file content to match. Never include any part of the line number prefix in the oldString or newString.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- The edit will FAIL if \`oldString\` is not found in the file with an error "oldString not found in content".
- The edit will FAIL if \`oldString\` is found multiple times in the file with an error "oldString found multiple times and requires more code context to uniquely identify the intended match". Either provide a larger string with more surrounding context to make it unique or use \`replaceAll\` to change every instance of \`oldString\`. 
- Use \`replaceAll\` for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.
`,
  parameters: {
    filePath: S.String.annotations({
      description: "The absolute path to the file to modify",
    }),
    oldString: S.String.annotations({
      description: "The text to replace",
    }),
    newString: S.String.annotations({
      description:
        "The text to replace it with (must be different from oldString)",
    }),
    replaceAll: S.Boolean.annotations({
      description: "Replace all occurrences of oldString (default false)",
    }),
  },
  success: S.String,
  failure: S.Never,
});

export const editTooklit = Toolkit.make(edit);

export const editTooklitLayer = editTooklit.toLayer(
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;

    return {
      AnthropicTextEditor: Effect.fn(function* (params) {
        const {
          filePath: _filePath,
          oldString,
          newString,
          replaceAll,
        } = params;

        yield* Effect.logDebug(
          `[edit] filePath=${_filePath} oldString.length=${oldString.length} newString.length=${newString.length} replaceAll=${replaceAll}`,
        );

        const filePath = path.isAbsolute(_filePath)
          ? _filePath
          : path.join(process.cwd(), _filePath);

        if (oldString === "") {
          // Creating a new file
          const writeResult = yield* fs
            .writeFileString(filePath, newString)
            .pipe(
              Effect.map(() => `Created file: ${filePath}`),
              Effect.catchAll((e) =>
                Effect.succeed(`Failed to create file: ${e}`),
              ),
            );
          return writeResult;
        }

        const stat = yield* fs
          .stat(filePath)
          .pipe(Effect.catchAll(() => Effect.succeed(null)));

        if (!stat) {
          return `File not found: ${filePath}`;
        }

        if (stat.type === "Directory") {
          return `Path is a directory, not a file: ${filePath}`;
        }

        const oldContent = yield* fs
          .readFileString(filePath)
          .pipe(
            Effect.catchAll((e) => Effect.succeed(`Failed to read file: ${e}`)),
          );

        // Check if we got an error message from reading
        if (oldContent.startsWith("Failed to read")) {
          return oldContent;
        }

        const replaceResult = yield* replace(
          oldContent,
          oldString,
          newString,
          replaceAll,
        ).pipe(
          Effect.catchTag("ReplaceSameStringError", () =>
            Effect.succeed("oldString and newString must be different"),
          ),
          Effect.catchTag("ReplaceNotFoundError", (e) =>
            Effect.succeed(
              `Could not find oldString in file. The text "${e.oldString.slice(0, 100)}${e.oldString.length > 100 ? "..." : ""}" was not found in ${filePath}.`,
            ),
          ),
          Effect.catchTag("ReplaceMultipleMatchesError", (e) =>
            Effect.succeed(
              `Found multiple matches for oldString "${e.oldString.slice(0, 50)}${e.oldString.length > 50 ? "..." : ""}". Provide more surrounding context to identify the correct match, or use replaceAll=true to replace all occurrences.`,
            ),
          ),
        );

        // If we got an informative message back (not actual file content), return it
        if (
          replaceResult.startsWith("Could not find") ||
          replaceResult.startsWith("Found multiple") ||
          replaceResult.startsWith("oldString and newString")
        ) {
          return replaceResult;
        }

        const writeResult = yield* fs
          .writeFileString(filePath, replaceResult)
          .pipe(
            Effect.map(() => `Edited file: ${filePath}`),
            Effect.catchAll((e) =>
              Effect.succeed(`Failed to write file: ${e}`),
            ),
          );

        return writeResult;
      }),
    };
  }),
);
