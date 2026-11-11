# @distilled.cloud/dokploy

Effect-native SDK for the [Dokploy](https://dokploy.com) API, generated from Dokploy's
[OpenAPI description](https://github.com/Dokploy/sdk/blob/main/openapi.json), which Dokploy's
CI generates from its tRPC routers. Dokploy is self-hosted; the SDK talks to your instance.

## Installation

```bash
npm install @distilled.cloud/dokploy effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Dokploy from "@distilled.cloud/dokploy";

const program = Effect.gen(function* () {
  yield* Dokploy.application.deployApplication({
    applicationId: "<application id>",
    title: "Deploy from distilled",
  });
  return yield* Dokploy.deployment.listDeployments({ applicationId: "<application id>" });
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Dokploy.CredentialsFromEnv,
  Dokploy.DokployProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`DOKPLOY_API_KEY` as the `x-api-key` header. Create a key in the Dokploy dashboard under
Settings > API Keys. `DOKPLOY_URL` is your instance's URL (for example
`https://dokploy.example.com`) and is required: there is no default host. Requests go to
`<DOKPLOY_URL>/api`. These are the variables the official Dokploy CLI reads.

To configure the instance in code instead:

```ts
import * as Redacted from "effect/Redacted";

Dokploy.credentials({
  apiKey: Redacted.make("<api key>"),
  url: "https://dokploy.example.com",
});
```

## Operations

One module per Dokploy router (`application`, `compose`, `project`, `server`, `postgres`, ...).
Each tRPC procedure is one operation with a verbNoun name: `application.one` is
`application.getApplication`, `project.all` is `project.listProjects`, and
`application.saveBuildType` is `application.saveApplicationBuildType`.

Dokploy's OpenAPI description does not describe response bodies, so every operation returns
`unknown`: the parsed JSON as the instance sent it. Inputs are fully typed.

`application.dropDeployment` and `docker.uploadFileToContainer` are multipart uploads: pass the
`zip` / `file` part as a `Blob`, `File`, `Uint8Array` or `ArrayBuffer`.

## Errors

Failures are tRPC error bodies (`{ message, code, issues? }`). Operations raise `BadRequest`,
`Forbidden` and, on queries, `NotFound`; the shared status classes cover the rest, and
`UnknownDokployError` carries the tRPC `code` for anything else.
