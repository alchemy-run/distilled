# @distilled.cloud/anthropic

Effect-native [Anthropic API](https://docs.anthropic.com/en/api) SDK, generated from Anthropic's OpenAPI spec (the last published Stainless spec, [2026-09-02](https://storage.googleapis.com/stainless-sdk-openapi-specs/anthropic/anthropic-465bff21a179090915396565d1ae8f705cf8596e2ec920eb121072f25b8a7d68.yml) — see `stacks/distilled-submodules/spec-repos/anthropic/readme.md`).

237 operations: Messages (with streaming), Message Batches, Models, token counting, Files, Skills, the managed-agents betas (sessions, agents, deployments, environments, vaults, memory stores, tunnels, …) and the Admin API (`/v1/organizations/*`).

## Installation

```bash
npm install @distilled.cloud/anthropic effect
```

## Quick start

```ts
import { Effect, Layer, Stream } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Anthropic from "@distilled.cloud/anthropic";

const program = Effect.gen(function* () {
  const message = yield* Anthropic.createMessage({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 256,
    messages: [{ role: "user", content: "Hello, Claude" }],
  });
  console.log(message.content);

  // Same input, streamed: one server-sent event per element.
  yield* Anthropic.createMessageStream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 256,
    messages: [{ role: "user", content: "Write a haiku about Effect" }],
  }).pipe(
    Stream.runForEach((event) =>
      Effect.sync(() => {
        if (event.type === "content_block_delta" && "delta" in event && "text" in event.delta) {
          process.stdout.write(event.delta.text);
        }
      }),
    ),
  );
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Anthropic.CredentialsFromEnv,
  Anthropic.AnthropicProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

| Variable | Sent as | Used for |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | `x-api-key` | every route except `/v1/organizations/*` |
| `ANTHROPIC_ADMIN_KEY` | `x-api-key` | Admin API routes (`/v1/organizations/*`) |
| `ANTHROPIC_AUTH_TOKEN` | `Authorization: Bearer` | fallback for both when no key applies |
| `ANTHROPIC_BASE_URL` | — | API root (default `https://api.anthropic.com`) |

Every request sends `anthropic-version: 2023-06-01`. An operation whose credential is missing fails with `MissingAnthropicCredentials` before anything is sent. Build credentials in code with `Anthropic.fromApiKey(Redacted.make(key), { betas, apiVersion, apiBaseUrl })`, `fromAdminKey`, `fromAuthToken`, or `credentials({ … })`.

## Betas

`anthropic-beta` is an input member (`anthropicBeta`) on every operation whose route accepts it, and `betas: [...]` on the credentials sets a default for all calls. Beta routes that shadow a GA operation carry `Beta` in the name (`createBetaMessage`, `listBetaFiles`) and send `?beta=true`; beta-only APIs (managed agents, the Admin API) do not.

## Errors

Failures are typed by the envelope's `error.type`: `InvalidRequest`, `AuthenticationFailed`, `PaymentRequired`, `PermissionDenied`, `ResourceNotFound`, `RequestTooLarge`, `RateLimited`, `ApiServerError`, `RequestTimeout`, `Overloaded` (529). An `error` event in the middle of a stream fails the stream with the same classes. `RateLimited`, `Overloaded`, `ApiServerError` and `RequestTimeout` are retryable and carry the server's `retryAfter` hint.

## Pagination and downloads

List operations expose `.pages(input)` and `.items(input)` streams (`after_id`/`has_more` lists and `page`/`next_page` lists alike). File content, skill-version archives and message-batch results (JSONL) are returned as raw `Uint8Array` bytes.
