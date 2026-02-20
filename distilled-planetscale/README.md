# distilled-planetscale

A fully typed PlanetScale SDK for [Effect](https://effect.website), generated from the [PlanetScale OpenAPI specification](https://api-docs.planetscale.com/).

## Features

- **Generated from OpenAPI spec** — 1:1 compatibility with PlanetScale APIs
- **Typed errors** — All errors are `TaggedError` classes for pattern matching
- **Effect-native** — All operations return `Effect<A, E, R>` with typed errors
- **Automatic pagination** — Stream pages or items with `.pages()` and `.items()`
- **MySQL & PostgreSQL** — Full support for both database engines

## Installation

```bash
npm install distilled-planetscale effect @effect/platform
# or
bun add distilled-planetscale effect @effect/platform
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as ps from "distilled-planetscale";

const program = Effect.gen(function* () {
  const { organization } = yield* ps.PlanetScaleCredentials;

  // List all databases
  const databases = yield* ps.listDatabases({ organization });

  // Create a new database
  const db = yield* ps.createDatabase({
    organization,
    name: "my-new-database",
    cluster_size: "PS_10",
    kind: "mysql",
  });

  return databases.data;
});

// Compose layers and run
const PlanetScaleLive = Layer.mergeAll(FetchHttpClient.layer, ps.PlanetScaleCredentialsFromEnv);

program.pipe(Effect.provide(PlanetScaleLive), Effect.runPromise);
```

## Importing

Import as a namespace for clean, discoverable APIs:

```typescript
import * as ps from "distilled-planetscale";

// All operations are available via the namespace
ps.listDatabases({ organization: "my-org" });
ps.createBranch({ organization: "my-org", database: "my-db", name: "feature-branch" });
ps.getDeployRequest({ organization: "my-org", database: "my-db", number: "123" });
```

## Configuration

All operations require two context services: `PlanetScaleCredentials` and `HttpClient`.

### Authentication

PlanetScale uses service tokens for API authentication:

```typescript
import * as ps from "distilled-planetscale";

// From environment variables (recommended)
// Reads PLANETSCALE_API_TOKEN and PLANETSCALE_ORGANIZATION
Effect.provide(ps.PlanetScaleCredentialsFromEnv);
```

Set the following environment variables:

```bash
# Format: SERVICE_TOKEN_ID:SERVICE_TOKEN
PLANETSCALE_API_TOKEN=pscale_tkn_xxxxx:pscale_tok_xxxxx
PLANETSCALE_ORGANIZATION=my-org-name
```

### HTTP Client

Requires an HTTP client from `@effect/platform`:

```typescript
import { FetchHttpClient } from "@effect/platform";
// or for Node.js
import { NodeHttpClient } from "@effect/platform-node";

Effect.provide(FetchHttpClient.layer);
// or
Effect.provide(NodeHttpClient.layer);
```

## Complete Examples

### Database Management

```typescript
import { Console, Effect, Layer } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as ps from "distilled-planetscale";

const program = Effect.gen(function* () {
  const { organization } = yield* ps.PlanetScaleCredentials;

  // List all databases
  const databases = yield* ps.listDatabases({ organization });
  yield* Console.log(`Found ${databases.data.length} databases`);

  for (const db of databases.data) {
    yield* Console.log(`  - ${db.name} (${db.kind}, ${db.state})`);
  }

  // Create a new MySQL database
  const newDb = yield* ps.createDatabase({
    organization,
    name: "my-app-db",
    cluster_size: "PS_10",
    kind: "mysql",
  });
  yield* Console.log(`Created database: ${newDb.name}`);

  // Get database details
  const details = yield* ps.getDatabase({
    organization,
    database: "my-app-db",
  });
  yield* Console.log(`Database region: ${details.region.display_name}`);
  yield* Console.log(`Ready: ${details.ready}`);

  // Delete the database
  yield* ps.deleteDatabase({
    organization,
    database: "my-app-db",
  });
  yield* Console.log("Database deleted");
});

const PlanetScaleLive = Layer.mergeAll(FetchHttpClient.layer, ps.PlanetScaleCredentialsFromEnv);

program.pipe(Effect.provide(PlanetScaleLive), Effect.runPromise);
```

### Branch Management

```typescript
import { Console, Effect, Layer } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as ps from "distilled-planetscale";

const program = Effect.gen(function* () {
  const { organization } = yield* ps.PlanetScaleCredentials;
  const database = "my-app-db";

  // List all branches
  const branches = yield* ps.listBranches({ organization, database });
  yield* Console.log(`Found ${branches.data.length} branches`);

  for (const branch of branches.data) {
    yield* Console.log(`  - ${branch.name} (production: ${branch.production})`);
  }

  // Create a development branch
  const newBranch = yield* ps.createBranch({
    organization,
    database,
    name: "feature-user-auth",
    parent_branch: "main",
  });
  yield* Console.log(`Created branch: ${newBranch.name}`);

  // Get branch details
  const branchDetails = yield* ps.getBranch({
    organization,
    database,
    branch: "feature-user-auth",
  });
  yield* Console.log(`Branch ready: ${branchDetails.ready}`);

  // Promote branch to production (after testing)
  yield* ps.promoteBranch({
    organization,
    database,
    branch: "feature-user-auth",
  });
  yield* Console.log("Branch promoted to production");

  // Delete the branch (if not needed)
  yield* ps.deleteBranch({
    organization,
    database,
    branch: "feature-user-auth",
  });
});

const PlanetScaleLive = Layer.mergeAll(FetchHttpClient.layer, ps.PlanetScaleCredentialsFromEnv);

program.pipe(Effect.provide(PlanetScaleLive), Effect.runPromise);
```

### Deploy Requests (Schema Migrations)

```typescript
import { Console, Effect, Layer } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as ps from "distilled-planetscale";

const program = Effect.gen(function* () {
  const { organization } = yield* ps.PlanetScaleCredentials;
  const database = "my-app-db";

  // List open deploy requests
  const deployRequests = yield* ps.listDeployRequests({
    organization,
    database,
    state: "open",
  });
  yield* Console.log(`Found ${deployRequests.data.length} open deploy requests`);

  // Create a deploy request to merge schema changes
  const deployRequest = yield* ps.createDeployRequest({
    organization,
    database,
    branch: "feature-user-auth",
    into_branch: "main",
  });
  yield* Console.log(`Created deploy request #${deployRequest.number}`);

  // Get deploy request status
  const status = yield* ps.getDeployRequest({
    organization,
    database,
    number: deployRequest.number.toString(),
  });
  yield* Console.log(`Deploy state: ${status.state}`);
  yield* Console.log(`Deployable: ${status.deployable}`);

  // Queue the deploy request for deployment
  if (status.deployable) {
    yield* ps.queueDeployRequest({
      organization,
      database,
      number: deployRequest.number.toString(),
    });
    yield* Console.log("Deploy request queued");
  }
});

const PlanetScaleLive = Layer.mergeAll(FetchHttpClient.layer, ps.PlanetScaleCredentialsFromEnv);

program.pipe(Effect.provide(PlanetScaleLive), Effect.runPromise);
```

### Password Management (Connection Credentials)

```typescript
import { Console, Effect, Layer } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as ps from "distilled-planetscale";

const program = Effect.gen(function* () {
  const { organization } = yield* ps.PlanetScaleCredentials;
  const database = "my-app-db";
  const branch = "main";

  // List existing passwords
  const passwords = yield* ps.listPasswords({ organization, database, branch });
  yield* Console.log(`Found ${passwords.data.length} passwords`);

  // Create a new password for an application
  const password = yield* ps.createPassword({
    organization,
    database,
    branch,
    name: "production-api-server",
    role: "readwriter",
  });

  // IMPORTANT: The plain_text password is only returned on creation
  yield* Console.log(`Password created: ${password.name}`);
  yield* Console.log(`Username: ${password.username}`);
  yield* Console.log(`Password: ${password.plain_text}`); // Save this securely!
  yield* Console.log(`Host: ${password.database_branch.access_host_url}`);

  // Delete a password when no longer needed
  yield* ps.deletePassword({
    organization,
    database,
    branch,
    password_id: password.id,
  });
});

const PlanetScaleLive = Layer.mergeAll(FetchHttpClient.layer, ps.PlanetScaleCredentialsFromEnv);

program.pipe(Effect.provide(PlanetScaleLive), Effect.runPromise);
```

## Error Handling

All operations return typed errors that can be pattern-matched:

```typescript
import { Effect } from "effect";
import * as ps from "distilled-planetscale";

const program = ps
  .getDatabase({
    organization: "my-org",
    database: "missing-db",
  })
  .pipe(
    Effect.catchTags({
      GetDatabaseNotfound: (error) => Effect.succeed({ found: false, message: error.message }),
      PlanetScaleApiError: (error) =>
        Effect.fail(new Error(`API error: ${JSON.stringify(error.body)}`)),
      PlanetScaleParseError: (error) => Effect.fail(new Error(`Parse error: ${error.cause}`)),
    }),
  );
```

### Error Types

| Error Type                | Description                              |
| ------------------------- | ---------------------------------------- |
| `{Operation}Unauthorized` | Authentication failed (401)              |
| `{Operation}Forbidden`    | Permission denied (403)                  |
| `{Operation}Notfound`     | Resource not found (404)                 |
| `PlanetScaleApiError`     | Uncatalogued API error (body: unknown)   |
| `PlanetScaleParseError`   | Schema validation failure (body + cause) |
| `ConfigError`             | Missing configuration                    |

### Error Categories

Errors are classified into categories for easier handling:

```typescript
import * as ps from "distilled-planetscale";

// Access categories via ps.Category
ps.Category.isAuthError(error);
```

| Category             | Description                                      |
| -------------------- | ------------------------------------------------ |
| `AuthError`          | Authentication/authorization failures (401, 403) |
| `BadRequestError`    | Invalid request parameters (400)                 |
| `ConflictError`      | Resource state conflicts (409)                   |
| `NotFoundError`      | Resource not found (404)                         |
| `QuotaError`         | Quota/limit exceeded                             |
| `ThrottlingError`    | Rate limiting (429)                              |
| `ServerError`        | PlanetScale service errors (5xx)                 |
| `NetworkError`       | Network/transport failures                       |
| `ParseError`         | Response parsing failures                        |
| `ConfigurationError` | Missing configuration                            |

#### Category Predicates

Use predicates with `Effect.retry`:

```typescript
import { Effect } from "effect";
import * as ps from "distilled-planetscale";

const program = ps
  .createDatabase({
    organization: "my-org",
    name: "my-db",
    cluster_size: "PS_10",
  })
  .pipe(
    Effect.retry({
      times: 3,
      while: ps.Category.isThrottlingError,
    }),
  );
```

Available predicates: `isAuthError`, `isNotFoundError`, `isConflictError`, `isThrottlingError`, `isServerError`, `isTransientError`.

#### Catch by Category

```typescript
import { Effect } from "effect";
import * as ps from "distilled-planetscale";

const program = ps
  .getDatabase({
    organization: "my-org",
    database: "my-db",
  })
  .pipe(ps.Category.catchNotFoundError((err) => Effect.succeed({ fallback: true })));

// Or catch multiple categories
const program2 = ps
  .getDatabase({
    organization: "my-org",
    database: "my-db",
  })
  .pipe(
    ps.Category.catchErrors(ps.Category.NotFoundError, ps.Category.AuthError, (err) =>
      Effect.succeed({ fallback: true }),
    ),
  );
```

## Pagination

Paginated operations expose `.pages()` and `.items()` methods for automatic pagination.

### Stream Full Pages with `.pages()`

```typescript
import { Effect, Stream } from "effect";
import * as ps from "distilled-planetscale";

const program = Effect.gen(function* () {
  const { organization } = yield* ps.PlanetScaleCredentials;

  // Stream all pages
  const allDatabases = yield* ps.listDatabases.pages({ organization }).pipe(
    Stream.flatMap((page) => Stream.fromIterable(page.data)),
    Stream.runCollect,
  );

  console.log(`Found ${allDatabases.length} databases across all pages`);
});
```

### Stream Individual Items with `.items()`

```typescript
import { Effect, Stream } from "effect";
import * as ps from "distilled-planetscale";

const program = Effect.gen(function* () {
  const { organization } = yield* ps.PlanetScaleCredentials;

  // Stream individual branches
  const productionBranches = yield* ps.listBranches.items({ organization, database: "my-db" }).pipe(
    Stream.filter((branch) => branch.production),
    Stream.runCollect,
  );

  console.log(`Found ${productionBranches.length} production branches`);
});
```

---

## Architecture

### Code Generation

Operations are generated by [`scripts/generate-operations.ts`](./scripts/generate-operations.ts) from the [PlanetScale OpenAPI specification](https://api-docs.planetscale.com/). The generator:

1. Fetches and caches the OpenAPI spec via `scripts/setup.ts`
2. Uses Claude AI to analyze operations and generate Effect Schema definitions
3. Applies JSON patches from `specs/*.patch.json` to fix spec discrepancies
4. Outputs TypeScript files to [`src/operations/`](./src/operations/)

```bash
# Fetch latest spec
bun run setup

# Generate all operations
bun run generate
```

### HTTP Traits as Annotations

HTTP binding traits are modeled as Schema annotations in [`src/client.ts`](./src/client.ts):

| Trait           | Annotation      | Purpose                               |
| --------------- | --------------- | ------------------------------------- |
| HTTP Method     | `ApiMethod`     | GET, POST, PUT, PATCH, DELETE         |
| Path Template   | `ApiPath`       | URL path with parameter substitution  |
| Path Parameters | `ApiPathParams` | Parameters extracted from path        |
| Error Code      | `ApiErrorCode`  | Maps API error codes to error classes |

### Generated Code Example

Input schemas include HTTP binding annotations:

```typescript
export const ListDatabasesInput = Schema.Struct({
  organization: Schema.String,
  q: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).annotate({
  [ApiMethod]: "GET",
  [ApiPath]: (input) => `/organizations/${input.organization}/databases`,
  [ApiPathParams]: ["organization"] as const,
});
```

Error schemas use the `ApiErrorCode` annotation:

```typescript
export class ListDatabasesNotfound extends Schema.TaggedErrorClass<ListDatabasesNotfound>()(
  "ListDatabasesNotfound",
  {
    organization: Schema.String,
    message: Schema.String,
  },
  { [ApiErrorCode]: "not_found" },
) {}
```

Operations tie input, output, and errors together:

```typescript
export const listDatabases = API.make(() => ({
  inputSchema: ListDatabasesInput,
  outputSchema: ListDatabasesOutput,
  errors: [ListDatabasesUnauthorized, ListDatabasesForbidden, ListDatabasesNotfound],
}));
```

### Request Flow

```
Input → client.ts → Extract path/query/body params
      → Add Authorization header
      → HttpClient → Execute request
      → Match error by code → Schema decode → Effect<Output, Error>
```

## Testing

```bash
# Run all tests
bun vitest run

# Run tests in watch mode
bun vitest

# Run a specific test file
bun vitest run ./tests/listDatabases.test.ts
```

Tests require PlanetScale credentials. Set the following environment variables:

```bash
export PLANETSCALE_API_TOKEN="pscale_tkn_xxx:pscale_tok_xxx"
export PLANETSCALE_ORGANIZATION="your-org-name"
```

## Development

```bash
# Type check
bun run typecheck

# Lint
bun run lint

# Format
bun run format
```

## Available Operations

### Organizations

- `listOrganizations` - List all organizations
- `getOrganization` - Get organization details
- `updateOrganization` - Update organization settings
- `listAuditLogs` - List organization audit logs
- `listRegionsForOrganization` - List available regions

### Databases

- `listDatabases` - List all databases
- `createDatabase` - Create a new database
- `getDatabase` - Get database details
- `updateDatabaseSettings` - Update database settings
- `deleteDatabase` - Delete a database
- `listDatabaseRegions` - List database regions

### Branches

- `listBranches` - List all branches
- `createBranch` - Create a new branch
- `getBranch` - Get branch details
- `deleteBranch` - Delete a branch
- `promoteBranch` - Promote branch to production
- `demoteBranch` - Demote branch from production
- `getBranchSchema` - Get branch schema
- `lintBranchSchema` - Lint branch schema

### Deploy Requests

- `listDeployRequests` - List deploy requests
- `createDeployRequest` - Create a deploy request
- `getDeployRequest` - Get deploy request details
- `queueDeployRequest` - Queue deploy request
- `closeDeployRequest` - Close deploy request
- `cancelDeployRequest` - Cancel deploy request

### Passwords

- `listPasswords` - List passwords
- `createPassword` - Create a password
- `getPassword` - Get password details
- `updatePassword` - Update password
- `deletePassword` - Delete a password
- `renewPassword` - Renew password

### Backups

- `listBackups` - List backups
- `createBackup` - Create a backup
- `getBackup` - Get backup details
- `updateBackup` - Update backup
- `deleteBackup` - Delete a backup

### Webhooks

- `listWebhooks` - List webhooks
- `createWebhook` - Create a webhook
- `getWebhook` - Get webhook details
- `updateWebhook` - Update webhook
- `deleteWebhook` - Delete a webhook
- `testWebhook` - Test a webhook

### Service Tokens

- `listServiceTokens` - List service tokens
- `createServiceToken` - Create a service token
- `getServiceToken` - Get service token details
- `deleteServiceToken` - Delete a service token

### And many more...

See the [index.ts](./index.ts) for the complete list of available operations.

## License

MIT
