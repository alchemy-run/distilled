# @distilled.cloud/neon

An Effect-native SDK generated from Neon's public OpenAPI description. Operations expose typed inputs, outputs, and API errors for Postgres projects and branches, Functions, triggers, storage, managed Auth, Data API, and branch credentials.

```ts
import * as Neon from "@distilled.cloud/neon";
import { CredentialsFromEnv } from "@distilled.cloud/neon/Credentials";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

const projects = Neon.listProjects({ limit: 20 }).pipe(
  Effect.provide(Layer.mergeAll(CredentialsFromEnv, FetchHttpClient.layer)),
);

const result = await Effect.runPromise(projects);
console.log(result.projects.map(({ id, name }) => ({ id, name })));
```

## Spec source

The source is the [Neon API OpenAPI document](https://neon.com/api_spec/release/v2.json), pinned through `specs/spec-mirror-neon`. Corrections live in `patches/`; generated models and TypeScript are committed. From the Distilled repository root, run `pnpm generate neon` to convert, generate, and format the SDK. Refresh only the Neon spec mirror when updating its source.

## Authentication

`CredentialsFromEnv` reads `NEON_API_KEY` and the optional `NEON_API_BASE_URL`. `fromApiKey({ apiKey })` supplies an explicit deployment credential. Keep account API keys on trusted deployment infrastructure: they are not end-user authentication and must not be exposed to a browser.

Branch credentials are separate managed API objects. Issue/reveal/rotate responses redact API tokens and S3 secrets. Reveal recovers an existing active credential; rotation changes it and is not a substitute for recovery. Revoked credentials can remain in list responses with `revoked_at` set.

## Function deployments

Functions use a Node.js 24 Fetch entrypoint in an `index.mjs` ZIP. The deployment operation accepts `Blob`, `Uint8Array`, or `ArrayBuffer` ZIP data without converting binary bytes to text:

```ts
const deploy = Neon.createProjectBranchFunctionDeployment({
  project_id: "your-project-id",
  branch_id: "your-branch-id",
  slug: "api",
  runtime: "nodejs24",
  zip: archiveBytes,
  environment: JSON.stringify({ LOG_LEVEL: "info" }),
});
```

`archiveBytes` is the ZIP's `Uint8Array`. The SDK sends `environment` as a single multipart string. Omitting ZIP requests a configuration-only deployment. Empty environment values are preserved as submitted; the documented deletion value is `""`.

A successful deployment API response is not proof that invocation serves the requested version. See [backend-verification.md](./backend-verification.md) for the observed code/environment update propagation blocker and bounded live reproduction. Applications must authenticate public Function requests in their handlers.

## Triggers

Trigger creation and updates use a discriminated `body`, matching the API's schedule and object-created variants:

```ts
const trigger = Neon.createProjectBranchTrigger({
  project_id: "your-project-id",
  branch_id: "your-branch-id",
  body: {
    type: "schedule",
    function_slug: "api",
    name: "nightly",
    schedule: { cron: "0 2 * * *" },
    enabled: false,
  },
});
```

Storage triggers use `type: "storage_object_created"` and `storage_object_created: { bucket_name, prefix }`. These trigger HTTP delivery to a Function; the SDK does not provide an exactly-once delivery guarantee.

## Storage

Management operations configure branch buckets and presigned object requests. Presigned URLs are redacted; unwrap them only where needed for the request. Object downloads return `Uint8Array`, preserving binary contents. The protocol does not forward account authorization when following cross-origin download redirects.

For direct S3 clients, Neon credentials are branch-lineage scoped. `storage:read` grants reads and `storage:write` grants reads and writes; neither is a bucket- or object-specific policy. Use Neon's branch-specific S3 endpoint with path-style addressing.

## Verification

Wire/schema regressions cover multipart encoding, binary downloads, credential redaction, both trigger variants, and nullable deployment fields. Compile assertions run with checking enabled. Live probes are opt-in through `NEON_SDK_LIVE=1`, create isolated resources, and clean up owned projects. Separate environment/update probes remain opt-in and report their failed runtime assertions rather than counting control-plane activation as update success.
