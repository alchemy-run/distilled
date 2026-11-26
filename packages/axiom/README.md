# @distilled.cloud/axiom

Effect-native SDK for [axiom](https://www.npmjs.com/package/@distilled.cloud/axiom).

## Installation

```bash
npm install @distilled.cloud/axiom effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Axiom from "@distilled.cloud/axiom";

const program = Effect.gen(function* () {
  const result = yield* Axiom.listDashboards({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Axiom.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Preview operations

Axiom marks some v2 operations preview (`x-axiom-preview: true` in its
OpenAPI spec): datasets, monitors, notifiers and users. Those operations are
not on the package root; they import from `unstable/`:

```ts
import * as AxiomPreview from "@distilled.cloud/axiom/unstable/v2";

const datasets = yield* AxiomPreview.getDatasets({});
```

## Auth

Required: `AXIOM_API_KEY`, `AXIOM_ORG_ID`, `AXIOM_TOKEN`. Optional: `AXIOM_URL`.
