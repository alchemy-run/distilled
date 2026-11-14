# @distilled.cloud/anthropic

Effect-native SDK for the [Claude Platform](https://platform.claude.com/docs/en/api/overview)
(Anthropic) API, generated from the OpenAPI document Anthropic's official SDKs are generated
from ([`scripts/mock-spec.json.gz`](https://github.com/anthropics/anthropic-sdk-typescript/blob/main/scripts/mock-spec.json.gz)
in anthropics/anthropic-sdk-typescript).

It covers the Messages API, models, files, skills, user profiles, the Admin API
(`organizations`), and the beta surfaces, among them the
[managed agents platform](https://platform.claude.com/docs/en/managed-agents/overview):
agents, environments, sessions, vaults, memory stores and deployments.

## Installation

```bash
npm install @distilled.cloud/anthropic effect
```

## Quick start

Create an agent and an environment, start a session, send it a message, and read the
session's events back:

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Anthropic from "@distilled.cloud/anthropic";

// Every managed agents call names its beta.
const anthropicBeta = ["managed-agents-2026-04-01"];

const program = Effect.gen(function* () {
  const agent = yield* Anthropic.betaAgents.createAgent({
    anthropicBeta,
    name: "Coding Assistant",
    model: "claude-opus-5-5",
    system: "You are a helpful coding assistant. Write clean, well-documented code.",
    tools: [{ type: "agent_toolset_20260401" }],
  });

  const environment = yield* Anthropic.betaEnvironments.createEnvironment({
    anthropicBeta,
    name: "quickstart-env",
    config: { type: "cloud", networking: { type: "limited", allow_package_managers: true } },
  });

  const session = yield* Anthropic.betaSessions.createSession({
    anthropicBeta,
    agent: agent.id,
    environment_id: environment.id,
    title: "Quickstart session",
  });

  yield* Anthropic.betaSessions.sendSessionEvents({
    anthropicBeta,
    session_id: session.id,
    events: [
      {
        type: "user.message",
        content: [{ type: "text", text: "Write a Python script that prints the first 10 primes." }],
      },
    ],
  });

  const events = yield* Anthropic.betaSessions.listSessionEvents({
    anthropicBeta,
    session_id: session.id,
  });
  return events.data.map((event) => event.type);
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Anthropic.CredentialsFromEnv,
  Anthropic.AnthropicProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

A plain Messages API call takes the same layer:

```ts
const message = yield* Anthropic.messages.createMessage({
  model: "claude-opus-4-8",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
});
```

## Auth

`ANTHROPIC_API_KEY` as `x-api-key` (an Admin API key for the `organizations` operations).
`ANTHROPIC_BASE_URL` sets the host and defaults to `https://api.anthropic.com`. Every request
carries `anthropic-version`: `2026-10-21` by default, or `ANTHROPIC_VERSION`.
`Anthropic.credentials({ apiKey: Redacted.make(key), apiBaseUrl?, version? })` builds the same
layer in code.

Each operation also takes the request headers the spec declares as optional members:
`anthropicBeta` (sent comma-separated as `anthropic-beta`), `anthropicWorkspaceId`,
`anthropicUserProfileId`, and `anthropicVersion`, which overrides the version for one call.
The SDK does not add a beta on its own: pass the one an endpoint names in its docs, such as
`managed-agents-2026-04-01` for agents, environments and sessions.

## Modules

One module per API area: `messages`, `models`, `files`, `skills`, `userProfiles` and
`organizations`. A route that the API serves as a beta lives in the `beta*` twin of its area
(`betaMessages`, `betaAgents`, `betaEnvironments`, `betaSessions`, `betaVaults`,
`betaMemoryStores`, `betaDeployments`, `betaOrganizations`, …), as the official SDKs put
them under `client.beta`.

Lists paginate with `.pages()` / `.items()`: models and message batches follow `last_id`
while `has_more` is true, and every other list follows `next_page`.

## Files and binary responses

`uploadFile` takes the file as a `Blob`, `Uint8Array` or `ArrayBuffer` and sends it as a
multipart part. Downloads come back as a `Uint8Array`: `downloadFile`,
`downloadSkillVersionContent`, `getPluginVersionContent`, and `getMessageBatchResults` (the
`.jsonl` file; split it on newlines).

## Not supported

- **Streaming.** Server-sent event responses are not REST. Do not set `stream: true` on
  `createMessage`. The session event streams (`/v1/sessions/{id}/events/stream` and the
  thread stream) are left out; `listSessionEvents` and `listSessionThreadEvents` read the
  same events by page.
- **Skill uploads are untested.** `createSkill` and `createSkillVersion` take a list of
  files, and the multipart encoder names each part after its file, which may not be the
  field name the API expects.

## Errors

Every failure is `{ type: "error", error: { type, message } }`. The status picks the class:
the shared HTTP status errors from core, with 529 `overloaded_error` as the retryable
`ServiceUnavailable`. Anything unmapped (402 `billing_error`, 413 `request_too_large`) is an
`UnknownAnthropicError` whose `code` is `error.type`.
