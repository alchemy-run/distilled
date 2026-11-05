# @distilled.cloud/entire

Effect-native [Entire](https://entire.com) SDK, generated from Entire's two OpenAPI documents: the
Core control plane (`https://us.console.entire.io/api/v1/openapi.json`) and the regional cell
(`https://aws-us-east-2.api.entire.io/api/v1/openapi.json`).

## Installation

```bash
npm install @distilled.cloud/entire effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Entire from "@distilled.cloud/entire";

const program = Effect.gen(function* () {
  const me = yield* Entire.identity.getMe({});
  const project = yield* Entire.projects.createProject({
    name: "acme",
    ownerType: "account",
    ownerId: me.global.accountId,
  });
  const repo = yield* Entire.repos.createRepo({ projectId: project.id, name: "api" });
  const { items } = yield* Entire.trails.listTrails({ repo_id: repo.id });
  return { repo, trails: items ?? [] };
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Entire.CredentialsFromEnv);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Two APIs, one token

| Module | API | Host |
| --- | --- | --- |
| `orgs`, `projects`, `repos`, `mirrors`, `nativeMirrors`, `serviceAccounts`, `identity`, `plugins`, `billing`, `clusters`, `meta` | Core control plane | `coreBaseUrl` |
| `trails`, `trailReviews`, `trailDiscussions`, `sessions`, `checkpoints`, `repositories`, `code`, `environments`, `agents`, `runs`, `search`, `brainstore`, … | regional cell | `apiBaseUrl` |

Every operation binds the protocol for its API (`EntireCoreProtocol` or `EntireCellProtocol`), so a
program only provides `Credentials` and an `HttpClient`. `Entire.clusters.listClusters` returns
each cell's `apiUrl` for repos homed outside the US.

The cell's two collisions with Core module names are renamed: its `projects` tag is
`projectTrails` and its `repos` tag is `repoDetails`. Most trail routes exist twice, addressed by
repo id (`listTrails`) and by `{host}/{owner}/{repo}` (`listTrailsBySlug`).

## Auth

Entire issues no long-lived API keys. The bearer is a login access token (from the RFC 8628
device flow at `https://us.auth.entire.io`, or `entire auth token`) or a service-account session
minted by token exchange.

- `ENTIRE_TOKEN` — `Authorization: Bearer` on every request.
- `ENTIRE_CORE_BASE_URL` — optional, default `https://us.console.entire.io`.
- `ENTIRE_API_BASE_URL` — optional, default `https://aws-us-east-2.api.entire.io`.

`Entire.credentials({ token, coreBaseUrl, apiBaseUrl })` builds the same layer from values.

## Errors

Failures are RFC 9457 problem documents; the status picks the class (`NotFound`, `Conflict`,
`UnprocessableEntity`, …) and `detail` becomes the message. Entire adds `MisdirectedRequest` (421,
the resource lives in another region), `Gone` (410), `PreconditionFailed` (412),
`PreconditionRequired` (428) and `PayloadTooLarge` (413).

Server-Sent-Event-only routes are not generated; routes that offer both JSON and
`text/event-stream` are generated as JSON.
