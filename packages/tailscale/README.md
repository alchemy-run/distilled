# @distilled.cloud/tailscale

Effect-native Tailscale SDK, generated from the [Tailscale API OpenAPI document](https://api.tailscale.com/api/v2?outputOpenApiSchema=true). Operations cover devices, auth keys, DNS, policy files, users, webhooks, services and the rest of the `/api/v2` surface, with typed inputs, outputs and API errors.

## Installation

```bash
npm install @distilled.cloud/tailscale effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Tailscale from "@distilled.cloud/tailscale";

const program = Effect.gen(function* () {
  const policy = yield* Tailscale.getPolicyFile({ tailnet: "-" });
  return policy.eTag;
});

const Live = Tailscale.CredentialsFromEnv.pipe(
  Layer.provideMerge(FetchHttpClient.layer),
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`CredentialsFromEnv` reads these on every resolution, through the current `ConfigProvider`:

| Variable | Behavior |
|---|---|
| `TAILSCALE_API_KEY` | Bearer API access token via `fromApiKey` |
| `TAILSCALE_OAUTH_CLIENT_ID` and `TAILSCALE_OAUTH_CLIENT_SECRET` | Client-credentials exchange at `{apiBaseUrl}/oauth/token`, cached until `expires_in` minus 60 seconds |
| `TAILSCALE_TAILNET` | Tailnet id on the credentials config. Default `-` |
| `TAILSCALE_BASE_URL` | API origin. Default `https://api.tailscale.com`. The client calls `{origin}/api/v2` unless the value already ends in `/api/v2` |

Setting both an API key and an OAuth client, or only half an OAuth pair, fails with `ConfigError`.

The explicit layers are `fromApiKey({ apiKey, apiBaseUrl? })` and `fromClientCredentials({ clientId, clientSecret, scope?, apiBaseUrl? })`. Their `apiBaseUrl` is the full API root (default `https://api.tailscale.com/api/v2`), used as given. The OAuth layers need an `HttpClient` for the token exchange and share one exchange across concurrent requests.

Pass the tailnet to each operation (`"-"` is the token's default tailnet); operations do not read `TAILSCALE_TAILNET`.

## Policy file

Policy files travel as HuJSON text on `body`, comments preserved. `getPolicyFile` and `setPolicyFile` return the `ETag` as `eTag`; pass it as `ifMatch` to guard a write (a mismatch is `PreconditionFailed`).

```ts
const current = yield* Tailscale.getPolicyFile({ tailnet: "-" });
yield* Tailscale.validateAndTestPolicyFile({ tailnet: "-", body: current.body });
const updated = yield* Tailscale.setPolicyFile({
  tailnet: "-",
  ifMatch: current.eTag,
  body: current.body,
});
```

## Auth keys

`createKey` returns the new key's secret once, as a `Redacted` string on `key`.

```ts
import { Effect, Redacted } from "effect";

const created = yield* Tailscale.createKey({
  tailnet: "-",
  description: "ci runner",
  expirySeconds: 3600,
  capabilities: {
    devices: {
      create: { reusable: false, ephemeral: true, preauthorized: true, tags: ["tag:ci"] },
    },
  },
});
const authKey = Redacted.value(created.key!); // pass to `tailscale up --auth-key`

yield* Tailscale.deleteKey({ tailnet: "-", keyId: created.id! });
```

Tags on a key must be owned in the policy file's `tagOwners`.

## Spec source

The spec is mirrored as JSON in `specs/spec-mirror-tailscale`; corrections live in `patches/`. Run `pnpm generate tailscale` from the repository root to regenerate.
