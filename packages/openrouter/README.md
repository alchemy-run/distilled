# @distilled.cloud/openrouter

Effect-native [OpenRouter](https://openrouter.ai) SDK, generated from https://openrouter.ai/openapi.json.

## Installation

```bash
npm install @distilled.cloud/openrouter effect
```

## Quick start

```ts
import { Effect, Layer, Stream } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as OpenRouter from "@distilled.cloud/openrouter";

const program = Effect.gen(function* () {
  const completion = yield* OpenRouter.createChatCompletion({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "Say hello in one word." }],
  });
  console.log(completion.choices[0]?.message.content);

  // `stream: true` is set for you; the stream ends at `data: [DONE]`.
  yield* OpenRouter.createChatCompletionStream({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "Count to five." }],
  }).pipe(
    Stream.runForEach((chunk) =>
      Effect.sync(() => process.stdout.write(chunk.choices[0]?.delta.content ?? "")),
    ),
  );
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  OpenRouter.CredentialsFromEnv,
  OpenRouter.OpenRouterProtocol,
);

program.pipe(
  Effect.catchTag("InsufficientCredits", (e) => Effect.logError(e.message)),
  Effect.provide(Live),
  Effect.runPromise,
);
```

## Auth

Both keys are sent as `Authorization: Bearer`. The protocol picks one per
operation from its route:

| Env | Used for |
| --- | --- |
| `OPENROUTER_API_KEY` | inference and everything else — chat completions, responses, messages, embeddings, images, generations, files, presets, … |
| `OPENROUTER_MANAGEMENT_KEY` | account administration — `/keys`, `/guardrails`, `/workspaces`, `/byok`, `/credits`, `/activity`, `/analytics`, `/end-users`, `/observability`, `/organization`, `/private-endpoints`, `/scim`, `/generation/feedback` |

When only one key is set it is used everywhere; with neither set, public
operations (`listModels`, `listProviders`, …) still work. Management keys
cannot call the inference endpoints. Optional: `OPENROUTER_BASE_URL`
(default `https://openrouter.ai/api/v1`), `OPENROUTER_HTTP_REFERER` and
`OPENROUTER_X_TITLE` (app-attribution headers). Use
`OpenRouter.credentials({ apiKey, managementKey, referer, title })` to
configure them in code.

## Streaming

`createChatCompletionStream`, `createResponseStream`, `createMessageStream`
and `createImageStream` return a `Stream` of decoded server-sent events.

## Errors

Failures carry OpenRouter's `{ error: { code, message } }` envelope and are
typed by status: `InvalidApiKey` (401), `InsufficientCredits` (402),
`Forbidden` (403), `ModerationFlagged` (403, flagged input), `RequestTimeout`
(408), `RateLimited` (429), `ProviderError` (502), `NoAvailableProvider`
(503), `ProviderTimeout` (524), `ProviderOverloaded` (529).
