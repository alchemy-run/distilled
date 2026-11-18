# @distilled.cloud/mux

Effect-native [Mux](https://www.mux.com) SDK, generated from Mux's official
OpenAPI description, [`https://www.mux.com/api-spec.json`](https://www.mux.com/api-spec.json).
It covers every non-deprecated operation of the Mux API at `api.mux.com`:
142 operations in four services.

| Import | Covers |
| --- | --- |
| `@distilled.cloud/mux/video` | assets, live streams, direct uploads, playback IDs and restrictions, DRM, transcription vocabularies, delivery usage |
| `@distilled.cloud/mux/data` | video views, errors, dimensions, metrics, subview metrics, engagement, monitoring, incidents, annotations, exports |
| `@distilled.cloud/mux/system` | whoami, signing keys, webhooks, usage exports |
| `@distilled.cloud/mux/robots` | AI jobs (summarize, chapters, captions, translation, moderation, …) and directives |

## Installation

```bash
npm install @distilled.cloud/mux effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as Stream from "effect/Stream";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Mux from "@distilled.cloud/mux";
import * as System from "@distilled.cloud/mux/system";
import * as Video from "@distilled.cloud/mux/video";

const program = Effect.gen(function* () {
  // Which environment the access token belongs to.
  const { data: whoami } = yield* System.getWhoami({});

  // One page...
  const { data: page } = yield* Video.listAssets({ limit: 10 });

  // ...or every asset, page by page.
  const assets = yield* Video.listAssets
    .items({ limit: 100 })
    .pipe(Stream.take(25), Stream.runCollect);

  // Typed failures: a deleted asset is a NotFound, a malformed ID a BadRequest.
  const missing = yield* Video.getAsset({ ASSET_ID: "does-not-exist" }).pipe(
    Effect.map(() => false),
    Effect.catchTags({
      NotFound: () => Effect.succeed(true),
      BadRequest: () => Effect.succeed(true),
    }),
  );

  return {
    environment: whoami.environment_name,
    firstPage: page.map((asset) => asset.id),
    total: assets.length,
    missing,
  };
});

const MuxLive = Layer.mergeAll(FetchHttpClient.layer, Mux.CredentialsFromEnv, Mux.MuxProtocol);

program.pipe(Effect.provide(MuxLive), Effect.runPromise).then(console.log);
```

## Auth

`CredentialsFromEnv` reads the same variables as Mux's official SDKs:

- `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET`: an
  [Access Token](https://dashboard.mux.com/settings/access-tokens) sent as
  HTTP Basic auth. Access tokens are scoped to one Mux environment.
- `MUX_AUTHORIZATION_TOKEN`: an OAuth token sent as `Authorization: Bearer`.
  It wins when both are set.
- `MUX_BASE_URL` (optional): defaults to `https://api.mux.com`.

To pass credentials explicitly, use `Mux.fromAccessToken({ tokenId, tokenSecret })`
or `Mux.fromAuthorizationToken({ authorizationToken })`. Secrets are
`Redacted.Redacted<string>` values (`Redacted.make(...)` from `effect/Redacted`).

## Responses

Responses keep Mux's wire shape: a resource arrives as `{ data: ... }`, a list
as `{ data: [...] }`. Member names stay snake_case, as in Mux's API reference.

Live-stream ingest credentials come back as `Redacted` values: `stream_key`,
`srt_passphrase`, a simulcast target's `stream_key` and SRT `url`, a direct
upload's signed `url`, a signing key's `private_key`, and a webhook's
`signing_secret`. Read them with
`Redacted.value`. Inputs take a plain string or a `Redacted`.

## Pagination

Lists that take `page` are paginated: `.pages(input)` streams responses and
`.items(input)` streams the `data` entries. Like Mux's official SDKs, the
stream asks for `page`, `page + 1`, … and stops at the first empty page.

## Errors

A failure maps by HTTP status onto `BadRequest`, `Unauthorized`, `Forbidden`,
`NotFound`, `Conflict`, `UnprocessableEntity`, `TooManyRequests` or a 5xx class.
Mux's `error.messages` become `message`, and the raw response (with
`error.type`, such as `invalid_parameters`) is on `body`. A malformed ID is a
`BadRequest`, not a `NotFound`: Mux answers `Failed to parse ID` with a 400.
`listUsageExports` also fails with `PreconditionFailed` while that period's
usage CSVs are still being generated. Any other status is an `UnknownMuxError`
whose `code` is Mux's `error.type`. For example, a route your plan does not
include answers 402 with code `payment_required`. With
`ResponseValidation.strict`, a response that does not match the schema is a
`MuxParseError`.

`listDrmConfigurations` returns `{ "data": {} }`, not an empty list, in an
environment without DRM. `.pages()` and `.items()` read that page as empty;
a direct call returns the body as sent (and `ResponseValidation.strict` fails
it), so check `Array.isArray(data)` before iterating it.

## Not covered

- `image.mux.com` (thumbnails, animated GIFs, storyboards) and
  `stream.mux.com` (HLS manifests, MP4 renditions, text tracks) are playback
  URLs that answer images, video and VTT, not API calls. Build them from a
  playback ID. Mux describes them in
  [`full-combined-spec.json`](https://www.mux.com/full-combined-spec.json).
- Webhooks are events Mux sends to you. Their AsyncAPI description is
  [`webhook-spec.json`](https://www.mux.com/webhook-spec.json).
- Deprecated operations are skipped, and each has a generated replacement:
  Robots v0 is replaced by Robots, URL signing keys by System signing keys,
  Real-Time by Monitoring, and Filters by Dimensions.
