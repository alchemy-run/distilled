# distilled-coinbase

An Effect-based TypeScript client for the Coinbase Developer Platform (CDP) APIs.

## Setup

```bash
bun install
```

Create a `.env` file with your Coinbase CDP credentials:

```
COINBASE_API_KEY_ID=<your-api-key-id>
COINBASE_API_KEY_SECRET=<your-es256-private-key>
COINBASE_WALLET_SECRET=<optional-wallet-secret-for-sensitive-ops>
```

## Scripts

| Script             | Description                                       |
| ------------------ | ------------------------------------------------- |
| `bun run generate` | Generate operations from OpenAPI spec              |
| `bun run typecheck`| Type check with tsgo                               |
| `bunx vitest run`  | Run tests                                          |

## Project Structure

```
├── src/
│   ├── index.ts            # Main barrel file for src modules
│   ├── client.ts           # API.make/makePaginated factory + JWT auth + shared error types
│   ├── category.ts         # Error categories for semantic error handling
│   ├── credentials.ts      # Credentials service + layer (API key + wallet secret)
│   ├── errors.ts           # Global error types (NotFound, Unauthorized, etc.)
│   ├── pagination.ts       # Cursor-based pagination (pageToken/nextPageToken)
│   ├── retry.ts            # Retry policy configuration
│   ├── sensitive.ts        # Sensitive data schemas (private keys, tokens)
│   ├── traits.ts           # HTTP/API trait annotations
│   └── operations/         # All generated operations
│       ├── index.ts            # Barrel file for all operations
│       ├── listEvmAccounts.ts  # listEvmAccounts operation
│       └── ...
├── tests/
│   ├── setup.ts            # Loads .env, exports MainLayer for tests
│   └── *.test.ts           # Test files
├── spec/
│   ├── openapi.json              # Coinbase CDP OpenAPI 3.1 spec
│   └── *.patch.json              # JSON Patch files for spec fixes
├── scripts/
│   ├── generate-operations.ts    # Generates operations from OpenAPI spec
│   └── apply-patches.ts         # JSON Patch (RFC 6902) implementation
└── index.ts                # Root barrel file re-exporting src
```

## Authentication

The Coinbase CDP API uses JWT Bearer authentication:

1. **CDP API Key** (`apiKeyAuth`): A JWT signed with your CDP API Key Secret (ES256).
   - Set via `COINBASE_API_KEY_ID` and `COINBASE_API_KEY_SECRET` env vars.
   - Required for ALL API operations.

2. **Wallet Auth** (`X-Wallet-Auth`): A JWT signed with your Wallet Secret.
   - Set via `COINBASE_WALLET_SECRET` env var.
   - Required for sensitive wallet operations (POST/DELETE on EVM and Solana Account APIs).
   - Operations that need this are automatically annotated with `walletAuth: true`.

## API Operation Pattern

Operations are defined declaratively using `API.make`. Each operation specifies which errors it can return via the `errors` tuple, plus default errors that apply to all operations.

```typescript
import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEvmAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/accounts/{address}" }));
export type GetEvmAccountInput = typeof GetEvmAccountInput.Type;

// Output Schema
export const GetEvmAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  // ... other fields
});
export type GetEvmAccountOutput = typeof GetEvmAccountOutput.Type;

// Define the operation
export const getEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetEvmAccountInput,
  outputSchema: GetEvmAccountOutput,
}));
```

### Wallet Auth Operations

Operations that require the `X-Wallet-Auth` header use the `walletAuth` flag:

```typescript
export const createEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateEvmAccountInput,
  outputSchema: CreateEvmAccountOutput,
  walletAuth: true,
}));
```

### Error System

Operations have two types of errors:

1. **Default Errors** - Apply to ALL operations automatically:
   - `Unauthorized` - Authentication failure (401)
   - `RateLimitExceeded` - Rate limiting (429)
   - `InternalServerError` - Server error (500)
   - `BadGateway` - Bad gateway (502)
   - `ServiceUnavailable` - Service unavailable (503)

2. **Operation-Specific Errors** - Declared per-operation via `errors` tuple:
   - `NotFound` - Resource not found (404)
   - `Forbidden` - Access denied (403)
   - `AlreadyExists` - Resource conflict (409)
   - `InvalidRequest` - Bad request (400)
   - And many more (see `src/errors.ts`)

3. **Client Errors** - Always possible for any operation:
   - `CoinbaseApiError` - Fallback for unknown API error types
   - `CoinbaseParseError` - Schema validation failures
   - `HttpClientError` - Network/connection errors

### Error Classes

All error classes are defined in `src/errors.ts`. Coinbase uses `errorType` field (string enum) to identify errors:

| Error Class                        | API errorType                         | Category              |
| ---------------------------------- | ------------------------------------- | --------------------- |
| `Unauthorized`                     | `unauthorized`                        | `AuthError`           |
| `Forbidden`                        | `forbidden`                           | `AuthError`           |
| `NotFound`                         | `not_found`                           | `NotFoundError`       |
| `AlreadyExists`                    | `already_exists`                      | `ConflictError`       |
| `InvalidRequest`                   | `invalid_request`                     | `BadRequestError`     |
| `RateLimitExceeded`                | `rate_limit_exceeded`                 | `ThrottlingError`     |
| `InternalServerError`              | `internal_server_error`               | `ServerError`         |
| `BadGateway`                       | `bad_gateway`                         | `ServerError`         |
| `ServiceUnavailable`               | `service_unavailable`                 | `ServerError`         |
| `TimedOut`                         | `timed_out`                           | `TimeoutError`        |
| `PaymentMethodRequired`            | `payment_method_required`             | `PaymentRequiredError`|
| `FaucetLimitExceeded`              | `faucet_limit_exceeded`               | `ThrottlingError`     |
| `AccountLimitExceeded`             | `account_limit_exceeded`              | `QuotaError`          |
| `PolicyViolation`                  | `policy_violation`                    | `PolicyError`         |
| `PolicyInUse`                      | `policy_in_use`                       | `ConflictError`       |
| `MfaRequired`                      | `mfa_required`                        | `MfaError`            |

## Pagination

Coinbase uses cursor-based pagination with `pageToken`/`nextPageToken`:

```typescript
import { Effect, Stream } from "effect";
import { listEvmAccounts, paginatePages, paginateItems } from "distilled-coinbase";

// Stream all pages (full response objects)
const allPages = paginatePages(listEvmAccounts, {});

// Stream individual items
const allAccounts = paginateItems(listEvmAccounts, {});

// Consume the stream
const program = allAccounts.pipe(
  Stream.tap((account) => Effect.log(`Account: ${account.address}`)),
  Stream.runDrain,
);
```

## Schema Patching

When the OpenAPI spec has discrepancies with the actual API behavior, use JSON Patch files to fix the spec during generation.

### Patch File Format

Patches use the [JSON Patch (RFC 6902)](https://tools.ietf.org/html/rfc6902) format. Create a `.patch.json` file in the `spec/` directory:

```json
{
  "description": "Brief description of what this patch fixes",
  "patches": [
    {
      "op": "replace",
      "path": "/components/schemas/SomeSchema/properties/field/type",
      "value": "string"
    },
    {
      "op": "add",
      "path": "/components/schemas/SomeSchema/properties/field/nullable",
      "value": true
    }
  ]
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

- `/components/schemas/EvmAccount/required` - the required array
- `/components/schemas/EvmAccount/properties/name/type` - a property's type
- `/paths/~1v2~1evm~1accounts/get/responses/200` - a response (note `~1` escapes `/`)

## Operation Generation

```bash
bun run generate
```

The generator:

1. Reads the OpenAPI 3.1 spec from `spec/openapi.json`
2. Applies all `.patch.json` files from `spec/`
3. Generates Effect Schema types with HTTP trait annotations for each operation
4. Writes operation files to `src/operations/`
5. Updates `src/operations/index.ts` barrel file

## Usage

```typescript
import { FetchHttpClient } from "@effect/platform";
import { Effect, Layer } from "effect";
import { listEvmAccounts, Credentials, CredentialsFromEnv } from "distilled-coinbase";

const MainLayer = Layer.merge(CredentialsFromEnv, FetchHttpClient.layer);

const program = Effect.gen(function* () {
  const accounts = yield* listEvmAccounts({});
  console.log(accounts);
}).pipe(
  Effect.catchTag("NotFound", (e) => Effect.log(`Not found: ${e.message}`)),
  Effect.provide(MainLayer),
);

Effect.runPromise(program);
```

## Tools

- **Runtime**: Bun
- **Type checking**: tsgo
- **Testing**: vitest + @effect/vitest
- **Framework**: Effect + @effect/platform
- **JWT**: jose (ES256 signing for CDP auth)
