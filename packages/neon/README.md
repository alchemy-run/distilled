# @distilled.cloud/neon

Effect-native Neon SDK generated from the [Neon OpenAPI specification](https://api-docs.neon.tech). Manage serverless Postgres projects, branches, endpoints, databases, and roles with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/neon effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { listProjects } from "@distilled.cloud/neon";
import { CredentialsFromEnv } from "@distilled.cloud/neon";

const program = Effect.gen(function* () {
  const projects = yield* listProjects({});
  return projects.projects;
});

const NeonLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);

program.pipe(Effect.provide(NeonLive), Effect.runPromise);
```

## Configuration

Set the following environment variable:

```bash
NEON_API_KEY=your-api-key
```

## Error Handling

```typescript
import { getProject } from "@distilled.cloud/neon";

getProject({ project_id: "missing" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownNeonError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## License

MIT
