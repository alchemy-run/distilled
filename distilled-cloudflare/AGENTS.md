# distilled-cloudflare

> See [../AGENTS.md](../AGENTS.md) for ecosystem overview and shared TDD patterns.

Effect-native Cloudflare SDK generated from the [Cloudflare TypeScript SDK](https://github.com/cloudflare/cloudflare-typescript) source code.

## Commands

```bash
bun generate                              # Generate all services
bun generate --service r2                 # Generate single service
bun vitest run ./test/services/r2.test.ts # Run tests
bun tsc -b                                # Type check
```

## Architecture

```
cloudflare-typescript/src/resources/*.ts → Generator → src/services/*.ts → Runtime
              ↓                               ↓              ↓               ↓
        SDK Source Code            spec/{service}.json  Schemas + Traits  Response Parser
```

**Generator:** `scripts/generate-from-sdk.ts`

1. Parses TypeScript AST from `cloudflare-typescript/src/resources/`
2. Extracts operations from SDK class methods (get, post, put, patch, delete)
3. Resolves types from SDK params/response interfaces
4. Loads error definitions from `spec/{service}.json`
5. Generates Effect Schema request/response types with trait annotations
6. Outputs to `src/services/{service}.ts`

## Key Files

| File | Purpose |
|------|---------|
| `scripts/generate-from-sdk.ts` | Code generator (parses SDK source) |
| `spec/{service}.json` | Error definitions and per-operation error assignments |
| `src/services/{service}.ts` | Generated client (DO NOT EDIT) |
| `src/client/request-builder.ts` | Builds HTTP requests from annotated schemas |
| `src/client/response-parser.ts` | Parses responses and matches errors |
| `src/traits.ts` | Schema annotations for HTTP bindings and error matching |
| `src/schemas.ts` | Common schemas (file uploads, etc.) |
| `test/services/{service}.test.ts` | Tests that drive error discovery |

## Traits

HTTP bindings and error matching as Schema annotations:

| Trait | Purpose |
|-------|---------|
| `T.HttpPath(name)` | Path parameter |
| `T.HttpQuery(name)` | Query parameter |
| `T.HttpHeader(name)` | Header |
| `T.JsonName(name)` | JSON serialization key (for camelCase → snake_case) |
| `T.Http({ method, path, contentType? })` | Operation-level HTTP metadata |
| `T.HttpFormDataFile()` | File upload in multipart form |
| `T.HttpErrorCode(code)` | Match error by single code |
| `T.HttpErrorCodes([...])` | Match error by multiple codes |
| `T.HttpErrorStatus(status)` | Match error by HTTP status |
| `T.HttpErrorMessage(pattern)` | Match error by message substring |

## Error Patching

When you see `UnknownCloudflareError`:

1. Extract the error code from the failure:
   ```bash
   DEBUG=1 bun vitest run ./test/services/r2.test.ts -t "CORS"
   ```

2. Add to `spec/{service}.json`:
   ```json
   {
     "errors": {
       "NoSuchBucket": { "code": 10006, "status": 404 },
       "NoCorsConfiguration": { "code": 10059 }
     },
     "operations": {
       "getBucketCorsPolicy": {
         "errors": { "NoSuchBucket": {}, "NoCorsConfiguration": {} }
       }
     }
   }
   ```

3. Regenerate: `bun generate --service {service}`

**Error Matching Options:**

| Field | Description |
|-------|-------------|
| `code` | Single Cloudflare error code |
| `codes` | Array of codes that map to the same error |
| `status` | HTTP status code (for disambiguation) |
| `message` | Substring match on error message |

**Matching priority:** code + status + message > code + status > code only

## Generator Details

### Naming Conventions

The generator automatically:
- Converts `snake_case` params to `camelCase` (with `T.JsonName` for serialization)
- Maps HTTP verbs: `update` → `put` (when no create exists), `edit` → `patch`
- Handles bulk operations: `bulkDelete` → `batchDelete`
- Deduplicates consecutive segments: `CreateOperationOperation` → `CreateOperation`
- Pluralizes batch resources: `batchDeleteOperations`

### File Uploads

When the SDK uses `Core.Uploadable` types, the generator:
1. Detects file parameters in body
2. Generates `UploadableSchema.pipe(T.HttpFormDataFile())` 
3. Adds `contentType: "multipart"` to the `T.Http` trait
4. TypeScript type becomes `File | Blob`

### Generator Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `unknown` type in output | SDK type not resolved | Improve type resolution in `typeNodeToTypeInfo` |
| Wrong property name | camelCase conversion issue | Fix `toCamelCase` or naming logic |
| Missing trait | Parameter location not detected | Update param extraction logic |
| Schema/interface mismatch | `typeInfoToSchema` and `typeInfoToTsType` diverge | Apply same fix to both |

## Testing Protocol

### Test Organization

Tests are organized by API operation:

```typescript
describe("Workers", () => {
  describe("listWorkers", () => {
    test("happy path - lists workers in account", () =>
      Effect.gen(function* () {
        const result = yield* Workers.listWorkers({ account_id: accountId() });
        expect(result.result).toBeDefined();
        expect(Array.isArray(result.result)).toBe(true);
      }));
    
    test("error - WorkerNotFound for non-existent", () =>
      Workers.getWorkerSettings({
        account_id: accountId(),
        script_name: "non-existent-worker-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WorkerNotFound")),
      ));
  });
});
```

### Resource Naming

`itty-cf-{service}-{testname}` — deterministic, enables cleanup

### TDD Loop

```mermaid
flowchart TD
    A[Write Test] --> B[Run Test]
    B --> C{Result?}
    C -->|Pass| D[Next Test]
    C -->|UnknownCloudflareError| E["Add to spec/service.json"]
    C -->|Type Error| F[Fix generator or test]
    E --> G[Regenerate]
    F --> G
    G --> B
```

### When to Stop and Ask

| Situation | Action |
|-----------|--------|
| Missing credentials | Request user add env vars |
| Rate limiting | Request user wait or increase limits |
| Account-level restrictions | Request user enable feature |
| Ambiguous API behavior | Ask for clarification |
| Breaking generator change | Ask for approval |

Do NOT stop for:
- `UnknownCloudflareError` → Add to spec and continue
- Type errors → Fix and continue
- Flaky tests → Add retry logic and continue

## Environment

```bash
# Required
CLOUDFLARE_API_TOKEN=xxx
CLOUDFLARE_ACCOUNT_ID=xxx

# Optional (for zone-scoped tests)
CLOUDFLARE_ZONE_ID=xxx

# Download from Doppler
bun run download:env
```

## Service Notes

**Queues:**
- Create `http_pull` consumer before pulling messages

**R2:**
- Location enum has uppercase/lowercase variants
- Fresh buckets return `NoCorsConfiguration` (not 404)

**Workers:**
- Upload via FormData with metadata blob and files array
- `getContent` returns `FormData` with worker modules as `File` entries
- Workflows require a worker that exports Workflow class
- Uses `contentType: "multipart"` for script upload operations

## Multipart Handling

### Requests

Operations with file uploads are automatically detected and marked with `contentType: "multipart"`:

```typescript
// Generated schema for file uploads
files: Schema.optional(Schema.Array(UploadableSchema.pipe(T.HttpFormDataFile())))

// Generated interface
files?: (File | Blob)[];

// Generated Http trait
T.Http({ method: "PUT", path: "...", contentType: "multipart" })
```

### Responses

Some APIs return `multipart/form-data` instead of JSON (e.g., downloading worker scripts):

```typescript
const formData = yield* Workers.getContent({
  account_id: accountId(),
  script_name: "my-worker",
});

// Iterate all modules
for (const [name, file] of formData.entries()) {
  const content = yield* Effect.promise(() => (file as File).text());
  console.log(name, content);
}
```
