# @distilled.cloud/stackit

Effect-native SDK for [stackit](https://www.npmjs.com/package/@distilled.cloud/stackit).

## Installation

```bash
npm install @distilled.cloud/stackit effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Stackit from "@distilled.cloud/stackit";

const program = Effect.gen(function* () {
  const result = yield* Stackit.dns.listZones({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Stackit.CredentialsFromEnv,
  Stackit.StackitProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`Stackit.CredentialsFromEnv` reads the same variables as the official Go SDK,
CLI and Terraform provider, in this order:

1. **Service-account key** (recommended; STACKIT has retired long-lived
   access tokens). `STACKIT_SERVICE_ACCOUNT_KEY_PATH` names the key file
   (`stackit service-account key create ...`), or `STACKIT_SERVICE_ACCOUNT_KEY`
   holds its JSON. For a key created from your own public key, set
   `STACKIT_PRIVATE_KEY_PATH` or `STACKIT_PRIVATE_KEY` (PEM, PKCS #8 or
   PKCS #1); either also overrides the key file's embedded private key.
   The SDK signs an RS512 assertion with the key, exchanges it for an access
   token at `STACKIT_TOKEN_BASEURL` (full URL), else the key's
   `credentials.tokenEndpoint`, else `https://service-account.api.stackit.cloud/token`,
   caches the token and mints a new one five minutes before it expires.
2. **Access token**: `STACKIT_SERVICE_ACCOUNT_TOKEN`, sent as is.

Optional for both: `STACKIT_REGION` (default `eu01`) and `STACKIT_API_BASE_URL`
(one host for every call). Credentials are sent as `Authorization: Bearer`;
a failed token exchange fails the operation with `ConfigError`.

To pass a key explicitly (from a secret store, say), parse it and build the
layer once:

```ts
import { Effect, Layer, Redacted } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Stackit from "@distilled.cloud/stackit";

const key = yield* Stackit.parseServiceAccountKey(keyJson);

const Live = Layer.mergeAll(
  Stackit.fromServiceAccountKey({
    key,
    // only for user-provided key pairs:
    // privateKey: Redacted.make(privateKeyPem),
    region: "eu01",
  }),
  Stackit.StackitProtocol,
).pipe(Layer.provideMerge(FetchHttpClient.layer));
```

Signing uses WebCrypto, so the key flow runs on Node, Bun, Cloudflare Workers
and Lambda. `Stackit.credentials({ token })` takes a ready-made access token.
