# @distilled.cloud/openai

Effect-native OpenAI SDK, generated from [openai/openai-openapi](https://github.com/openai/openai-openapi) — the inference API and the Admin API.

## Installation

```bash
npm install @distilled.cloud/openai effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as OpenAI from "@distilled.cloud/openai";

const program = Effect.gen(function* () {
  const response = yield* OpenAI.responses.createResponse({
    model: "gpt-5-nano",
    input: "Write a haiku about Effect.",
  });
  return response.output;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  OpenAI.CredentialsFromEnv,
  OpenAI.OpenAIProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Streaming

Endpoints that stream server-sent events have an `…Stream` sibling that sends
`stream: true` and returns a `Stream` of decoded events —
`responses.createResponseStream`, `chat.createChatCompletionStream`,
`completions.createCompletionStream`, `audio.createTranscriptionStream`,
`images.createImageStream` / `createImageEditStream`, the Assistants
`create…RunStream` operations and `agents.createAgentSessionStream`.
`agents.listAgentSessionEvents` only streams. Chat/completion/Assistants
streams end at `data: [DONE]`.

```ts
import { Effect, Stream } from "effect";
import * as OpenAI from "@distilled.cloud/openai";

const program = OpenAI.responses
  .createResponseStream({ model: "gpt-5-nano", input: "Count to five." })
  .pipe(
    Stream.runForEach((event) =>
      event.type === "response.output_text.delta"
        ? Effect.sync(() => process.stdout.write((event as { delta: string }).delta))
        : Effect.void,
    ),
  );
```

## Pagination

List operations page with OpenAI's `after` cursor until `has_more` is false:

```ts
const files = yield* OpenAI.files.listFiles.items({}).pipe(Stream.runCollect);
```

## Auth

`Authorization: Bearer <key>`, with the key chosen per operation:

- `OPENAI_API_KEY` — the inference/platform API (responses, chat, files, …).
- `OPENAI_ADMIN_KEY` — the Admin API (`/organization/*`, project roles).
  Calling an admin operation without it fails with `MissingCredentials`
  before any request is sent.

Optional: `OPENAI_BASE_URL` (default `https://api.openai.com/v1`),
`OPENAI_ORGANIZATION` / `OPENAI_PROJECT` (sent as `OpenAI-Organization` /
`OpenAI-Project`). Or build the layer yourself with
`OpenAI.credentials({ apiKey: Redacted.make(…), adminKey: Redacted.make(…) })`.

## Errors

Besides each operation's status errors, every call can fail with the
account-wide `InvalidApiKey`, `InsufficientQuota` (not retried),
`RateLimitExceeded` (retried as throttling) and `ModelNotFound`, matched on
OpenAI's `{ "error": { "code", "type", … } }` body. The inference operations
also type `ContextLengthExceeded`.
