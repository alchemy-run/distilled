# @distilled.cloud/notion

Effect-native Notion SDK, generated from [Notion's OpenAPI description](https://developers.notion.com/openapi.json).

## Installation

```bash
npm install @distilled.cloud/notion effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Notion from "@distilled.cloud/notion";

const program = Effect.gen(function* () {
  const { results } = yield* Notion.search.searchByTitle({ query: "Roadmap", page_size: 1 });
  const first = results[0];
  if (first === undefined || first.object !== "page") return undefined;
  return yield* Notion.pages.getPage({ page_id: first.id });
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Notion.CredentialsFromEnv,
  Notion.NotionProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Paginated operations (`listUsers`, `listBlockChildren`, `queryDataSource`, `searchByTitle`, …) also expose `.pages(input)` and `.items(input)` streams that follow `next_cursor`.

## Auth

`NOTION_TOKEN` (an integration secret, personal access token, or OAuth access token) as `Authorization: Bearer`. Every request also sends `Notion-Version` (default `2026-03-11`; override with `NOTION_VERSION`). Optional `NOTION_API_BASE_URL` (default `https://api.notion.com`).

The OAuth token endpoints (`/v1/oauth/token`, `/v1/oauth/revoke`, `/v1/oauth/introspect`) are not part of the SDK: they authenticate with HTTP Basic client credentials, not the bearer token.
