# @distilled.cloud/azure

Effect-native SDK for [azure](https://www.npmjs.com/package/@distilled.cloud/azure).

## Installation

```bash
npm install @distilled.cloud/azure effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Azure from "@distilled.cloud/azure";

const program = Effect.gen(function* () {
  const result = yield* Azure.resources.ResourceGroupsList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Azure.CredentialsFromEnv,
  Azure.AzureProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Data planes

Each data-plane group is its own module (`keyvault-secrets`, `storage-blob`,
`servicebus-messaging`, …). An operation requests a token for its own
audience, so one credentials layer serves ARM and every data plane:

```ts
import { Effect, Layer, Redacted } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Azure from "@distilled.cloud/azure";
import * as secrets from "@distilled.cloud/azure/keyvault-secrets";

const program = Effect.gen(function* () {
  const secret = yield* secrets.GetSecret({
    vaultBaseUrl: "https://my-vault.vault.azure.net",
    secretName: "db-password",
  });
  return Redacted.make(secret.value ?? "");
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Azure.fromManagedIdentity(), // inside Functions, Container Apps, VMs, AKS
  Azure.AzureProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Each layer mints a Microsoft Entra ID token for a scope when an operation first needs it: the ARM scope for ARM operations, the service's own audience for a data plane (a Key Vault-only program never mints an ARM token). Tokens are cached per scope for the life of the layer value and minted again 5 minutes before they expire:

- `Azure.fromClientSecret({ tenantId, clientId, clientSecret: Redacted.make(secret), subscriptionId })` -- a service principal.
- `Azure.fromManagedIdentity({ clientId? })` -- the host's managed identity (App Service, Functions, Container Apps, VMs, AKS).
- `Azure.fromWorkloadIdentity()` -- an AKS pod's federated workload identity (`AZURE_FEDERATED_TOKEN_FILE`, `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`).
- `Azure.fromStaticToken({ bearerToken: Redacted.make(token), subscriptionId })` / `Azure.CredentialsFromEnv` -- one pre-acquired token, sent to every operation (`AZURE_BEARER_TOKEN`, `AZURE_SUBSCRIPTION_ID`; optional `AZURE_TENANT_ID`, `AZURE_API_BASE_URL`).
- `Azure.fromEnv()` -- `AZURE_TENANT_ID` + `AZURE_CLIENT_ID` + `AZURE_CLIENT_SECRET`, else a managed or workload identity, else `AZURE_BEARER_TOKEN`.

A custom layer provides `Config.token(scope)`. Failures are typed: `InvalidClientSecret`, `ManagedIdentityUnavailable`, `TokenRequestFailed`.

Data-plane token audiences come from each spec's security scheme; a spec that declares none, or the wrong one, is corrected in `patches/<module>/audience.json`.
