# @distilled.cloud/twitch

Effect-native [Twitch API (Helix)](https://dev.twitch.tv/docs/api/) SDK, generated from the official
[API reference](https://dev.twitch.tv/docs/api/reference/).

Twitch publishes no machine-readable description of the API, so the reference is the spec: its Markdown
pages are mirrored daily and every operation, parameter and response field is read from them. There are
147 operations in 29 modules, one per reference page.

## Installation

```bash
npm install @distilled.cloud/twitch effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Twitch from "@distilled.cloud/twitch";
import * as Channels from "@distilled.cloud/twitch/channels";
import * as Users from "@distilled.cloud/twitch/users";

const program = Effect.gen(function* () {
  const { data: users = [] } = yield* Users.getUsers({ login: ["twitchdev"] });
  const { data: channels = [] } = yield* Channels.getChannelInformation({
    broadcaster_id: users.map((user) => user.id!),
  });
  return channels.map((channel) => ({ name: channel.broadcaster_name, game: channel.game_name }));
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Twitch.CredentialsFromEnv,
  Twitch.TwitchProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise).then(console.log);
```

Sending a chat message:

```ts
import * as Chat from "@distilled.cloud/twitch/chat";

const sent = Chat.sendChatMessage({
  broadcaster_id: "12826",
  sender_id: "141981764",
  message: "Hello, world!",
});
```

## Pagination

The 32 operations that page take a cursor in `after` and return the next one in `pagination`; each has
`.pages()` and `.items()`:

```ts
import { Stream } from "effect";
import * as Streams from "@distilled.cloud/twitch/streams";

const live = Streams.getStreams.items({ first: 100 }).pipe(Stream.take(500), Stream.runCollect);
```

## Auth

Every call sends `TWITCH_ACCESS_TOKEN` as `Authorization: Bearer` and `TWITCH_CLIENT_ID` as `Client-Id`;
the client ID must be the one the token was issued to. The token is a user access token or an app access
token ([Twitch's guide](https://dev.twitch.tv/docs/authentication/)); each operation's documentation says
which it accepts and which scopes it needs. Optional `TWITCH_API_BASE_URL` (default
`https://api.twitch.tv/helix`).

```ts
import { Redacted } from "effect";
import * as Twitch from "@distilled.cloud/twitch";

const Auth = Twitch.credentials({
  accessToken: Redacted.make(token),
  clientId: "your-client-id",
});
```

Failures are typed by HTTP status (`Unauthorized`, `Forbidden`, `TooManyRequests`, ...); a status
without a class, such as `425 Too Early`, is `UnknownTwitchError`.
