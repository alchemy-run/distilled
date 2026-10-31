# @distilled.cloud/netbird

Effect-native SDK for the [NetBird](https://netbird.io) management API, generated from NetBird's
[OpenAPI spec](https://github.com/netbirdio/netbird/blob/v0.82.0/shared/management/http/api/openapi.yml)
at release `v0.82.0`.

## Installation

```bash
npm install @distilled.cloud/netbird effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as NetBird from "@distilled.cloud/netbird";

const program = Effect.gen(function* () {
  const peers = yield* NetBird.listPeers({});
  for (const peer of peers) {
    const reachable = yield* NetBird.listPeerAccessiblePeers({ peerId: peer.id });
    console.log(peer.name, peer.connected, reachable.map((other) => other.name).join(", "));
  }
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  NetBird.CredentialsFromEnv,
  NetBird.NetBirdProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `NETBIRD_API_TOKEN`, a personal access token, sent as `Authorization: Token`. Optional:
`NETBIRD_API_URL`, the origin of a self-hosted management server (default
`https://api.netbird.io`, NetBird Cloud). Operation paths already start with `/api`.

Use the token of a service user (Team > Service Users) with the narrowest role that works:
`Network Admin` can change groups, policies, routes and DNS but only read peers.

## Patches

NetBird's servers send `null` for some lists the spec declares as arrays (rule `sources` and
`destinations` when a rule targets a single peer, group `peers` and `resources`, policy
`source_posture_checks`), and the spec does not mark several credentials as sensitive (personal
access tokens, setup keys, invite, proxy and SCIM tokens). `patches/` corrects both, with the
evidence in each patch. With them, policy, group, peer and network responses of NetBird Cloud and
of self-hosted NetBird 0.82.0 decode under `ResponseValidation.strict`.
