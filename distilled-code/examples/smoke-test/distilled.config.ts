import * as Effect from "effect/Effect";
import { agent, defineConfig } from "../../src/config.ts";
import { Toolkit } from "../../src/tools/index.ts";

// typically a spec would be loaded from a file, but we just hard-code for an example
export const operations = [
  {
    id: "listTodos",
    method: "GET",
    path: "/todos",
    description: "List all todos",
  },
  {
    id: "getTodo",
    method: "GET",
    path: "/todos/:id",
    description: "Get a todo by ID",
  },
  {
    id: "createTodo",
    method: "POST",
    path: "/todos",
    description: "Create a new todo",
  },
  {
    id: "updateTodo",
    method: "PUT",
    path: "/todos/:id",
    description: "Update a todo",
  },
  {
    id: "deleteTodo",
    method: "DELETE",
    path: "/todos/:id",
    description: "Delete a todo",
  },
];

export default defineConfig({
  name: "api-gen",
  model: "claude-opus-4-5",
  agents: Effect.sync(() =>
    operations.map((op) =>
      agent(`api/${op.id}`, {
        toolkit: Toolkit.Coding,
        tags: ["api", op.method.toLowerCase()],
        description: `You implement the ${op.id} operation for a Hono Todo API.

Your task:
1. Create ./src/routes/${op.id}.ts - the Hono route handler
2. Create ./src/routes/${op.id}.test.ts - unit tests using vitest
3. Create (or Update) ./src/store.ts if you need shared types or store methods

Operation: ${op.method} ${op.path}
Description: ${op.description}

The store file (./src/store.ts) contains an in-memory Todo store.
If it doesn't exist or needs new methods, create/update it.

Route file structure:
\`\`\`typescript
import { Hono } from "hono";
import { store } from "../store";

const app = new Hono();
app.${op.method.toLowerCase()}("${op.path}", (c) => { /* ... */ });
export default app;
\`\`\`

Test file structure:
\`\`\`typescript
import { describe, it, expect, beforeEach } from "vitest";
import app from "./${op.id}";

describe("${op.method} ${op.path}", () => {
  // tests
});
\`\`\``,
      }),
    ),
  ),
});
