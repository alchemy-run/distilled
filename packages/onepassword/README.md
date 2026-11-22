# @distilled.cloud/onepassword

Effect-native 1Password SDK, generated from 1Password's published OpenAPI specs:
[Connect](https://github.com/1Password/connect/blob/main/docs/openapi/spec.yaml),
[Events](https://www.1password.dev/openapi/events_api.yaml),
[Users](https://www.1password.dev/openapi/users_api.yaml),
[OAuth](https://www.1password.dev/openapi/oauth_api.yaml) and
[Partnership](https://www.1password.dev/openapi/partnership_api.yaml).

## Installation

```bash
npm install @distilled.cloud/onepassword effect
```

## APIs

Each API is a service with its own subpath, credentials layer and protocol, e.g. `import * as Connect from "@distilled.cloud/onepassword/connect"`.

| API         | Operations                                    | Credentials                             | Protocol              |
| ----------- | --------------------------------------------- | --------------------------------------- | --------------------- |
| Connect     | `Connect.getVaults`, …| `ConnectCredentialsFromEnv`                  | `ConnectProtocol` |
| Events      | `Events.getAuditEventsV2`, …| `EventsCredentialsFromEnv`              | `EventsProtocol`      |
| Users       | `Users.listUsers`, …| `UsersCredentialsFromEnv`               | `UsersProtocol`       |
| OAuth       | `OAuth.requestAccessToken`, …| `OAuthCredentialsFromEnv`               | `OAuthProtocol`       |
| Partnership | `Partnership.createPartnerAccount`, …| `PartnershipCredentialsFromEnv`     | `PartnershipProtocol` |

## Quick start

Connect (a self-hosted Connect server):

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Onepassword from "@distilled.cloud/onepassword";
import * as Connect from "@distilled.cloud/onepassword/connect";

const program = Effect.gen(function* () {
  const vaults = yield* Connect.getVaults({});
  return vaults;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Onepassword.ConnectCredentialsFromEnv,
  Onepassword.ConnectProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Events (audit events from an Events Reporting integration):

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Onepassword from "@distilled.cloud/onepassword";
import * as Events from "@distilled.cloud/onepassword/events";

const program = Effect.gen(function* () {
  // Start a cursor with a page size and a start time, then pass the returned
  // `cursor` back as `{ body: { cursor } }` to continue.
  const page = yield* Events.getAuditEventsV2({
    body: { limit: 100, start_time: "2026-10-01T00:00:00Z" },
  });
  return page.items;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Onepassword.EventsCredentialsFromEnv,
  Onepassword.EventsProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Users (suspend a user; the access token is requested and refreshed for you):

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Onepassword from "@distilled.cloud/onepassword";
import * as Users from "@distilled.cloud/onepassword/users";

const program = Users.suspendUser({
  account: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  user: "ZYXWVUTSRQPONMLKJIHGFEDCBA",
});

// The credentials request the access token through the HttpClient.
const Live = Layer.mergeAll(Onepassword.UsersCredentialsFromEnv, Onepassword.UsersProtocol).pipe(
  Layer.provideMerge(FetchHttpClient.layer),
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

1Password SDK (vaults, items, secret references, item sharing, groups). Calls go
through 1Password's SDK core, not HTTP. Install the optional peer
`@1password/sdk-core` for service account auth:

```ts
import { Effect } from "effect";
import * as Redacted from "effect/Redacted";
import * as Onepassword from "@distilled.cloud/onepassword";
import * as Sdk from "@distilled.cloud/onepassword/sdk";

const program = Effect.gen(function* () {
  // Create a Login with typed fields; secrets are `Redacted`.
  const params = Onepassword.ItemCategories.Login.create({
    vaultId: "<vault id>",
    title: "Example",
    values: { username: "me", password: Redacted.make("hunter2") },
  });
  const item = yield* Sdk.createItem({ params });
  const { username, password } = Onepassword.ItemCategories.Login.read(item);
  const secret = yield* Sdk.resolveSecret({ secret_reference: `op://${item.vaultId}/${item.id}/password` });
  return { username, password, secret };
});

// SdkClientFromEnv reads OP_SERVICE_ACCOUNT_TOKEN, or OP_ACCOUNT for the desktop app.
program.pipe(Effect.provide(Onepassword.SdkClientFromEnv), Effect.runPromise);
```

`Sdk` operations need `SdkClient`; `import * as SdkLocal from "@distilled.cloud/onepassword/sdk-local"`
(`generatePassword`, `validateSecretReference`) needs nothing. Item categories are the
generated `ItemCategory` union; `ItemCategories.Login`, `Password`, `SecureNote`,
`Document` and `SshKey` are typed profiles, and `ItemCategories.defineCategory` makes
one for any other category.

## Auth

| API         | Required                                                 | Optional                                                    | Sent as                                   |
| ----------- | -------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| Connect     | `OP_CONNECT_TOKEN`                                       | `OP_CONNECT_HOST` or `OP_CONNECT_API_BASE_URL` (default `http://localhost:8080/v1`) | `Authorization: Bearer`                   |
| Events      | `OP_EVENTS_API_TOKEN`                                    | `OP_EVENTS_API_BASE_URL` (default `https://events.1password.com`) | `Authorization: Bearer`                   |
| Users       | `OP_USERS_API_CLIENT_ID`, `OP_USERS_API_CLIENT_SECRET`   | `OP_USERS_API_BASE_URL` (default `https://api.1password.com`) | `Authorization: Bearer <access token>`    |
| OAuth       | `OP_USERS_API_CLIENT_ID`, `OP_USERS_API_CLIENT_SECRET`   | `OP_USERS_API_BASE_URL` (default `https://api.1password.com`) | `Authorization: Basic`                    |
| Partnership | `OP_PARTNERSHIP_API_TOKEN`                               | `OP_PARTNERSHIP_API_BASE_URL` (default `https://billing.1password.com`) | `Authorization: Bearer`                   |

1Password publishes no environment variable names for the Events, Users or
Partnership APIs; the names above are this SDK's. Accounts outside the US use a
regional host: `*.1password.ca`, `*.1password.eu` or `*.ent.1password.com`.

The Users credentials exchange the OAuth application's client ID and secret
for a 15-minute access token at `POST /v1/oauth/token`, through the `HttpClient`
the layer is built with, cache it, and request a new one shortly before it expires. To pass values directly, use `connectCredentials({ token })`,
`eventsCredentials({ token })`, `usersCredentials({ clientId, clientSecret })`,
`usersCredentialsFromAccessToken({ accessToken })`, `oauthCredentials(...)` or
`partnershipCredentials({ token })`; secrets are `Redacted<string>`.

### SDK

| Method | Set | Sent as |
| ------ | --- | ------- |
| Service account | `OP_SERVICE_ACCOUNT_TOKEN` (needs `@1password/sdk-core`) | WASM core |
| Desktop app | `OP_ACCOUNT` (account name or UUID; app setting "Integrate with other apps") | the app's IPC library |

Optional `OP_INTEGRATION_NAME` and `OP_INTEGRATION_VERSION`. Or pass values:
`sdkServiceAccountCredentials({ token })` / `sdkDesktopAppCredentials({ accountName })`,
then `sdkClientLayer`-based `SdkClientLive`. The client is scoped: it is released when
the layer closes, and re-initialised once when a desktop session expires.
