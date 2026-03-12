# @distilled.cloud/turso

Effect-native Turso SDK generated from the [Turso API documentation](https://docs.turso.tech/api-reference). Manage databases, organizations, and groups with exhaustive error typing.

> **Note:** This SDK is a stub -- operations have not yet been generated. Run `bun run generate` after fetching specs to populate the operations.

## Installation

```bash
npm install @distilled.cloud/turso effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { CredentialsFromEnv } from "@distilled.cloud/turso";

const TursoLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);
```

## Configuration

Set the following environment variable:

```bash
TURSO_API_KEY=your-api-token
```

## License

MIT
