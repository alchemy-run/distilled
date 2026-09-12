# @distilled.cloud/github

Effect-native GitHub REST SDK, generated from GitHub's official OpenAPI
description.

## Receiving webhooks

`Webhooks.constructEvent` verifies `X-Hub-Signature-256` against the raw
request body, then validates the delivery headers and JSON payload using
schemas generated from GitHub's `x-webhooks` description. It uses WebCrypto
and works in Workers, Bun, and Node environments with WebCrypto available.

```typescript
import { Webhooks } from "@distilled.cloud/github";
import { Effect } from "effect";

const event = await Effect.runPromise(Webhooks.constructEvent({
  id: request.headers.get("x-github-delivery"),
  name: request.headers.get("x-github-event"),
  signature: request.headers.get("x-hub-signature-256"),
  secret: webhookSecret,
  payload: await request.arrayBuffer(),
}));

if (event.name === "push") {
  console.log(event.payload.ref);
}
if (event.name === "pull_request" && event.payload.action === "opened") {
  console.log(event.payload.pull_request.number);
}
```

`verifySignature` validates only the signature. `parseEvent` validates the
headers and payload without signature verification, for deliveries already
verified by another component. Both byte bodies and strings are accepted;
never reserialize JSON before verifying. Secrets may be strings or `Redacted`.

Failures are typed as `GitHubWebhookSignatureError` and
`GitHubWebhookPayloadParseError`. Unknown event names and invalid payloads
produce parse errors. Verification does not deduplicate deliveries; use the
`id` when your handler needs idempotency.

Import `WebhookEvent`, `WebhookEventName`, and `WebhookPayloads` from the
package or `@distilled.cloud/github/Webhooks`. Payload schemas are available
from `@distilled.cloud/github/WebhookEvents`. Alchemy owns endpoint
provisioning and routes deliveries to these helpers.

## Pagination and repository identity

Paginated operations expose Effect streams through `.pages(input)` and
`.items(input)`, including on the function returned by `yield* operation`:

```typescript
import { Effect, Stream } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { credentials } from "@distilled.cloud/github";
import * as Repos from "@distilled.cloud/github/repos";

const program = Effect.gen(function* () {
  const list = yield* Repos.listForAuthenticatedUser;
  const repositories = yield* Stream.runCollect(list.items({ per_page: 100 }));
  const repository = yield* Repos.getById({ repository_id: 1296269 });
  return { repositories, repository };
});

const result = await Effect.runPromise(program.pipe(
  Effect.provide(credentials({ token: "..." })),
  Effect.provide(FetchHttpClient.layer),
));
```

Pagination follows GitHub's `Link` header until `rel="next"` is absent.
`.pages()` preserves each endpoint's response shape; `.items()` flattens
bare arrays and modeled list envelopes such as `variables` or `environments`.
The converter enables this for unambiguous list responses with modeled
`page`, cursor (`after`/`before` or `cursor`), or numeric `since` parameters. Endpoints with multiple
possible result arrays remain ordinary operations. Repeated next tokens fail
instead of looping. Streams preserve the caller's filters and API host.

`getById` uses GitHub's supported but undocumented
`GET /repositories/{repository_id}` route, so repository renames and transfers
do not change the lookup key. Its OpenAPI addition lives in
`patches/get-by-id.patch.json` and shares the full-repository response schema.

## Spec source

The generator reads a single file:

```
specs/rest-api-description/descriptions/api.github.com/api.github.com.json
```

That file is ~13 MB. The repository it lives in,
[github/rest-api-description](https://github.com/github/rest-api-description),
is **~6.7 GB checked out** — it ships every GitHub Enterprise Server version
back to 2.18, each in both dereferenced and non-dereferenced form, in both
JSON and YAML. Almost none of that is working tree we want: the git objects
are only tens of MB, so the cost is entirely in materialised files.

The submodule is therefore **sparse-checked-out to the one file we consume**.

### Fetching it

```bash
pnpm specs:fetch
```

Run this from `packages/github`. It initialises the submodule, narrows it to
the single description file, and leaves ~13 MB on disk.

### The footgun

Sparse-checkout config lives in **local git config**, not in the repository,
so it does not travel with a clone. Two consequences:

- A fresh **`pnpm specs:sync` at the repo root** — which does a plain
  `git submodule update --init --recursive` across every package — expands
  this submodule to the full 6.7 GB. It is not wrong, just very expensive.
- `specs:fetch` itself checks out *before* it narrows, so it also passes
  through the full tree once on a cold clone.

To populate it from cold without ever materialising 6.7 GB, configure sparse
checkout **before** anything is checked out:

```bash
SHA=$(git ls-tree HEAD packages/github/specs/rest-api-description | awk '{print $3}')
P=packages/github/specs/rest-api-description
rm -rf "$P" && mkdir -p "$P"
git -C "$P" init -q
git -C "$P" remote add origin https://github.com/github/rest-api-description.git
git -C "$P" sparse-checkout set --no-cone descriptions/api.github.com/api.github.com.json
git -C "$P" fetch --depth=1 origin "$SHA"
git -C "$P" checkout -q FETCH_HEAD
git submodule absorbgitdirs "$P"
```

The real fix is to mirror the one file we consume into
`alchemy-run/distilled-spec-github`, the pattern `neon` / `gcp` / `supabase`
already use, which removes the sharp edge entirely. Tracked in
[`todo.md`](../../todo.md).
