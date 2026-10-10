# @distilled.cloud/clerk

Effect-native SDK for the [Clerk](https://clerk.com) Backend API and Platform
API, generated from [clerk/openapi-specs](https://github.com/clerk/openapi-specs)
(`bapi/2026-05-12.yml` and `platform/beta.yml`).

## Installation

```bash
npm install @distilled.cloud/clerk effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Clerk from "@distilled.cloud/clerk";

const program = Effect.gen(function* () {
  const result = yield* Clerk.getUserList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Clerk.CredentialsFromEnv,
  Clerk.ClerkProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Platform API

The Platform API manages applications, instances, domains and instance
configuration across a workspace. Its operations live under the
`Clerk.Platform` namespace and need their own credentials and protocol:

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Clerk from "@distilled.cloud/clerk";

const program = Effect.gen(function* () {
  const app = yield* Clerk.Platform.createApplication({
    name: "distilled-example",
    environment_types: ["development"],
  });
  yield* Clerk.Platform.deleteApplication({
    applicationID: app.application_id,
  });
  return app;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Clerk.PlatformCredentialsFromEnv,
  Clerk.ClerkPlatformProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

- **Backend API:** `CLERK_SECRET_KEY` (required) is sent as
  `Authorization: Bearer`. Optional: `CLERK_API_BASE_URL` (default
  `https://api.clerk.com/v1`) and `CLERK_API_VERSION`, sent as
  `Clerk-API-Version` (default `2026-05-12`, the version this package is
  generated against).
- **Platform API:** `CLERK_PLATFORM_API_KEY` (required, a workspace `ak_` key)
  is sent as `Authorization: Bearer`. Optional: `CLERK_PLATFORM_API_URL`, a
  host without a path (default `https://api.clerk.com`; `/v1` is appended,
  and a URL that already ends in `/v1` is accepted).

`Clerk.fromApiKey` and `Clerk.platformFromApiKey` build the same layers from
`Redacted` key values instead of the environment. Backend credentials never satisfy a
Platform operation, and the reverse: each operation's context requires its
own credentials service.

## Errors

Typed errors are tagged classes; handle them with `Effect.catchTag`:

```ts
const program = Clerk.Platform.getApplication({ applicationID: "app_…" }).pipe(
  Effect.catchTag("NotFound", (e) => Effect.succeed(e.message)),
);
```

A typed class carries the first entry of Clerk's `{ errors: [...] }`
envelope: `message`, and `code`, which is Clerk's string code
(`"resource_not_found"`). An operation's error union also includes core's
HTTP status errors under the same tags (`NotFound`, `Conflict`, …), which have
only `message`, so narrow with `"code" in e` before reading `code`.

The Backend and Platform APIs export separate classes with the same tags
(`Clerk.NotFound` and `Clerk.Platform.NotFound`). `catchTag` handles both;
`instanceof Clerk.NotFound` does not match a Platform error. A stale `ifMatch`
on `Clerk.Platform.patchConfig` or `putConfig` fails with
`ConfigVersionConflict` instead of `Conflict`. The `ifMatch` value must be the
`config_version` from `Clerk.Platform.getConfig` with `keys` set to exactly the
keys being written; the version from a full-document read is rejected. Anything
no class matches is `UnknownClerkError`.
