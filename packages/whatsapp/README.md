# @distilled.cloud/whatsapp

Effect-native [WhatsApp Business Platform](https://developers.facebook.com/documentation/business-messaging/whatsapp/)
SDK, generated from Meta's official OpenAPI description,
[`facebook/openapi`](https://github.com/facebook/openapi)
(`business-messaging-api_v23.0.yaml`). It covers the Cloud API on
`graph.facebook.com`: 111 operations for messages, media, templates, phone
numbers, business profiles, Flows, groups, calling, WhatsApp Business
Accounts, and Tech Provider and Multi-Partner Solution management.

## Installation

```bash
npm install @distilled.cloud/whatsapp effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as WhatsApp from "@distilled.cloud/whatsapp";

// The business phone number that sends, from WhatsApp Manager or
// `getWhatsAppBusinessAccountPhoneNumbers`.
const Phone_Number_ID = "106540352242922";

const program = Effect.gen(function* () {
  const number = yield* WhatsApp.getPhoneNumber({ Phone_Number_ID });

  const sent = yield* WhatsApp.sendMessage({
    Phone_Number_ID,
    body: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "16505551234",
      type: "text",
      text: { body: "Hello from Effect" },
    },
  });

  // Typed failures: an unknown phone number ID is a BadRequest or NotFound.
  const missing = yield* WhatsApp.getPhoneNumber({ Phone_Number_ID: "0" }).pipe(
    Effect.map(() => false),
    Effect.catchTags({
      BadRequest: () => Effect.succeed(true),
      NotFound: () => Effect.succeed(true),
    }),
  );

  return {
    from: number.display_phone_number,
    messageId: sent.messages?.[0]?.id,
    missing,
  };
});

const WhatsAppLive = Layer.mergeAll(
  FetchHttpClient.layer,
  WhatsApp.CredentialsFromEnv,
);

program.pipe(Effect.provide(WhatsAppLive), Effect.runPromise);
```

## Auth

`WHATSAPP_ACCESS_TOKEN` is sent as `Authorization: Bearer`. Use a system user
access token with the `whatsapp_business_messaging` and
`whatsapp_business_management` permissions, or a business token from
Embedded Signup. Optional variables:

- `WHATSAPP_API_VERSION`: the Graph API version every path starts with.
  The default is `v23.0`, the version the spec describes.
- `WHATSAPP_API_BASE_URL`: the default is `https://graph.facebook.com`.

`WhatsApp.fromAccessToken({ accessToken: Redacted.make(token), apiVersion })`
builds the same layer from values.

## Pagination

Graph API lists take `limit` and `after`, and return `paging.cursors.after`
and, while another page exists, `paging.next`. These lists have `.pages()` and
`.items()`:

```ts
import * as Stream from "effect/Stream";

const WABA_ID = "<your WhatsApp Business Account ID>";

const templates = WhatsApp.listMessageTemplates
  .items({ WABA_ID, limit: 100, fields: "name,status,language" })
  .pipe(Stream.runCollect);
```

## Errors

Failures carry the Graph API `error.code` as `code` and its message as
`message`. Besides the status classes (`BadRequest`, `Unauthorized`,
`Forbidden`, `NotFound`, `TooManyRequests`, …), `sendMessage` fails with
`TemplateNotFound` (132001) and `RecipientNotAllowed` (131030, sent from a
test number to a recipient outside its allowed list). Meta accepts a message
sent outside the 24-hour customer service window, then reports it as `failed`
with code 131047 in a status webhook.

## Webhooks

`WhatsApp.WebhookPayload` is the TypeScript type of what Meta POSTs to your
callback URL for messages, statuses and group events. The SDK exports the
type, not a decoder, so parse the body yourself.

It types the webhook fields Meta's OpenAPI spec describes: `messages`,
`group_lifecycle_update`, `group_settings_update` and
`group_participant_update`. Other fields you subscribe to in the app
dashboard, such as `account_update`, `message_template_status_update`,
`phone_number_name_update` or `security`, arrive in the same envelope, but
their `value` is not typed.

Each customer message is an `IncomingMessage` with `from`, `id`, `timestamp`
and `type`. The member named by `type` (`text`, `image`, `audio`, `reaction`,
`location`, `contacts`, …) holds the content, and `context` is set when the
message quotes an earlier one.

The SDK does not verify the `X-Hub-Signature-256` header. Check it against
your app secret before you trust a payload.

## Media

Upload with `uploadMedia`, which sends a multipart form:

```ts
const { id } = yield* WhatsApp.uploadMedia({
  Phone_Number_ID,
  messaging_product: "whatsapp",
  type: "image/png",
  file: new File([bytes], "photo.png", { type: "image/png" }),
});
```

`WhatsApp.getMedia({ Media_ID })` returns a `url` that expires after five
minutes. Download it with your own `HttpClient` and the same
`Authorization: Bearer` header. Without the header the download returns 401.
The SDK has no `downloadMedia` operation, because the spec's version sends the
URL to the wrong address.
