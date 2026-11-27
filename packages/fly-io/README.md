# @distilled.cloud/fly-io

Effect-native SDK for [fly-io](https://www.npmjs.com/package/@distilled.cloud/fly-io).

## Installation

```bash
npm install @distilled.cloud/fly-io effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Fly from "@distilled.cloud/fly-io";
import * as Machines from "@distilled.cloud/fly-io/machines";

const program = Effect.gen(function* () {
  const result = yield* Machines.listApps({ org_slug: "personal" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Fly.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## GraphQL

Add-ons (Tigris, Upstash Redis), remote builders, organizations and the rest
of `https://api.fly.io/graphql` are a Query SDK at
`@distilled.cloud/fly-io/GraphQL`, generated from the full introspection
schema. It uses the same `Credentials` as the REST services. Combinators live
in `@distilled.cloud/core/query`.

```ts
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { Query } from "@distilled.cloud/core/query";
import { CredentialsFromEnv } from "@distilled.cloud/fly-io";
import { Fly, GraphQLLive } from "@distilled.cloud/fly-io/GraphQL";

const createBucket = Query.fn((organizationId: string, name: string) => {
  const addOn = Fly.createAddOn({
    input: { organizationId, type: "tigris", name, options: { website: { domain_name: "" } } },
  }).addOn;
  // `environment` (the bucket's AWS_* keys) decodes as Redacted.
  return { id: addOn.id, name: addOn.name, environment: addOn.environment };
});

const agreedToTos = Query.fn((slug: string) =>
  Fly.organization({ slug }).agreedToProviderTos({ providerName: "upstash_redis" }),
);

const Live = GraphQLLive.pipe(
  Layer.provideMerge(FetchHttpClient.layer),
  Layer.provideMerge(CredentialsFromEnv),
);

agreedToTos("personal").pipe(Effect.provide(Live), Effect.runPromise);
```

Every root carries the errors in [`patches/graphql/`](patches/graphql/):
`FlyNotFound`, `FlyUnauthorized`, `FlyInvalidInput`, `FlyUnprocessable`,
`FlyMaintenance` and `FlyServerError` everywhere, plus `TigrisBucketNotFound`
(`deleteAddOn`), `TigrisBucketNameUnavailable` (`createAddOn`),
`CreateExtensionTosAgreementNotAuthorized` and `RemoteBuilderAppNotFound`
(`ensureDepotRemoteBuilder`). Secrets (`AddOn.password`, `publicUrl`,
`environment`, `buildToken`, tokens and private keys) decode as `Redacted`.

## Auth

Machines, MPG and GraphQL: `FLY_API_TOKEN` (or `FLY_IO_API_KEY`) through `CredentialsFromEnv` or `credentials({ apiKey })`. Optional: `FLY_API_HOSTNAME`. Sent as `Authorization: Bearer`.

Sprites: `SPRITES_TOKEN` through `SpritesCredentialsFromEnv` or `spritesCredentials({ token })`. The Sprites API rejects a Fly token, so Sprites operations need a Sprites token; create one at [sprites.dev/account](https://sprites.dev/account) or with `sprite login`. The SDK never creates one for you.

```ts
import { SpritesCredentialsFromEnv } from "@distilled.cloud/fly-io";
import * as Sprites from "@distilled.cloud/fly-io/sprites";

yield* Sprites.listSprites({}).pipe(Effect.provide(SpritesCredentialsFromEnv));
```
