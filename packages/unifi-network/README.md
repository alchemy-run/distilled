# @distilled.cloud/unifi-network

Effect-native UniFi Network SDK, generated from Ubiquiti's [UniFi Network API OpenAPI spec](https://developer.ui.com/network/v11.0.97/openapi.json).

## Installation

```bash
npm install @distilled.cloud/unifi-network effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as UniFiNetwork from "@distilled.cloud/unifi-network";

const program = Effect.gen(function* () {
  const sites = yield* UniFiNetwork.getSiteOverviewPage({});
  const siteId = sites.data[0]!.id;
  return yield* UniFiNetwork.getAdoptedDeviceOverviewPage({ siteId });
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  UniFiNetwork.CredentialsFromEnv,
  UniFiNetwork.UniFiNetworkProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

List operations (`get…Page`) take `offset` and `limit`; `.pages()` and `.items()` stream every page (`Stream` is from `effect`):

```ts
const allClients = yield* UniFiNetwork.getConnectedClientOverviewPage
  .items({ siteId })
  .pipe(Stream.runCollect);
```

## Auth

`UNIFI_API_KEY` as `X-API-KEY`: create one in the Network application under
Settings → Control Plane → Integrations.

Where the console is, by the first of these that is set:

- `UNIFI_API_BASE_URL`: the full base URL (everything before `/v1/...`).
- `UNIFI_CONSOLE_HOST`: a console on the local network, `https://<host>/proxy/network/integration`.
- `UNIFI_CONSOLE_ID`: a console relayed through the UniFi Cloud Connector,
  `https://api.ui.com/v1/connector/consoles/<id>/proxy/network/integration`.

Without environment variables, use `UniFiNetwork.fromApiKey({ apiKey, apiBaseUrl })` with
`Redacted.make(...)`, `UniFiNetwork.localConsoleUrl(host)` or
`UniFiNetwork.cloudConsoleUrl(consoleId)`. A console reached directly usually presents a
self-signed certificate; trust it in your runtime's TLS settings, or use the cloud connector.
