# distilled-planetscale

An Effect-based TypeScript client for the PlanetScale API.

## Setup

```bash
bun install
```

Create a `.env` file with your PlanetScale credentials:

```
PLANETSCALE_API_TOKEN=<SERVICE_TOKEN_ID>:<SERVICE_TOKEN>
PLANETSCALE_ORGANIZATION=<your-org-name>
```

## Scripts

| Script                           | Description                                        |
| -------------------------------- | -------------------------------------------------- |
| `bun run setup`                  | Fetch the latest PlanetScale OpenAPI spec          |
| `bun run generate`               | Generate operations from OpenAPI spec using Claude |
| `bun run typecheck`              | Type check with tsgo                               |
| `bunx vitest run`                | Run tests                                          |
| `bun run scripts/write-tests.ts` | Auto-generate tests for unchecked operations       |

## Project Structure

```
├── src/
│   ├── index.ts            # Main barrel file for src modules
│   ├── client.ts           # API.make/makePaginated factory + shared error types
│   ├── category.ts         # Error categories for semantic error handling
│   ├── credentials.ts      # PlanetScaleCredentials service + layer
│   ├── errors.ts           # Global error types (NotFound, Unauthorized, etc.)
│   ├── pagination.ts       # paginatePages/paginateItems stream utilities
│   ├── retry.ts            # Retry policy configuration
│   ├── sensitive.ts        # Sensitive data schemas (passwords, tokens)
│   ├── traits.ts           # HTTP/API trait annotations
│   └── operations/         # All Operations
│       ├── index.ts            # Barrel file for all operations
│       ├── getOrganization.ts  # getOrganization operation
│       └── listDatabases.ts    # listDatabases effect
├── tests/
│   ├── setup.ts            # Loads .env, exports withMainLayer for tests
│   ├── helpers.ts          # Test database helpers (MySqlTestDatabase, PostgresTestDatabase)
│   ├── getOrganization.test.ts
│   └── listDatabases.test.ts
├── specs/
│   ├── openapi.json              # PlanetScale OpenAPI spec (generated)
│   └── *.patch.json              # JSON Patch files for spec fixes
├── scripts/
│   ├── setup.ts            # Fetches PlanetScale OpenAPI spec
│   ├── generate-operations.ts  # Generates operations from OpenAPI spec
│   └── write-tests.ts      # Auto-generates tests using opencode
└── index.ts                # Root barrel file re-exporting src
```

## Package Exports

The package provides multiple entry points for tree-shaking and targeted imports:

| Export Path                         | Description                     |
| ----------------------------------- | ------------------------------- |
| `distilled-planetscale`             | Main entry - all exports        |
| `distilled-planetscale/Category`    | Error categories and predicates |
| `distilled-planetscale/Client`      | API factory and error types     |
| `distilled-planetscale/Credentials` | Credentials service and layers  |
| `distilled-planetscale/Errors`      | Base error types                |
| `distilled-planetscale/Operations`  | All API operations              |
| `distilled-planetscale/Pagination`  | Pagination utilities            |
| `distilled-planetscale/Retry`       | Retry policy configuration      |
| `distilled-planetscale/Sensitive`   | Sensitive data schemas          |
| `distilled-planetscale/Traits`      | HTTP/API trait annotations      |

### Import Examples

```typescript
// Import everything from main entry
import { getOrganization, Category, Retry } from "distilled-planetscale";

// Import specific modules for tree-shaking
import * as Category from "distilled-planetscale/Category";
import * as Retry from "distilled-planetscale/Retry";
import { SensitiveString } from "distilled-planetscale/Sensitive";

// Import all operations
import * as Operations from "distilled-planetscale/Operations";
```

## API Operation Pattern

Operations are defined declaratively using `API.make`. Each operation specifies which errors it can return via the `errors` tuple, plus default errors that apply to all operations.

```typescript
import * as Schema from "effect/Schema";
import { API } from "../client";
import { NotFound, Forbidden } from "../errors";
import * as T from "../traits";

// Input Schema
export const GetDatabaseInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/organizations/{organization}/databases/{database}" }));
export type GetDatabaseInput = typeof GetDatabaseInput.Type;

// Output Schema
export const GetDatabaseOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  // ... other fields
});
export type GetDatabaseOutput = typeof GetDatabaseOutput.Type;

// Define the operation with operation-specific errors
export const getDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetDatabaseInput,
  outputSchema: GetDatabaseOutput,
  errors: [NotFound, Forbidden] as const,  // Operation-specific errors
}));
```

### Error System

Operations have two types of errors:

1. **Default Errors** - Apply to ALL operations automatically:
   - `Unauthorized` - Authentication failure (401)
   - `TooManyRequests` - Rate limiting (429)
   - `InternalServerError` - Server error (500)
   - `ServiceUnavailable` - Service unavailable (503)

2. **Operation-Specific Errors** - Declared per-operation via `errors` tuple:
   - `NotFound` - Resource not found (404)
   - `Forbidden` - Access denied (403)
   - `Conflict` - Resource conflict (409)
   - `UnprocessableEntity` - Validation error (422)
   - `BadRequest` - Invalid request (400)

3. **Client Errors** - Always possible for any operation:
   - `PlanetScaleApiError` - Fallback for unknown API error codes
   - `PlanetScaleParseError` - Schema validation failures
   - `HttpClientError` - Network/connection errors

### Error Classes

All error classes are defined in `src/errors.ts`:

| Error Class           | API Error Code          | Category          |
| --------------------- | ----------------------- | ----------------- |
| `Unauthorized`        | `unauthorized`          | `AuthError`       |
| `Forbidden`           | `forbidden`             | `AuthError`       |
| `NotFound`            | `not_found`             | `NotFoundError`   |
| `Conflict`            | `conflict`              | `ConflictError`   |
| `UnprocessableEntity` | `unprocessable_entity`  | `BadRequestError` |
| `BadRequest`          | `bad_request`           | `BadRequestError` |
| `TooManyRequests`     | `too_many_requests`     | `ThrottlingError` |
| `InternalServerError` | `internal_server_error` | `ServerError`     |
| `ServiceUnavailable`  | `service_unavailable`   | `ServerError`     |

The client automatically maps API error codes to these global error classes.

## Error Handling

- **Annotated errors** - Use `ApiErrorCode` symbol to map error classes to API error codes
- **`PlanetScaleApiError`** - Generic fallback for unhandled API error codes (body: unknown)
- **`PlanetScaleParseError`** - Schema validation failures (body + cause)
- **`HttpClientError`** - Network/connection errors from @effect/platform

## Error Categories

Errors can be annotated with categories for semantic grouping and handling. Categories are defined in `src/category.ts` and allow you to catch errors by type rather than specific class.

### Available Categories

| Category             | Description                                      | Built-in Errors                                                                        |
| -------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `AuthError`          | Authentication/authorization failures (401, 403) | `Unauthorized`, `Forbidden`                                                            |
| `BadRequestError`    | Invalid request parameters (400, 422)            | `BadRequest`, `UnprocessableEntity`                                                    |
| `ConflictError`      | Resource conflicts (409)                         | `Conflict`                                                                             |
| `NotFoundError`      | Resource not found (404)                         | `NotFound`                                                                             |
| `QuotaError`         | Quota/limit exceeded                             | -                                                                                      |
| `ServerError`        | Server-side errors (5xx)                         | `InternalServerError`, `ServiceUnavailable`, `PlanetScaleApiError`, `PlanetScaleError` |
| `ThrottlingError`    | Rate limiting (429)                              | `TooManyRequests`                                                                      |
| `NetworkError`       | Connection/network failures                      | -                                                                                      |
| `ParseError`         | Response parsing failures                        | `PlanetScaleParseError`                                                                |
| `ConfigurationError` | Missing configuration                            | `ConfigError`                                                                          |
| `TimeoutError`       | Request timed out                                | -                                                                                      |
| `RetryableError`     | General retryable marker                         | -                                                                                      |

### Retryable Trait

In addition to categories, errors can be marked as retryable using `withRetryable()`. This is separate from categories and indicates the error should be automatically retried:

```typescript
import { Schema } from "effect";
import * as Category from "./category";

// Standard retryable error
export class TransientError extends Schema.TaggedError<TransientError>()(
  "TransientError",
  { message: Schema.String },
).pipe(Category.withServerError, Category.withRetryable()) {}

// Throttling error (uses longer backoff)
export class RateLimitError extends Schema.TaggedError<RateLimitError>()(
  "RateLimitError",
  { message: Schema.String },
).pipe(Category.withThrottlingError, Category.withRetryable({ throttling: true })) {}
```

Built-in retryable errors:

- `TooManyRequests` - marked with `withRetryable({ throttling: true })`
- `InternalServerError` - marked with `withRetryable()`
- `ServiceUnavailable` - marked with `withRetryable()`

### Adding Categories to Errors

Global errors already have categories applied. If you need custom errors with categories, use `withCategory` or convenience decorators with `.pipe()`:

```typescript
import { Schema } from "effect";
import * as Category from "./category";

// Custom error with multiple categories
export class ValidationError extends Schema.TaggedError<ValidationError>()("ValidationError", {
  field: Schema.String,
  message: Schema.String,
}).pipe(Category.withBadRequestError) {}
```

### Catching Errors by Category

```typescript
import { Effect } from "effect";
import { Category } from "distilled-planetscale";

// Catch a single category
const program = getOrganization({ organization: "test" }).pipe(
  Category.catchNotFoundError((err) => Effect.succeed({ fallback: true })),
);

// Catch multiple categories
const program2 = getOrganization({ organization: "test" }).pipe(
  Category.catchErrors(Category.NotFoundError, Category.AuthError, (err) =>
    Effect.succeed({ fallback: true }),
  ),
);
```

### Category Predicates

Use predicates for retry logic or conditional handling:

```typescript
import { Category } from "distilled-planetscale";

// Individual predicates
Category.isAuthError(error); // true if has AuthError category
Category.isNotFoundError(error); // true if has NotFoundError category
Category.isServerError(error); // true if has ServerError category

// Transient errors (good for retry logic)
Category.isTransientError(error); // true if ThrottlingError | ServerError | NetworkError

// Use with Effect.retry
const program = myOperation().pipe(
  Effect.retry({
    times: 3,
    while: Category.isTransientError,
  }),
);
```

## Usage

```typescript
import { FetchHttpClient } from "@effect/platform";
import { Effect, Layer } from "effect";
import { getOrganization, NotFound, Credentials, CredentialsLive } from "distilled-planetscale";

const MainLayer = Layer.merge(CredentialsLive, FetchHttpClient.layer);

const program = Effect.gen(function* () {
  const { organization } = yield* Credentials;
  const org = yield* getOrganization({ organization });
  console.log(org);
}).pipe(
  Effect.catchTag("NotFound", (e) => Effect.log(`Resource not found: ${e.message}`)),
  Effect.provide(MainLayer),
);

Effect.runPromise(program);
```

## Pagination

Paginated operations can be consumed as Effect Streams using the `paginatePages` and `paginateItems` utilities, or by using `API.makePaginated` to create operations with built-in `.pages()` and `.items()` methods.

### Using paginatePages / paginateItems

```typescript
import { Effect, Stream } from "effect";
import { listDatabases, paginatePages, paginateItems } from "distilled-planetscale";

// Stream all pages (full response objects)
const allPages = paginatePages(listDatabases, { organization: "my-org" });

// Stream individual items
const allDatabases = paginateItems(listDatabases, { organization: "my-org" });

// Consume the stream
const program = allDatabases.pipe(
  Stream.tap((db) => Effect.log(`Database: ${db.name}`)),
  Stream.runDrain,
);
```

### Using API.makePaginated

Operations created with `API.makePaginated` have `.pages()` and `.items()` methods attached:

```typescript
import { Schema } from "effect";
import { API, ApiMethod, ApiPath, ApiPathParams } from "distilled-planetscale";

// Define input/output schemas
const ListDatabasesInput = Schema.Struct({
  organization: Schema.String,
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).annotations({
  [ApiMethod]: "GET",
  [ApiPath]: (input) => `/organizations/${input.organization}/databases`,
  [ApiPathParams]: ["organization"] as const,
});

const ListDatabasesOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(DatabaseSchema),
});

// Create paginated operation - NO errors array, errors are global
const listDatabases = API.makePaginated(() => ({
  inputSchema: ListDatabasesInput,
  outputSchema: ListDatabasesOutput,
}));

// Usage:
// Single page
const page1 = listDatabases({ organization: "my-org" });

// Stream all pages
const allPages = listDatabases.pages({ organization: "my-org" });

// Stream all items
const allDatabases = listDatabases.items({ organization: "my-org" });
```

### Pagination Trait

PlanetScale uses page-based pagination with the following structure:

| Field                   | Type           | Description                                |
| ----------------------- | -------------- | ------------------------------------------ |
| `page` (input)          | number         | 1-indexed page number                      |
| `per_page` (input)      | number         | Number of items per page                   |
| `current_page` (output) | number         | Current page number                        |
| `next_page` (output)    | number \| null | Next page number, or null if no more pages |
| `data` (output)         | array          | Array of items for the current page        |

The default pagination trait is:

```typescript
const DefaultPaginationTrait = {
  inputToken: "page",
  outputToken: "next_page",
  items: "data",
  pageSize: "per_page",
};
```

Custom pagination traits can be passed to `paginatePages`/`paginateItems` or configured in `API.makePaginated`.

## Operation Generation

The `generate` script uses the Claude CLI to automatically generate operations from the OpenAPI spec:

```bash
# Ensure the Claude CLI is installed and authenticated
bun run generate
```

The generator:

1. Uses Claude Haiku (via CLI) to analyze the OpenAPI spec and discover all operations
2. Compares against existing operations and tests in `src/operations/` and `tests/`
3. Uses Claude Opus (via CLI) to generate missing operations and tests
4. Runs tests after generation - if tests fail, the generated files are cleaned up
5. Updates `index.ts` with new exports

## Test Generation

The `write-tests.ts` script uses opencode to automatically generate tests for operations listed in `todo-tests.md`:

```bash
# Generate tests for all unchecked operations
bun run scripts/write-tests.ts

# Generate tests for a limited number of operations
bun run scripts/write-tests.ts --limit 5
bun run scripts/write-tests.ts -l 1
```

### How it works

1. Reads `todo-tests.md` and extracts all unchecked operations (lines matching `- [ ] operationName`)
2. For each operation, spawns an opencode instance (using `claude-opus-4-5`) with a prompt to write a test
3. After opencode completes, marks the operation as complete in `todo-tests.md` (changes `- [ ]` to `- [x]`)
4. Commits the changes with message `chore(tests): test for <operation-name>`
5. Repeats for the next operation

The script processes operations sequentially (one at a time) and logs progress with clear separators between each operation.

## Testing Guidelines

- **Resource cleanup**: Tests must always clean up any resources they create (databases, branches, passwords, etc.). Use `Effect.ensuring` or cleanup in a finally block to guarantee cleanup runs even if the test fails.
- **Unique names**: Use timestamps or random suffixes for resource names to avoid conflicts between test runs.

### Test Structure

Each operation test file should include:

1. **Schema validation tests** - Verify input/output schemas have expected fields
2. **Success tests** - Test the happy path (for GET operations that don't modify state)
3. **Error handling tests** - Test that typed errors are returned correctly

### Test File Template

Tests use the `withMainLayer` helper from `./setup` which automatically provides `PlanetScaleCredentials` and `FetchHttpClient` to all `it.effect` tests:

```typescript
import { Effect } from "effect";
import { expect } from "vitest";
import { Credentials } from "../src/credentials";
import { NotFound, Forbidden } from "../src/errors";
import {
  operationName,
  OperationNameInput,
  OperationNameOutput,
} from "../src/operations/operationName";
import { withMainLayer } from "./setup";

withMainLayer("operationName", (it) => {
  // Schema validation
  it("should have the correct input schema", () => {
    expect(OperationNameInput.fields.organization).toBeDefined();
    // ... verify other required fields
  });

  it("should have the correct output schema", () => {
    expect(OperationNameOutput.fields.id).toBeDefined();
    // ... verify other expected fields
  });

  // Success test (for read-only operations)
  it.effect("should fetch data successfully", () =>
    Effect.gen(function* () {
      const { organization } = yield* Credentials;
      const result = yield* operationName({ organization /* ... */ }).pipe(
        // Handle case where test resource doesn't exist
        Effect.catchTag("NotFound", () =>
          Effect.succeed({
            /* fallback shape */
          }),
        ),
      );
      expect(result).toHaveProperty("expectedField");
    }),
  );

  // Error handling tests
  it.effect("should return NotFound for non-existent resource", () =>
    Effect.gen(function* () {
      const result = yield* operationName({
        organization: "this-org-definitely-does-not-exist-12345",
        database: "this-database-definitely-does-not-exist-12345",
      }).pipe(
        Effect.matchEffect({
          onFailure: (error) => Effect.succeed(error),
          onSuccess: () => Effect.succeed(null),
        }),
      );

      // API may return NotFound or Forbidden for non-existent resources
      const isExpectedError = result instanceof NotFound || result instanceof Forbidden;
      expect(isExpectedError).toBe(true);
      if (result instanceof NotFound) {
        expect(result._tag).toBe("NotFound");
        expect(result.message).toBeDefined();
      }
    }),
  );
});
```

### Resource Cleanup Pattern

For operations that create resources, use `Effect.ensuring` to guarantee cleanup:

```typescript
it.effect("should create resource successfully", () =>
  Effect.gen(function* () {
    const { organization } = yield* Credentials;
    const resourceName = `test-resource-${Date.now()}`;

    const result = yield* createResource({
      organization,
      name: resourceName,
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name", resourceName);
  }).pipe(
    Effect.ensuring(
      Effect.gen(function* () {
        const { organization } = yield* Credentials;
        yield* deleteResource({
          organization,
          name: resourceName,
        }).pipe(Effect.ignore);
      }),
    ),
  ),
);
```

### Best Practices

- **Use `Effect.ignore`** for cleanup operations that may fail (resource already deleted, etc.)
- **Use `Effect.catchTag`** to handle expected errors gracefully in success tests
- **Use `Effect.matchEffect`** to capture errors for assertion in error tests
- **Test both non-existent resources AND non-existent organizations** for not_found errors
- **Verify error properties** like `_tag`, `message`, etc.
- **Import `./setup`** to load environment variables from `.env`
- **Use `withMainLayer`** wrapper to automatically provide layer to all tests
- **Use test database helpers** when tests require a database (see below)

### Test Database Helpers

For operations that require an existing database (branches, passwords, deploy requests, etc.), use the scoped test database helpers from `tests/helpers.ts`. These create a database once per test suite and clean it up when the suite ends.

#### Available Helpers

| Helper                     | Service Tag            | Database Name             |
| -------------------------- | ---------------------- | ------------------------- |
| `MySqlTestDatabaseLive`    | `MySqlTestDatabase`    | `distilled-test-mysql`    |
| `PostgresTestDatabaseLive` | `PostgresTestDatabase` | `distilled-test-postgres` |

#### Usage with @effect/vitest

Use the `layer()` function from `@effect/vitest` to provide the test database:

```typescript
import { layer } from "@effect/vitest";
import { Effect } from "effect";
import { expect } from "vitest";
import { MySqlTestDatabaseLive, MySqlTestDatabase } from "./helpers";
import { listBranches } from "../src/operations/listBranches";

layer(MySqlTestDatabaseLive)("listBranches", (it) => {
  it.effect("should list branches for the test database", () =>
    Effect.gen(function* () {
      const db = yield* MySqlTestDatabase;
      const result = yield* listBranches({
        organization: db.organization,
        database: db.name,
      });
      expect(result.data).toBeDefined();
    }),
  );
});
```

#### How It Works

1. **Deterministic names**: Uses fixed database names so the same database is reused across test runs
2. **Scoped lifecycle**: Database is created when the layer is built, deleted when released
3. **Waits for ready**: Polls until the database state is "ready" before returning
4. **Includes dependencies**: `*Live` layers include `CredentialsFromEnv` and `FetchHttpClient`

#### When to Use

Use test database helpers when testing operations that:

- Require a `database` parameter (branches, passwords, deploy requests, etc.)
- Need to create resources within a database
- Would otherwise need to create and clean up a database per test

Do NOT use for:

- Simple operations like `getOrganization`, `listDatabases`
- Error handling tests with non-existent resources

## Schema Patching

When the OpenAPI spec has discrepancies with the actual API behavior, use JSON Patch files to fix the spec during generation.

### Patch File Format

Patches use the [JSON Patch (RFC 6902)](https://tools.ietf.org/html/rfc6902) format. Create a `.patch.json` file in the `specs/` directory:

```json
{
  "description": "Brief description of what this patch fixes",
  "patches": [
    {
      "op": "replace",
      "path": "/definitions/SomeSchema/properties/field/type",
      "value": "string"
    },
    {
      "op": "add",
      "path": "/definitions/SomeSchema/properties/field/x-nullable",
      "value": true
    },
    {
      "op": "remove",
      "path": "/definitions/SomeSchema/required/2"
    }
  ]
}
```

### Supported Operations

| Operation | Description                               |
| --------- | ----------------------------------------- |
| `add`     | Add a new property or array element       |
| `remove`  | Remove a property or array element        |
| `replace` | Replace an existing value                 |
| `move`    | Move a value from one location to another |
| `copy`    | Copy a value to a new location            |
| `test`    | Test that a value matches (fails if not)  |

### Common Patches

**Make a field optional** (remove from required array):

```json
{
  "op": "replace",
  "path": "/definitions/Schema/required",
  "value": ["field1", "field2"]
}
```

**Make a field nullable** (add x-nullable extension):

```json
{
  "op": "add",
  "path": "/definitions/Schema/properties/fieldName/x-nullable",
  "value": true
}
```

**Change a field type**:

```json
{
  "op": "replace",
  "path": "/definitions/Schema/properties/fieldName/type",
  "value": "string"
}
```

### Applying Patches

Patches are automatically applied when running `bun run generate`. You can also test patches standalone:

```bash
bun run scripts/apply-patches.ts
```

### JSON Pointer Syntax

Paths use [JSON Pointer (RFC 6901)](https://tools.ietf.org/html/rfc6901) syntax:

- `/` separates path segments
- `~0` escapes `~` characters
- `~1` escapes `/` characters
- Array indices are numbers (e.g., `/required/0`)
- `-` refers to the end of an array (for `add` operations)

Example paths:

- `/definitions/Organization/required` - the required array
- `/definitions/Organization/properties/name/type` - a property's type
- `/paths/~1organizations~1{organization}/get/responses/200` - a response (note `~1` escapes `/`)

## Tools

- **Runtime**: Bun
- **Type checking**: tsgo
- **Testing**: vitest + @effect/vitest
- **Framework**: Effect + @effect/platform
