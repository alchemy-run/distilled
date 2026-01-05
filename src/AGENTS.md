# src/

Runtime library. Effect-native AWS SDK with typed clients generated from Smithy models.

→ Parent: [AGENTS.md](../AGENTS.md)

## ARCHITECTURE

```
Input → api.ts → request-builder → protocol → middleware → rules-engine → SigV4 → HTTP
                                                                                    ↓
Output ← api.ts ← response-parser ← protocol ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←← Response
```

**Core flow:**

1. `api.ts` — Entry point (`API.make`, `API.makePaginated`)
2. `request-builder.ts` — Calls protocol to serialize input
3. `protocols/*.ts` — JSON/XML/Query body encoding
4. `middleware/*.ts` — Checksums, streaming body handling
5. `rules-engine/*.ts` — Dynamic endpoint resolution
6. SigV4 signing → HTTP request
7. `response-parser.ts` — Parses response via protocol
8. Errors classified → retry policy applied

## KEY FILES

| File                 | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `api.ts`             | `API.make`, `API.makePaginated` — operation execution        |
| `traits.ts`          | Smithy trait annotations (`T.HttpHeader`, `T.XmlName`, etc.) |
| `request-builder.ts` | Creates protocol handler, serializes input                   |
| `response-parser.ts` | Parses response, handles errors                              |
| `retry-policy.ts`    | Error categories → retry schedules                           |
| `error-category.ts`  | Throttling, transient, server, client                        |

## TRAIT SYSTEM

Smithy traits become Schema annotations at codegen, read at runtime:

```typescript
// Generated (services/*.ts)
S.Struct({ bucket: S.String.pipe(T.HttpLabel("Bucket")) })

// Runtime reads (protocols/*.ts)
const label = T.getHttpLabel(memberAst);  // "Bucket"
```

Add traits in `traits.ts` using `makeAnnotation()`. Extract with `get*` functions.

## GENERATED CODE

`services/` contains ~400 generated clients. **Never edit manually.**

```bash
bun generate --sdk s3
```

Each file exports:

- Request/response interfaces + schemas
- Error classes (`S.TaggedError`)
- Operations (e.g., `S3.putObject`)

## SUBSYSTEMS

| Path                                      | What it does                                  |
| ----------------------------------------- | --------------------------------------------- |
| [protocols/](./protocols/AGENTS.md)       | JSON, XML, Query serialization                |
| [aws/](./aws/AGENTS.md)                   | Credentials, region, endpoint override        |
| [rules-engine/](./rules-engine/AGENTS.md) | Smithy endpoint rule evaluation               |
| [eventstream/](./eventstream/AGENTS.md)   | Binary event stream codec                     |
| [middleware/](./middleware/AGENTS.md)     | Checksum, streaming body                      |
| `customizations/`                         | Service-specific hooks (Glacier, API Gateway) |
| `util/`                                   | AST introspection, XML, timestamps            |
| `hash/`                                   | CRC32, MD5                                    |
| `patch/`                                  | Error discovery AI agent                      |
