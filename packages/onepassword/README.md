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

Each API is a service namespace with its own credentials layer and protocol. A service is also importable on its own, e.g. `@distilled.cloud/onepassword/connect`.

| API         | Operations                                    | Credentials                             | Protocol              |
| ----------- | --------------------------------------------- | --------------------------------------- | --------------------- |
| Connect     | `Onepassword.connect.getVaults`, …        | `ConnectCredentialsFromEnv`                  | `ConnectProtocol` |
| Events      | `Onepassword.events.getAuditEventsV2`, …      | `EventsCredentialsFromEnv`              | `EventsProtocol`      |
| Users       | `Onepassword.users.listUsers`, …              | `UsersCredentialsFromEnv`               | `UsersProtocol`       |
| OAuth       | `Onepassword.oauth.requestAccessToken`, …     | `OAuthCredentialsFromEnv`               | `OAuthProtocol`       |
| Partnership | `Onepassword.partnership.createPartnerAccount`, … | `PartnershipCredentialsFromEnv`     | `PartnershipProtocol` |

## Quick start

Connect (a self-hosted Connect server):

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Onepassword from "@distilled.cloud/onepassword";

const program = Effect.gen(function* () {
  const vaults = yield* Onepassword.connect.getVaults({});
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

const program = Effect.gen(function* () {
  // Start a cursor with a page size and a start time, then pass the returned
  // `cursor` back as `{ body: { cursor } }` to continue.
  const page = yield* Onepassword.events.getAuditEventsV2({
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

const program = Onepassword.users.suspendUser({
  account: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  user: "ZYXWVUTSRQPONMLKJIHGFEDCBA",
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Onepassword.UsersCredentialsFromEnv,
  Onepassword.UsersProtocol,
);

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
for a 15-minute access token at `POST /v1/oauth/token`, cache it, and request a
new one shortly before it expires. To pass values directly, use `connectCredentials({ token })`,
`eventsCredentials({ token })`, `usersCredentials({ clientId, clientSecret })`,
`usersCredentialsFromAccessToken({ accessToken })`, `oauthCredentials(...)` or
`partnershipCredentials({ token })`; secrets are `Redacted<string>`.
