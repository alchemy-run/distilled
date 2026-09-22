# @distilled.cloud/slack

Effect-native SDK for [slack](https://www.npmjs.com/package/@distilled.cloud/slack).

## Installation

```bash
npm install @distilled.cloud/slack effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Slack from "@distilled.cloud/slack";

const program = Effect.gen(function* () {
  const result = yield* Slack.admin.listAppsActivities({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Slack.CredentialsFromEnv,
  Slack.SlackProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `SLACK_BOT_TOKEN`, `SLACK_TOKEN`. Optional: `SLACK_API_URL`. Sent as `Authorization: Bearer`.
