# @distilled.cloud/convex

Effect-native SDK for [Convex](https://www.convex.dev), generated from the
[Management, Deployment and public HTTP API specs](https://github.com/convex/convex-backend/tree/main/npm-packages/%40convex-dev/platform).

## Installation

```bash
npm install @distilled.cloud/convex effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Convex from "@distilled.cloud/convex";
import * as Management from "@distilled.cloud/convex/management";

const program = Effect.gen(function* () {
  const { id, deploymentUrl } = yield* Management.createProject({
    teamId: 12345,
    projectName: "my-app",
    deploymentType: "prod",
  });
  return { id, deploymentUrl };
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Convex.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Services

| Service | API | Lives at | Auth |
| --- | --- | --- | --- |
| `@distilled.cloud/convex/management` | Management | `https://api.convex.dev/v1` | `Authorization: Bearer <team token>` |
| `@distilled.cloud/convex/deployment` | Deployment | `<deployment url>/api/v1` | `Authorization: Convex <token>` |
| `@distilled.cloud/convex/functions` | Public HTTP | `<deployment url>/api` | none |

`deployment` and `functions` run against one deployment, so give them its URL
with `fromDeployment`:

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Redacted from "effect/Redacted";
import * as Convex from "@distilled.cloud/convex";
import * as Deployment from "@distilled.cloud/convex/deployment";
import * as Functions from "@distilled.cloud/convex/functions";

const program = Effect.gen(function* () {
  yield* Deployment.updateEnvironmentVariables({
    changes: [{ name: "API_URL", value: "https://example.com" }],
  });
  return yield* Functions.query({
    path: "messages:list",
    args: {},
    format: "json",
  });
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Convex.fromDeployment({
    url: "https://happy-otter-123.convex.cloud",
    token: Redacted.make(process.env.CONVEX_ACCESS_TOKEN!),
  }),
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

A function that throws still answers 200, so check `status` on the result.

## Auth

`CredentialsFromEnv` reads `CONVEX_ACCESS_TOKEN`, a team access token, and
optionally `CONVEX_API_BASE_URL`. `fromToken` takes one directly. On the
Deployment API, `token` can also be a deploy key or a self-hosted admin key.
