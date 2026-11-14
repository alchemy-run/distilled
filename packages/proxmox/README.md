# @distilled.cloud/proxmox

Effect-native Proxmox VE SDK, generated from the API schema behind Proxmox's
[API viewer](https://pve.proxmox.com/pve-docs/api-viewer/): 680 operations in 49 modules.

## Installation

```bash
npm install @distilled.cloud/proxmox effect
```

## Quick start

This program lists all guests and counts the settings in each guest's configuration:

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Proxmox from "@distilled.cloud/proxmox";

const program = Effect.gen(function* () {
  const guests = yield* Proxmox.cluster.getClusterResources({ type: "vm" });
  for (const guest of guests) {
    if (!guest.node || !guest.vmid) continue;
    const input = { node: guest.node, vmid: guest.vmid };
    const config =
      guest.type === "lxc"
        ? yield* Proxmox.nodesLxc.getNodesByNodeLxcByVmidConfig(input)
        : yield* Proxmox.nodesQemu.getNodesByNodeQemuByVmidConfig(input);
    console.log(guest.vmid, guest.type, Object.keys(config).length);
  }
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Proxmox.CredentialsFromEnv,
  Proxmox.ProxmoxProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Operation names combine the HTTP method and the path, because Proxmox reuses operation names on
different paths. Each operation's doc comment shows its method and path, for looking it up in
Proxmox's [API viewer](https://pve.proxmox.com/pve-docs/api-viewer/).

## Auth

Required: `PROXMOX_ENDPOINT`, `PROXMOX_TOKEN_ID` and `PROXMOX_TOKEN_SECRET`. Sent as
`Authorization: PVEAPIToken=<token ID>=<secret>`.

`PROXMOX_ENDPOINT` is `https://<host>:8006`, with or without `/api2/json`, for example
`https://pve.example.com:8006`. Any other scheme or path, credentials in the URL, a query or a
fragment fail with `ConfigError`. The token ID has the form `<user>@<realm>!<token name>`, for
example `automation@pve!sdk`.

To pass the values in code, use `Proxmox.credentials({ endpoint, tokenId, tokenSecret })` with
the token ID and secret as `Redacted` values.

### Private certificate authority

Proxmox nodes often serve a certificate from their own cluster CA. To trust it on Node, provide
the HTTP client from `@effect/platform-node` with that CA instead of `FetchHttpClient.layer`:

```ts
import { readFileSync } from "node:fs";
import * as NodeHttpClient from "@effect/platform-node/NodeHttpClient";

const Live = Layer.mergeAll(
  NodeHttpClient.layerNodeHttpOptions({
    ca: readFileSync("pve-root-ca.pem", "utf8"),
    rejectUnauthorized: true,
  }),
  Proxmox.CredentialsFromEnv,
  Proxmox.ProxmoxProtocol,
);
```

The client still verifies the certificate and the hostname.

## Protocol

- Request bodies are JSON. Proxmox reads a boolean parameter only as `1` or `0`, so top-level
  booleans are sent that way, in the query string too.
- Every response is `{ "data": ... }`. Operations return `data`.
- Proxmox returns many booleans as `1` or `0`, so boolean outputs are typed `boolean | 0 | 1`.
- Indexed settings such as `net0` and `net1` are typed as `` net${number} `` keys. The schema
  gives no upper bound, so the server decides which indexes exist.
- Settings such as `net0` are property strings (`name=eth0,bridge=vmbr0,ip=dhcp`). Operations
  take and return them as raw strings.
- The API has no pagination.

## Errors

| Proxmox response                         | Client error                                       |
| ---------------------------------------- | -------------------------------------------------- |
| HTTP 500 for a guest that does not exist | `GuestNotFound` (Proxmox does not return 404 here) |
| Other error statuses                     | Tagged status errors, such as `BadRequest`         |
| Unknown status                           | `UnknownProxmoxError`                              |

When Proxmox rejects parameters (HTTP 400), the `BadRequest` message lists each rejected
parameter and the reason Proxmox gives.

## Tasks

Most write operations start a task and return its ID. `waitForTask` polls the task until it stops
(by default for up to 2 minutes) and fails with `TaskFailed` or `TaskTimeout`:

```ts
const startAndWait = Effect.gen(function* () {
  const input = { node: "node1", vmid: 4242 };
  const upid = yield* Proxmox.nodesLxc.postNodesByNodeLxcByVmidStatusStart(input);
  const task = yield* Proxmox.waitForTask(input.node, upid, { timeout: "5 minutes" });
  return task.warnings;
});
```

A task that stops with warnings succeeds and reports how many there were.

## Limits

- File uploads, binary downloads and WebSocket endpoints are not supported. The schema lists
  them, but the generated operations cannot use them.
- Having an operation in the SDK does not mean a token may call it. Some are root-only.
- The schema documents the current Proxmox VE release. Older nodes may not know newer operations
  or parameters.

## Source

The spec mirror `spec-mirror-proxmox` downloads the API viewer's `apidoc.js` and stores only the
structure of its API schema. It keeps no Proxmox documentation text, so members have no doc
comments.
