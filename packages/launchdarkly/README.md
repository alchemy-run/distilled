# @distilled.cloud/launchdarkly

Effect-native SDK for [launchdarkly](https://www.npmjs.com/package/@distilled.cloud/launchdarkly).

## Installation

```bash
npm install @distilled.cloud/launchdarkly effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as LaunchDarkly from "@distilled.cloud/launchdarkly";

const program = Effect.gen(function* () {
  const result = yield* LaunchDarkly.getProjects({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  LaunchDarkly.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Beta operations

LaunchDarkly tags its beta resources "(beta)" in its spec (account usage, applications, approvals, Insights, release policies, SDK keys and more), and some declare the `LD-API-Version: beta` header. They are not on the package root. Import them from `unstable/launchdarkly`:

```ts
import * as LaunchDarklyBeta from "@distilled.cloud/launchdarkly/unstable/launchdarkly";

const keys = LaunchDarklyBeta.getProjectSdkKeys({ projectKey: "default" });
```

LaunchDarkly asks for `LD-API-Version: beta` on beta resources. The SDK sends `LAUNCHDARKLY_API_VERSION` (default `20240415`) on every call.

## Auth

Required: `LAUNCHDARKLY_ACCESS_TOKEN`, `LAUNCHDARKLY_API_KEY`, `LAUNCHDARKLY_API_VERSION`. Optional: `LAUNCHDARKLY_API_BASE_URL`. Sent as `Authorization: Bearer`.
