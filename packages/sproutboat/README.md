# @distilled.cloud/sproutboat

Effect-native [Sproutboat](https://sproutboat.com) Cloud SDK, generated from Sproutboat's
[OpenAPI description](https://sproutboat.com/docs/openapi.yaml) (the source of its
[API reference](https://sproutboat.com/docs/api/reference)).

## Installation

```bash
npm install @distilled.cloud/sproutboat effect
```

## Quick start

An app's lifecycle, the way an infrastructure-as-code provider runs it: create the app (upload its
source and build it), wait until it is live, read it back, then delete it.

The Cloud builds an app from its generated JavaScript, the one file that
`npx sproutboat@latest build --standalone --emit-only` prints the path of.

```ts
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { Effect, Layer, Schedule } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Sproutboat from "@distilled.cloud/sproutboat";

const project = "hello-api";

const program = Effect.gen(function* () {
  // The team slug names the app's default route, <project>.<slug>.sproutboat.app.
  const whoami = yield* Sproutboat.getWhoami({});
  const host = `${project}.${whoami.organization_slug}.sproutboat.app`;

  // 1. Upload the source if the Cloud does not have it yet. Sources are
  //    stored by the SHA-256 of their bytes, so a repeat upload is a no-op.
  const source = yield* Effect.tryPromise(() => readFile("dist/hello-api.js"));
  const sha256 = createHash("sha256").update(source).digest("hex");
  const { missing } = yield* Sproutboat.findMissingSources({ sha256: [sha256] });
  if (missing.includes(sha256)) {
    yield* Sproutboat.putSource({ sha256, body: source });
  }

  // 2. Create the app: a build creates it on the first run and updates it
  //    afterwards. There is no separate "create app" call.
  const started = yield* Sproutboat.createBuild({
    project,
    source_sha256: sha256,
    kind: "generated",
    build: { v: 1, name: project, cli: { version: "my-provider" } },
    spec: { hosts_patch: { add: [host] } },
  });

  // 3. Wait for the build, then until a host has applied what it wrote.
  const build = yield* Sproutboat.getBuild({ id: started.id }).pipe(
    Effect.repeat({
      schedule: Schedule.spaced("2 seconds"),
      until: (b) => b.state === "ready" || b.state === "failed" || b.state === "canceled",
    }),
  );
  if (build.state !== "ready") {
    return yield* Effect.fail(`build ${build.state}: ${build.error?.message}`);
  }
  const generation = build.record_generation ?? 0;
  const app = yield* Sproutboat.getApp({ project }).pipe(
    Effect.repeat({
      schedule: Schedule.spaced("2 seconds"),
      until: (a) =>
        a.apply?.state === "failed" ||
        a.apply?.state === "fenced" ||
        (a.apply?.state === "applied" && (a.apply.applied_generation ?? 0) >= generation),
    }),
    Effect.timeout("120 seconds"),
  );

  // 4. Read: the stored spec, the routes with their certificate state, and the live build.
  yield* Effect.log(`${app.project} is ${app.apply?.state} at`, app.routes?.map((r) => r.key));

  // 5. Delete.
  yield* Sproutboat.deleteApp({ project });
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Sproutboat.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`SPROUTBOAT_API_KEY` is sent as `Authorization: Bearer <key>`. It is a team API key (`sbk_...`)
from the dashboard's **Settings, API keys**; the **Deploy** preset covers the example above, and
deleting an app the key did not create needs **Admin**. `SPROUTBOAT_BASE_URL` is optional and
defaults to `https://dash.sproutboat.com`. To pass the key directly, use
`Sproutboat.fromApiKey({ apiKey: Redacted.make(key) })`.

## Coverage

35 of the spec's 36 operations, in one module on the package root: apps, source and asset uploads,
builds, secrets, routes, custom domains, D1 queries, R2 objects, metrics, events, notices and
limits. `GET /v1/builds/{id}/events` is left out: it answers only Server-Sent Events, which the
SDK's REST protocol does not read. Poll `getBuild` instead, as the example does.

Uploads (`putSource`, `putAssetBlob`, `putR2Object`) take a `Uint8Array`, `ArrayBuffer`, `Blob`, string
or `Stream<Uint8Array>` body (a stream is sent as it is pulled, and never retried); `getR2Object` returns `{ body, contentType }`: the object's bytes as a `Stream<Uint8Array>` read as they arrive (`Stream.mkUint8Array` collects them) and the response's `Content-Type`. An R2 key may contain `/`.

## Errors

Each operation's declared statuses are typed errors (`BadRequest`, `NotFound`, `Conflict`,
`Forbidden`, `PayloadTooLarge`); `message` is Sproutboat's `error` text and `body.reason` its
machine-readable cause. The causes a provider branches on have their own classes: `RouteTaken`,
`HostNotYours`, `SourceMissing`, `BlobsMissing`, `DomainInUse` and `ModuleUploadDisabled`.
Throttling (429) and 5xx responses are retried by the default policy; `Sproutboat.Retry.none` turns
retries off.

Secret values (`putSecret`, `patchSecrets`, `putApp`'s `secrets`) accept `Redacted` values, so they
never print in logs or errors.
