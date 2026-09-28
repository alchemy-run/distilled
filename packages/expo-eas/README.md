# @distilled.cloud/expo-eas

Effect-native SDK for [expo-eas](https://www.npmjs.com/package/@distilled.cloud/expo-eas).

## Installation

```bash
npm install @distilled.cloud/expo-eas effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Eas from "@distilled.cloud/expo-eas";

const program = Effect.gen(function* () {
  const result = yield* Eas.getUserPreference({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Eas.CredentialsFromEnv,
  Eas.ExpoGraphqlProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `EXPO_TOKEN`. Optional: `EXPO_API_URL`. Sent as `Authorization: Bearer`.
