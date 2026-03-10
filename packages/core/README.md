# @distilled.cloud/sdk-core

Shared infrastructure for all Distilled SDKs. Provides the client factory, HTTP trait annotations, error classes, error categories, pagination utilities, and retry policies.

## What's in here

- **`client.ts`** — `API.make()` and `API.makePaginated()` factories that create Effect operations from annotated schemas
- **`traits.ts`** — Schema annotations for HTTP bindings (`T.Http`, `T.PathParam`, `T.HttpHeader`, `T.JsonName`, etc.)
- **`errors.ts`** — Base error classes (`NotFound`, `Unauthorized`, `Forbidden`, `TooManyRequests`, etc.) with status code matching
- **`category.ts`** — Error categories (`AuthError`, `ThrottlingError`, `ServerError`, etc.) for retry logic and semantic grouping
- **`pagination.ts`** — `paginatePages`/`paginateItems` stream utilities
- **`retry.ts`** — Retry policy configuration
- **`sensitive.ts`** — Sensitive data schemas (wraps values in `Redacted`)
- **`json-patch.ts`** — JSON Patch (RFC 6902) implementation for spec patching

## Usage

This package is not intended to be used directly. It's a dependency of the provider SDKs (`@distilled.cloud/aws`, `@distilled.cloud/cloudflare`, etc.).

```typescript
// Provider packages import from core like this:
import { makeAPI } from "@distilled.cloud/sdk-core/client";
import * as T from "@distilled.cloud/sdk-core/traits";
import { NotFound, Forbidden } from "@distilled.cloud/sdk-core/errors";
import * as Category from "@distilled.cloud/sdk-core/category";
```

## License

MIT
