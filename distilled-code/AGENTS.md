# distilled-code

> See [../AGENTS.md](../AGENTS.md) for ecosystem overview and shared TDD patterns.

Programmatic coding agent library. One function: `agent(key, prompt)`.

## Core API

```typescript
import { agent } from "distilled-code";

// Run an agent - persists to .distilled/{key}.json
yield* agent("discover/s3", "Discover missing errors for S3.GetObject");
```

The `agent` function:
1. Loads chat history from `.distilled/{key}.json` (or creates new)
2. Sends the prompt with the configured toolkit
3. Streams until completion, handling tool calls
4. Persists updated history
5. Returns the response

## Context

`agent` runs in the context of:
- **Chat** - message history and LLM access (via `Chat.layerPersisted`)
- **Toolkit** - available tools

```typescript
import { agent } from "./agent.ts";
import { toolkit, toolkitLayer } from "./tools/index.ts";

const program = Effect.gen(function* () {
  yield* agent("discover/s3", "Find missing errors");
  yield* agent("discover/s3", "Now check PutObject");  // Continues conversation
}).pipe(
  Effect.provide(toolkitLayer),
  Effect.provide(Chat.layerPersisted({ storeId: "chat", toolkit })),
  Effect.provide(modelLayer),
);
```

## Persistence

All messages stream to disk:

```
.distilled/
├── discover/
│   ├── s3.json
│   └── ec2.json
└── test/
    └── math.json
```

Keys are paths. Nested keys create directories.

## Available Tools

| Tool | Description |
|------|-------------|
| `read` | Read file contents |
| `write` | Write file contents |
| `edit` | Edit existing files with smart replacement |
| `glob` | Find files by pattern |
| `grep` | Search file contents |
| `spawn` | Spawn parallel sub-agents |

## Testing

### Eval: Generate Test Files

The primary eval tests the agent's ability to generate test files from source code.

```bash
# Run the test generation eval
bun vitest run -t "generates test file"
```

This test:
1. Provides the agent with a source file (`test/fixtures/math.ts`)
2. Asks it to generate a comprehensive test file
3. Verifies the generated tests contain proper coverage

### Example Output

The agent successfully generates tests like:

```typescript
// test/fixtures/math.test.ts (generated)
import { describe, it, expect } from 'vitest';
import { add, multiply, factorial, isPrime, fibonacci } from './math';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  // ... 33 comprehensive tests
});
```

### Running Generated Tests

```bash
bun vitest run test/fixtures/math.test.ts
# ✓ 33 tests passed
```

## Implementation

### `src/agent.ts`

```typescript
import * as Chat from "@effect/ai/Chat";
import { FileSystem, Path } from "@effect/platform";
import { Effect, Stream } from "effect";
import { toolkit } from "./tools/index.ts";

export const agent = (
  key: string,
  prompt: string,
  options: AgentOptions = {},
) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const pathService = yield* Path.Path;
    const chat = yield* Chat.fromPrompt(initialMessages);

    // Execute prompt with tool loop
    while (true) {
      const stream = chat.streamText({
        toolkit,
        prompt: isFirst ? prompt : "Continue",
      });

      yield* Stream.runForEach(stream, handlePart);

      if (finishReason !== "tool-calls") break;
    }

    // Persist history
    yield* fs.writeFileString(sessionPath, JSON.stringify({ messages }));
    return finalText;
  });
```

### `test/test.ts`

Test helper that provides the full Effect context:

```typescript
import { it } from "@effect/vitest";
import * as Chat from "@effect/ai/Chat";
import { toolkit, toolkitLayer } from "../src/tools/index.ts";

export function test(name: string, options: { timeout?: number }, testCase: TestCase) {
  return it.scopedLive(name, (ctx) => {
    return provideTestEnv(effect);
  }, options.timeout ?? 120_000);
}

function provideTestEnv(effect) {
  return effect.pipe(
    Effect.provide(toolkitLayer),
    Effect.provide(Chat.layerPersisted({ storeId: "test", toolkit })),
    Effect.provide(modelLayer),
    Effect.provide(platform),
  );
}
```

## Architecture

```
distilled-code/
├── src/
│   ├── index.ts              # CLI entry
│   ├── agent.ts              # Core agent function
│   ├── tools/                # Tool definitions
│   │   ├── index.ts          # Merged toolkit
│   │   ├── read.ts           # Read files
│   │   ├── write.ts          # Write files
│   │   ├── edit.ts           # Edit files
│   │   ├── glob.ts           # Find files
│   │   ├── grep.ts           # Search content
│   │   └── spawn.ts          # Sub-agents
│   └── tui/                  # Terminal UI (future)
├── test/
│   ├── test.ts               # Test helper
│   ├── agent.test.ts         # Agent evals
│   └── fixtures/
│       ├── math.ts           # Source for testing
│       └── math.test.ts      # Generated tests
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

# Run generated tests
bun vitest run test/fixtures/math.test.ts

# Type check
bun tsgo -b
```

## Environment

```bash
ANTHROPIC_API_KEY=xxx    # Required for Claude-based agents
DEBUG=1                  # Enable debug logging
```

## CLI (Future)

```bash
# Send prompt to an agent
bun run code "discover/s3" "Find missing errors"

# Send to multiple agents (glob)
bun run code "discover/*" "Summarize your findings"

# List all agents
bun run code --list

# Run TUI
bun run code tui
```

## Parallel Agents

Run many agents in parallel:

```typescript
const services = ["s3", "ec2", "dynamodb", "lambda", "sqs"];

yield* Effect.all(
  services.map((svc) =>
    agent(`discover/${svc}`, `Discover missing errors for ${svc}`),
  ),
  { concurrency: 5 },
);
```

Each agent streams to its own JSON file independently.

## Meta-Agent

An agent that operates over other agents:

```typescript
yield* agent("meta", "List all discovery agents and summarize their findings");
```

| Tool | Description |
|------|-------------|
| `list` | List agents matching a glob pattern |
| `read` | Read message history from an agent |
| `send` | Send a prompt to agents matching a pattern |
