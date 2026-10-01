# @distilled.cloud/openrouter

Effect-native [OpenRouter](https://openrouter.ai) SDK, generated from
[openrouter.ai/openapi.json](https://openrouter.ai/openapi.json): chat
completions, responses, embeddings, images, video, speech, transcription, and
the account surface (keys, credits, guardrails, BYOK, workspaces).

## Installation

```bash
npm install @distilled.cloud/openrouter effect
```

## Quick start

Transcribe a recording with word-level timestamps:

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as OpenRouter from "@distilled.cloud/openrouter";

const program = Effect.gen(function* () {
  const transcript = yield* OpenRouter.createAudioTranscriptions({
    model: "nvidia/parakeet-tdt-0.6b-v3",
    input_audio: { url: "https://example.com/meeting.mp3" },
    response_format: "verbose_json",
    timestamp_granularities: ["word"],
  });
  for (const w of transcript.words ?? []) {
    console.log(`${w.start.toFixed(2)}s ${w.word}`);
  }
  return transcript.text;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  OpenRouter.CredentialsFromEnv,
  OpenRouter.OpenRouterProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

The request also takes `diarize: true` for speaker labels on `words`, which
needs `response_format: "verbose_json"`. Which models accept it is up to
OpenRouter's providers; one that cannot answers `BadRequest`.

Every operation sits on the package root: `OpenRouter.getModels`,
`OpenRouter.sendChatCompletionRequest`, `OpenRouter.createEmbeddings`,
`OpenRouter.getCredits`, `OpenRouter.listKeys`, …

## Errors

Out of credit is `PaymentRequired` (HTTP 402) and is not retried. Rate limits
(`TooManyRequests`) and 5xx are retried by the default policy; turn that off
with `OpenRouter.Retry.none`. Anything unmapped arrives as
`UnknownOpenRouterError` with OpenRouter's `code`, `message` and raw `body`.

## Streaming and binary responses

Operations that stream (`stream: true` on chat completions, responses and
messages) answer with `text/event-stream`, and speech, video and file
downloads answer with binary bodies; the generated operations decode JSON only,
so call those with `stream` unset, or use `fetch` for the stream itself.

## Auth

Required: `OPENROUTER_API_KEY`, sent as `Authorization: Bearer`. Optional:
`OPENROUTER_API_BASE_URL` (default `https://openrouter.ai/api/v1`). The
management endpoints (`/keys`, guardrails, workspaces) need a management key.
