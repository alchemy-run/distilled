# @distilled.cloud/unifi

Effect-native UniFi SDK, generated from the OpenAPI specs Ubiquiti publishes at [developer.ui.com](https://developer.ui.com): one service per API.

| Service        | Import                                  | Reached                                | Layers it needs   |
| -------------- | --------------------------------------- | -------------------------------------- | ----------------- |
| Network        | `@distilled.cloud/unifi` (package root) | on the console, local or via connector | `ApiKey`, and `Console` or a per-call `console` |
| Protect        | `@distilled.cloud/unifi/protect`        | on the console, local or via connector | `ApiKey`, and `Console` or a per-call `console` |
| InnerSpace     | `@distilled.cloud/unifi/innerspace`     | on the console, local or via connector | `ApiKey`, and `Console` or a per-call `console` |
| Site Manager   | `@distilled.cloud/unifi/site_manager`   | `api.ui.com` only                      | `ApiKey`          |
| Mobility       | `@distilled.cloud/unifi/mobility`       | `api.ui.com` only                      | `ApiKey`          |
| Carrier Fabric | `@distilled.cloud/unifi/carrier_fabric` | `api.ui.com` only                      | `ApiKey`          |

## Installation

```bash
npm install @distilled.cloud/unifi effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Unifi from "@distilled.cloud/unifi";
import * as SiteManager from "@distilled.cloud/unifi/site_manager";

const program = Effect.gen(function* () {
  // Network, on the console named by UNIFI_CONSOLE_HOST / UNIFI_CONSOLE_ID.
  const sites = yield* Unifi.getSiteOverviewPage({});
  const siteId = sites.data[0]!.id;
  const devices = yield* Unifi.getAdoptedDeviceOverviewPage({ siteId });

  // Site Manager, on api.ui.com.
  const hosts = yield* SiteManager.listHosts({});
  return { devices, hosts };
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Unifi.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Each service has its own protocol: `UniFiNetworkProtocol`, `UniFiProtectProtocol`,
`UniFiInnerSpaceProtocol` and `UniFiCloudProtocol` (Site Manager, Mobility, Carrier Fabric).
Every operation names the one it uses, so a program provides only an `HttpClient` and credentials.

List operations (`get…Page`, `listDevices`, …) take `offset`/`limit`, `pageSize`/`nextToken`
or `limit`/`cursor` as the API does, and `.pages()` / `.items()` stream every page
(`Stream` is from `effect`):

```ts
const allClients = yield* Unifi.getConnectedClientOverviewPage
  .items({ siteId })
  .pipe(Stream.runCollect);
```

## Local or remote: the `Console` layer

A call is built from layers in a chain: `ApiKey` (who you are), `Console` (where the console
is, for Network, Protect and InnerSpace only) and the service's protocol. Network, Protect and
InnerSpace run **on the console**; Site Manager, Mobility and Carrier Fabric exist **only in
the cloud** and need no `Console`.

| | Console-hosted (Network, Protect, InnerSpace) | Cloud-only (Site Manager, Mobility, Carrier Fabric) |
| --- | --- | --- |
| Locally | `https://<console>/proxy/<app>/integration` with a key created in the app (Settings → Control Plane → Integrations) | not available |
| Remotely | through the cloud connector: `https://api.ui.com/v1/connector/consoles/<consoleId>/proxy/<app>/integration` with a Site Manager key (unifi.ui.com/settings/api-keys) | `https://api.ui.com` with a Site Manager key |
| Header | `X-API-KEY` | `X-API-KEY` |
| Errors | `{ code, message, statusCode, statusName, requestId, requestPath, timestamp }` | `{ code, message, httpStatusCode, traceId }` |

Through the connector, each console is limited to 100 requests a minute, a proxied request
must finish within 25 seconds, the response is capped at 10 MB, and the console needs
firmware 5.0.3 or later. A proxied request that takes longer than 25 seconds, or reaches a
console that is offline, fails with a `408` (`{"code":"DeviceTimeout",...}`) and an
unreachable gateway with a `502`; the SDK raises them as `GatewayTimeout` and `BadGateway`,
both retryable (`Unifi.Retry.transient`). A console on the local network presents a
self-signed certificate; trust it in your runtime's TLS settings, or use the connector.

### Choosing local or remote

```ts
import * as Redacted from "effect/Redacted";

const apiKey = Redacted.make(process.env.KEY!);

// A console on the local network, with a key created in the console.
const local = Unifi.fromApiKey({ apiKey, console: Unifi.ConsoleLocation.local("192.168.0.1") });

// The same console through the cloud connector, with a Site Manager key.
const remote = Unifi.fromApiKey({ apiKey, console: Unifi.ConsoleLocation.remote("<consoleId>") });

// Site Manager, Mobility and Carrier Fabric need no console.
const cloud = Unifi.fromApiKey({ apiKey });

program.pipe(Effect.provide(local)); // or remote
```

Pass another `console` to move between local and remote, or between consoles. A console's ID
is `id` in Site Manager's `listHosts`. Ubiquiti issues the two kinds of key in different
places (the console's Integrations settings for local, unifi.ui.com for the connector and the
cloud-only APIs), so provide the `ApiKey` that matches the way in.

Every Network, Protect and InnerSpace operation also takes an optional `console`, which wins
over the layer for that call and is not sent. Build it with `Unifi.ConsoleLocation`; the same
value is `fromApiKey`'s `console`. Like AWS's `Region`, the console is optional in the
operations' types: a call with neither fails with `ConfigError`, and a malformed `console`
fails it with `InvalidInput`:

```ts
const office = Unifi.ConsoleLocation.remote("<consoleId>");
const home = Unifi.ConsoleLocation.local("192.168.0.1");

const sites = yield* Unifi.getSiteOverviewPage({ console: office }); // one call
program.pipe(Effect.provide(Unifi.fromApiKey({ apiKey, console: home }))); // every call in a scope
```

`fromApiKey` checks its console when the layer is built: a host that is more than a host, or a
console ID that can't be a URL path segment, fails the layer with `ConfigError`.

### Another cloud origin

Every cloud call, Site Manager, Mobility, Carrier Fabric and the connector, goes to
`https://api.ui.com` (`Unifi.DEFAULT_CLOUD_BASE_URL`). `fromApiKey`'s optional `apiBaseUrl`
replaces it for all of them, for example to go through a proxy or reach a mock server. It must be
a host or origin; anything else fails the layer with `ConfigError`:

```ts
const viaProxy = Unifi.fromApiKey({ apiKey, apiBaseUrl: "https://unifi-proxy.example" });
```

From the environment, `Unifi.CredentialsFromEnv` provides both layers. Each reads the
environment once, when the layer is built:

- `ApiKeyFromEnv`: `UNIFI_API_KEY`, and optionally `UNIFI_CLOUD_API_BASE_URL` (the cloud
  origin, `https://api.ui.com` by default). Without the key the layer fails with `ConfigError`.
- `ConsoleFromEnv`: `UNIFI_CONSOLE_HOST` (local, a host or origin) or else `UNIFI_CONSOLE_ID`
  (cloud connector). A console ID that can't be a URL
  path segment fails the layer with `ConfigError`. With neither variable set the layer still
  builds, and only a Network, Protect or InnerSpace call fails with `ConfigError`.

## Images

Protect's `getCameraSnapshot` and InnerSpace's `getAsset` (a floor-plan image) return
`{ body, contentType }`: the image as a `Uint8Array` and its `Content-Type` (`image/jpeg` or
`image/png`).

```ts
import * as Protect from "@distilled.cloud/unifi/protect";

const { body, contentType } = yield* Protect.getCameraSnapshot({ id: cameraId });
```

## Not covered

- **Protect's `/v1/subscribe/*`** are WebSocket subscriptions, not REST calls, so no
  operation is generated for them.
