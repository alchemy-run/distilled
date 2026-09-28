# @distilled.cloud/axiom

Effect-native SDK for [axiom](https://www.npmjs.com/package/@distilled.cloud/axiom).

## Installation

```bash
npm install @distilled.cloud/axiom effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Axiom from "@distilled.cloud/axiom";

const program = Effect.gen(function* () {
  const result = yield* Axiom.v2.getDatasets({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Axiom.CredentialsFromEnv,
  Axiom.AxiomProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `AXIOM_API_KEY`, `AXIOM_ORG_ID`, `AXIOM_TOKEN`. Optional: `AXIOM_URL`.
