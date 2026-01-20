# distilled-code

> See [../AGENTS.md](../AGENTS.md) for ecosystem overview and shared TDD patterns.

Programmatic coding agent library. Simple CLI to run agents with prompts.

## CLI Usage

```bash
# Send a prompt to all agents
distilled "implement the API endpoints"

# Send a prompt to agents matching a pattern
distilled "api/*" "implement the API endpoints"
distilled "test/*" "write tests for all modules"

# List all configured agents
distilled --list

# List agents matching a pattern
distilled --list "api/*"

# Use a specific config file
distilled -c ./my.config.ts "implement the API"

# Use a different model
distilled -m claude-opus "implement the API"
```

## Configuration

Create a `distilled.config.ts` in your project:

```typescript
import { defineConfig, agent } from "distilled-code";

export default defineConfig({
  name: "my-project",
  model: "claude-sonnet",
  agents: [
    agent("api/listTodos", { description: "Implements GET /todos" }),
    agent("api/getTodo", { description: "Implements GET /todos/:id" }),
    agent("api/createTodo", { description: "Implements POST /todos" }),
    agent("test/unit", { description: "Writes unit tests" }),
  ],
});
```

## Core API

```typescript
import { spawn } from "distilled-code";
import { CodingTools } from "distilled-code/tools";

// Spawn an agent - persists to .distilled/{key}.json
const agent = yield* spawn("api/listTodos", {
  toolkit: CodingTools,
  onText: (delta) => process.stdout.write(delta),
});

// Send prompts
yield* agent.send("Read the API spec and implement GET /todos");
yield* agent.send("Now add pagination support");  // Continues conversation
```

## Persistence

All messages stream to disk:

```
.distilled/
├── api/
│   ├── listTodos.json
│   ├── getTodo.json
│   └── createTodo.json
└── test/
    └── unit.json
```

Keys are paths. Nested keys create directories.

## Available Tools

| Tool    | Description                                |
| ------- | ------------------------------------------ |
| `read`  | Read file contents                         |
| `write` | Write file contents                        |
| `edit`  | Edit existing files with smart replacement |
| `glob`  | Find files by pattern                      |
| `grep`  | Search file contents                       |
| `bash`  | Execute shell commands                     |
| `spawn` | Spawn parallel sub-agents                  |

## Tool Error Handling Convention

**Philosophy**: LLMs benefit from **information**, not exceptions. Most "errors" are actually helpful data the LLM can use to adjust its approach.

### Return as Success (Informative Content)

Always return these as success strings - the LLM can act on this information:

- **File not found** with suggestions: `"File not found: foo.ts. Did you mean?\nbar.ts\nbaz.ts"`
- **No matches found**: `"No matches found for pattern \"xyz\" in /path"`
- **Command output** (including failures): `"Command failed: npm ERR! ..."`
- **Edit failures**: `"Could not find oldString in file..."` or `"Found multiple matches..."`
- **Directory instead of file**: `"Cannot read directory as a file: /path\nContents:\nfile1.ts\nfile2.ts"`
- **Security violations**: `"Security violation: Cannot rm file outside cwd"`

### Never Use Failure Channel

Tools must use `failure: S.Never` in their Tool definition. The @effect/ai toolkit type system doesn't compose well with typed failures, and returning errors as success strings provides better LLM experience anyway.

```typescript
// ✅ CORRECT: Use S.Never for failure, return informative strings
export const myTool = Tool.make("myTool", {
  success: S.String,
  failure: S.Never,  // Always S.Never
  // ...
});

// In implementation - catch errors and return as success
const result = yield* someOperation().pipe(
  Effect.catchAll((e) => Effect.succeed(`Operation failed: ${e}`)),
);
```

### Internal Tagged Errors

Use tagged errors internally for structured error handling between utility functions and tool implementations:

```typescript
// src/util/replace.ts - internal tagged errors
export class ReplaceNotFoundError extends S.TaggedError<ReplaceNotFoundError>()(
  "ReplaceNotFoundError",
  { oldString: S.String },
) {}

// src/tools/edit.ts - catch and convert to success string
const result = yield* replace(content, old, new).pipe(
  Effect.catchTag("ReplaceNotFoundError", (e) =>
    Effect.succeed(`Could not find oldString: "${e.oldString.slice(0, 50)}..."`),
  ),
);
```

### Message Formatting

- **No prefixes**: Don't use `[ERROR]` or `[SUCCESS]` prefixes
- **Be specific**: Include context like file paths, patterns, what was searched
- **Provide suggestions**: When a file isn't found, suggest similar files
- **Be concise**: One clear message, not verbose explanations

```typescript
// ✅ Good
return `File not found: ${filePath}`;
return `No matches found for pattern "${pattern}" in ${searchPath}`;
return `Edited file: ${filePath}`;

// ❌ Bad
return `[ERROR] File not found: ${filePath}`;
return `[SUCCESS] The file was successfully written to: ${filePath}`;
return `Error occurred while trying to find the file`;
```

## Agent Implementation

### `src/agent.ts`

```typescript
import * as Chat from "@effect/ai/Chat";
import { FileSystem, Path } from "@effect/platform";
import { Effect, Stream } from "effect";

export const spawn = (key: string, options: SpawnOptions) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const pathService = yield* Path.Path;
    const { toolkit, onText } = options;

    const sessionPath = pathService.join(".distilled", `${key}.json`);

    // Load existing session or create empty chat
    const existingJson = yield* fs.readFileString(sessionPath).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    );
    const chat = existingJson
      ? yield* Chat.fromJson(existingJson)
      : yield* Chat.empty;

    const send = (prompt: string) =>
      Effect.gen(function* () {
        let finalText = "";
        let isFirst = true;

        while (true) {
          const stream = chat.streamText({
            toolkit,
            prompt: isFirst ? prompt : "Continue",
          });
          isFirst = false;

          yield* Stream.runForEach(stream, (part) =>
            Effect.gen(function* () {
              if (part.type === "text-delta" && onText) {
                finalText += part.delta;
                onText(part.delta);
              }
              if (part.type === "finish" && part.reason !== "tool-calls") {
                return;
              }
            }),
          );
        }

        // Persist history
        yield* fs.writeFileString(sessionPath, yield* chat.exportJson);
        return finalText;
      });

    return { key, send };
  });
```

## Architecture

```
distilled-code/
├── bin/
│   └── distilled.ts          # CLI entry point
├── src/
│   ├── agent.ts              # Agent definition + spawn function
│   ├── config.ts             # Config types and loading
│   ├── tools/                # Tool definitions
│   │   ├── index.ts          # Merged toolkit + exports
│   │   ├── errors.ts         # Tagged error types
│   │   ├── bash.ts           # Execute shell commands
│   │   ├── read.ts           # Read files
│   │   ├── write.ts          # Write files
│   │   ├── edit.ts           # Edit files
│   │   ├── glob.ts           # Find files
│   │   ├── grep.ts           # Search content
│   │   └── spawn.ts          # Sub-agents
│   └── util/
│       ├── replace.ts        # Edit replacement logic
│       └── wildcard.ts       # Glob pattern matching
├── test/
│   ├── test.ts               # Test helper
│   ├── agent.test.ts         # Agent evals
│   └── fixtures/
│       └── math.ts           # Source for testing
└── .distilled/               # Persisted sessions
```

## Development

```bash
# Install dependencies
bun install

# Run tests
bun vitest run

# Run specific test
bun vitest run -t "generates test file"

# Type check
bun tsgo -b

# Run the CLI
bun run bin/distilled.ts --list
bun run bin/distilled.ts "api/*" "implement the endpoints"
```

## Environment

```bash
ANTHROPIC_API_KEY=xxx    # Required for Claude-based agents
DEBUG=1                  # Enable debug logging
```

## Parallel Agents

The CLI runs agents sequentially by default. For programmatic parallel execution:

```typescript
import { spawn } from "distilled-code";
import { CodingTools } from "distilled-code/tools";

const services = ["s3", "ec2", "dynamodb", "lambda", "sqs"];

yield* Effect.all(
  services.map((svc) =>
    Effect.gen(function* () {
      const agent = yield* spawn(`discover/${svc}`, { toolkit: CodingTools });
      yield* agent.send(`Discover missing errors for ${svc}`);
    }),
  ),
  { concurrency: 5 },
);
```

Each agent streams to its own JSON file independently.
