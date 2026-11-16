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
const Live = Onepassword.UsersCredentialsFromEnv.pipe(Layer.provideMerge(FetchHttpClient.layer));

program.pipe(Effect.provide(Live), Effect.runPromise);
```

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
