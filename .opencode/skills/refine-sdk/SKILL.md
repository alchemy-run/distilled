---
name: refine-sdk
description: Refine a newly scaffolded Distilled SDK package by reviewing the OpenAPI spec and updating credentials, client error handling, and auth
---

## What I do

When a new SDK package has been scaffolded under `packages/<name>/`, I review the OpenAPI spec and update the boilerplate code to match the actual API:

1. **Credentials** (`src/credentials.ts`) — Set the correct `DEFAULT_API_BASE_URL` and environment variable names based on the spec's `servers` or `host` field. Update the `Config` interface if the API needs more than just an `apiKey`.

2. **Client** (`src/client.ts`) — Update `ApiErrorResponse` schema to match the API's actual error response format. Update `getAuthHeaders` to use the correct auth scheme (Bearer token, API key header, etc.).

3. **Errors** (`src/errors.ts`) — Add custom error classes if the API defines named error types beyond standard HTTP status codes.

## How to determine the correct values

1. **Read the OpenAPI spec** at `packages/<name>/specs/*/specs/openapi.json` (or wherever the spec lives)
2. Look at the `servers` array (OpenAPI 3.x) or `host` + `basePath` (Swagger 2.0) for the base URL
3. Look at `securityDefinitions` / `components.securitySchemes` for the auth scheme
4. Look at error response schemas in `components.schemas` or `definitions` for the error format
5. Look at a few operation responses to see the actual error body shape

## Rules

- Only modify files within `packages/<name>/src/`
- Do NOT create tests
- Do NOT modify files in `packages/core/`
- Do NOT modify CI/workflow files
- Follow the exact patterns used in other SDK packages (neon, planetscale, supabase)
- Use `Schema.TaggedErrorClass` for custom errors
- Use `Category.withServerError`, `Category.withParseError`, etc. for error categorization
- Keep the `makeAPI` call pattern consistent with other packages

## Example: Neon credentials

```typescript
export const DEFAULT_API_BASE_URL = "https://console.neon.tech/api/v2";

export interface Config {
  readonly apiKey: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "NeonCredentials",
) {}
```

## Example: Error response matching

Different APIs have different error shapes. Some examples:

```typescript
// Simple message-only
const ApiErrorResponse = Schema.Struct({
  message: Schema.String,
});

// Code + message
const ApiErrorResponse = Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.String,
});

// Nested error object
const ApiErrorResponse = Schema.Struct({
  error: Schema.Struct({
    type: Schema.String,
    message: Schema.String,
  }),
});
```

## Workspace

Use `.ai-workspace/` for any scratch files you need.
