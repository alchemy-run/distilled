# @distilled.cloud/npm

Effect-native SDK for the [npm registry API](https://api-docs.npmjs.com/), generated from npm's
[OpenAPI documents](https://github.com/npm/api-documentation/tree/main/api).

## Installation

```bash
npm install @distilled.cloud/npm effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Npm from "@distilled.cloud/npm";

const program = Effect.gen(function* () {
  const { objects = [] } = yield* Npm.search.searchPackages({ text: "effect", size: 5 });
  const { public: isPublic } = yield* Npm.access.getPackageVisibility({
    escapedPackageName: "@npmcli/arborist",
  });
  return { packages: objects.map((result) => result.package?.name), isPublic };
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Npm.CredentialsFromEnv, Npm.NpmProtocol);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Modules

One module per document npm publishes: `access`, `audit`, `oidc`, `org`,
`packageVersionStatus`, `publish`, `search`, `stage`, `team`, `token` and `trust`.

Pass package names as they are (`@npmcli/arborist`). The SDK URL-encodes path parameters, so a
name that is already escaped (`@npmcli%2Farborist`) is encoded twice.

`stage.getStagePackageTarball` returns the tarball as a `Uint8Array`.

## Auth

`NPM_TOKEN` as `Authorization: Bearer`, from a granular access token, a session token from
`npm login`, or the token `oidc.exchangeOidcToken` returns. The token is optional: search, bulk
audit and public package reads work without one. `NPM_API_BASE_URL` sets the registry and
defaults to `https://registry.npmjs.org`.

Writes on an account with two-factor authentication take the one-time password as the `npmOtp`
input member (the `npm-otp` header).

`oidc.exchangeOidcToken` takes the CI provider's OIDC id_token as its bearer token. Give that
call its own credentials:

```ts
import * as Redacted from "effect/Redacted";

// Inside Effect.gen, with the id_token from the CI provider in `idToken`:
const { token } = yield* Npm.oidc
  .exchangeOidcToken({ package_name: "my-package" })
  .pipe(Effect.provide(Npm.credentials({ token: Redacted.make(idToken) })));
```
