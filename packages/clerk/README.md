# @distilled.cloud/clerk

Effect-native SDK for Clerk's Backend and Platform APIs, generated from the [official OpenAPI descriptions](https://github.com/clerk/openapi-specs) through the [Clerk spec mirror](https://github.com/distilled-mirror/spec-mirror-clerk).

## Installation

```bash
npm install @distilled.cloud/clerk effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Clerk from "@distilled.cloud/clerk";

const program = Effect.gen(function* () {
  const result = yield* Clerk.getUserList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Clerk.CredentialsFromEnv,
  Clerk.ClerkProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Backend calls require `CLERK_SECRET_KEY`, sent as `Authorization: Bearer`. Optional: `CLERK_API_BASE_URL` (default `https://api.clerk.com/v1`) and `CLERK_API_VERSION` (default `2026-05-12`, sent as `Clerk-API-Version`).

## Platform API

The Platform API manages workspace applications, instances, configuration, users, organizations, domains, and related resources. It is currently **private beta** and requires [Platform API access](https://github.com/clerk/openapi-specs/blob/main/platform/beta.yml).

Platform operations are imported from `@distilled.cloud/clerk/platform` to avoid collisions with Backend types and operations. They require a separate Platform bearer access token; Backend credentials do not satisfy Platform calls. API keys, OAuth access tokens, and exchanged access tokens are accepted without a token-prefix restriction. Token acquisition and refresh are managed by the caller.

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { PlatformCredentialsFromEnv } from "@distilled.cloud/clerk/Credentials";
import * as Platform from "@distilled.cloud/clerk/platform";

const program = Platform.getMe({});
const Live = Layer.mergeAll(FetchHttpClient.layer, PlatformCredentialsFromEnv);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

`getMe` describes the authenticated principal without modifying resources. `PlatformCredentialsFromEnv` reads `CLERK_PLATFORM_API_KEY` and optional `CLERK_PLATFORM_API_URL` (default `https://api.clerk.com`). The URL may be a host or already end in `/v1`; the protocol adds `/v1` only when needed and does not send `Clerk-API-Version`. For a supplied redacted token, import `platformFromApiKey` from `@distilled.cloud/clerk` and use `platformFromApiKey({ apiKey })` instead of the environment layer.

Per-call headers include `ifMatch` for optimistic config writes, `idempotencyKey` where declared, and `clerkRecipientPublicKey` for supported encrypted-secret responses. List operations expose the spec's cursor or offset parameters; they do not add automatic pagination. Image uploads use multipart form data with `Blob`, `File`, `Uint8Array`, or `ArrayBuffer` file values; the alternate raw octet-stream encoding is not exposed separately.

Platform errors use dedicated tags for supported Clerk error codes, selected by response-body matchers; the shared numeric `code` field is unchanged. Config reads retain typed `config_version` and arbitrary configuration keys.
