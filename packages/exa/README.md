# @distilled.cloud/exa

Effect-native SDK for the [Exa](https://exa.ai) search API, generated from Exa's
[OpenAPI specs](https://exa.ai/docs/admin/openapi-spec): the public API
([`exa-spec.json`](https://exa.ai/docs/exa-spec.json)) and the Team Management API
([`team-management-spec.yaml`](https://exa.ai/docs/team-management-spec.yaml)).

## Installation

```bash
npm install @distilled.cloud/exa effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Exa from "@distilled.cloud/exa";

const program = Effect.gen(function* () {
  const { results } = yield* Exa.api.search({
    query: "Effect TypeScript library",
    numResults: 3,
  });
  const contents = yield* Exa.api.getContents({
    urls: results.map((result) => result.url),
    text: { maxCharacters: 2000 },
  });
  return (contents.results ?? []).map((page) => ({ title: page.title, text: page.text }));
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Exa.CredentialsFromEnv, Exa.ExaProtocol);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

One module per API:

- `Exa.api`: search, contents, answer, search monitors, Agent runs, batches and Websets.
  Its calls go through `Exa.ExaProtocol`.
- `Exa.teamManagement`: API keys and team credits. Its calls go through
  `Exa.ExaTeamManagementProtocol`.

Lists page by cursor: `Exa.api.listWebsets.pages({})` and `Exa.api.listWebsets.items({})`
follow `nextCursor`.

## Auth

Both APIs take the key in the `x-api-key` header.

- `EXA_API_KEY`: the API key for `Exa.api`, from the [dashboard](https://dashboard.exa.ai/api-keys).
  Requests go to `https://api.exa.ai`. `EXA_API_BASE_URL` overrides it.
- `EXA_SERVICE_API_KEY` (optional): the service API key for `Exa.teamManagement`, from the
  dashboard's "Service keys" tab. Requests go to `https://admin-api.exa.ai/team-management`.
  Without it, Team Management calls send `EXA_API_KEY`.

`Exa.credentials({ apiKey, serviceApiKey, apiBaseUrl, teamManagementBaseUrl })` builds the same
layer from `Redacted` values.

## Not supported

- Streaming (server-sent events) is not generated. `stream: true` on `search` and `answer`, and
  `accept: "text/event-stream"` on `createAgentRun` and `listAgentRunEvents`, return an event
  stream that the REST protocol cannot decode. Leave them unset to get JSON.
- The batch operations need Exa's beta header: pass `exaBeta: "batches-2026-06-06"`.
