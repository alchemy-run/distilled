# @distilled.cloud/expo-eas

Effect-native Expo Application Services (EAS) SDK, generated from the EAS
GraphQL introspection schema that eas-cli ships. Every query and mutation
root of `https://api.expo.dev/graphql` is a lazy Query lens; combinators
live in `@distilled.cloud/core/query`.

## Installation

```bash
npm install @distilled.cloud/expo-eas @distilled.cloud/core effect
```

## Quick start

```ts
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { Query } from "@distilled.cloud/core/query";
import { CredentialsFromEnv, Eas, GraphQLLive } from "@distilled.cloud/expo-eas";

const appInfo = Query.fn((fullName: string) => {
  const app = Eas.app().byFullName({ fullName });
  return { id: app.id, name: app.name, slug: app.slug };
});

const createChannel = Query.fn((appId: string, name: string) => {
  const channel = Eas.updateChannel().createUpdateChannelForApp({
    appId,
    name,
    branchMapping: JSON.stringify({ version: 0, data: [] }),
  });
  return { id: channel.id, name: channel.name };
});

const program = Effect.gen(function* () {
  const app = yield* appInfo("@acme/mobile");
  return yield* createChannel(app.id, "preview");
});

const Live = GraphQLLive.pipe(
  Layer.provideMerge(FetchHttpClient.layer),
  Layer.provideMerge(CredentialsFromEnv),
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## How selection works

`Eas.app().byFullName({ fullName })` does not fetch. Reading `app.name`
records that field. `Query.fn` walks the plan you return, posts **one**
document, then fills in the values. Select leaf fields: a plan that ends on
an object is a `GqlError` defect. Queries and mutations cannot share a plan.

Most EAS roots are namespaces (`account`, `app`, `build`, `updateChannel`,
...) whose fields take the arguments, so a lookup is two steps:
`Eas.account().byName({ accountName })`. A field with a required argument
is a call; a field whose arguments are all optional also reads bare.
Where a mutation shares its name with a query, the mutation gets a
`Mutation` suffix (`Eas.appMutation`).

## Errors

Every root carries the errors declared in
[`patches/graphql/00-errors.json`](patches/graphql/00-errors.json), matched
on the error's `extensions.errorCode`: `EasValidationError`,
`EasChannelAlreadyExists`, `EasExperienceNotFound`,
`EasBuildFreeTierLimitExceeded`, and the rest. Handle them with
`Effect.catchTag`. A response that is not GraphQL (an HTTP 401 with a plain
body, a proxy error page) is `GraphQLTransportError` with its `status`.

## Auth

- `EXPO_TOKEN`: a personal or robot access token from
  https://expo.dev/settings/access-tokens, sent as `Authorization: Bearer`.
- `EXPO_API_URL` (optional): the host, default `https://api.expo.dev`. Set
  `https://staging-api.expo.dev` for staging.
