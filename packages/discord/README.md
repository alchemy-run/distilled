# @distilled.cloud/discord

Effect-native SDK for [discord](https://www.npmjs.com/package/@distilled.cloud/discord).

## Installation

```bash
npm install @distilled.cloud/discord effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Discord from "@distilled.cloud/discord";

const program = Effect.gen(function* () {
  const result = yield* Discord.listApplicationCommands({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Discord.CredentialsFromEnv,
  Discord.DiscordProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `DISCORD_BOT_TOKEN`, `DISCORD_TOKEN`, `DISCORD_TOKEN_TYPE`. Optional: `DISCORD_API_URL`. Sent as `Authorization: Bearer`.
