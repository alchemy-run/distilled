# @distilled.cloud/mailchimp

Effect-native SDK for the [Mailchimp Marketing API](https://mailchimp.com/developer/marketing/api/) (v3.0) and the [Mailchimp Transactional API](https://mailchimp.com/developer/transactional/api/) (formerly Mandrill).

## Installation

```bash
npm install @distilled.cloud/mailchimp effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Mailchimp from "@distilled.cloud/mailchimp";

const email = "ada@example.com";

const program = Effect.gen(function* () {
  yield* Mailchimp.setListMember({
    list_id: "a1b2c3d4e5",
    subscriber_hash: Mailchimp.subscriberHash(email),
    email_address: email,
    status_if_new: "subscribed",
    merge_fields: { FNAME: "Ada" },
  });
  yield* Mailchimp.updateListMemberTags({
    list_id: "a1b2c3d4e5",
    subscriber_hash: Mailchimp.subscriberHash(email),
    tags: [{ name: "customer", status: "active" }],
  });
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Mailchimp.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `MAILCHIMP_API_KEY`. Optional: `MAILCHIMP_SERVER_PREFIX`. Sent as
HTTP basic auth. `CredentialsFromEnv` reads through Effect `Config`, so it
follows whatever `ConfigProvider` is installed.

The data centre comes from the key's suffix: `…-us21` calls
`https://us21.api.mailchimp.com/3.0`. Override it with
`fromApiKey({ apiKey, serverPrefix: "us21" })` or a full `apiBaseUrl`. A key
with no suffix and no override fails with `ConfigError`.

## Transactional API

The Transactional API has its own key, issued in the Transactional app, and
lives under `Mailchimp.Transactional` (or `@distilled.cloud/mailchimp/transactional`).

```ts
import * as Mailchimp from "@distilled.cloud/mailchimp";

const send = Mailchimp.Transactional.sendMessage({
  message: {
    from_email: "hello@example.com",
    to: [{ email: "ada@example.com" }],
    subject: "Welcome",
    text: "Hi Ada",
  },
});

send.pipe(
  Effect.provide(Mailchimp.TransactionalCredentialsFromEnv),
  Effect.provide(FetchHttpClient.layer),
  Effect.runPromise,
);
```

Required: `MAILCHIMP_TRANSACTIONAL_API_KEY` (`MANDRILL_API_KEY` is read as a
fallback), or `fromTransactionalApiKey({ apiKey })`. The key is sent in each
request body; it is never part of an operation's input. Failures arrive as
`{ status: "error", code, name, message }` under a real HTTP status and map
onto the same shared classes, with the vendor's `name` kept in the message
(`Invalid_Key: Invalid API key`). A status outside the shared map becomes
`MailchimpTransactionalError`, which carries `name` and `code`.

## Notes

- **Operation names** are the ones Mailchimp's own clients use
  (`x-custom-config.methodNameCamel`, e.g. `setListMember`), except where that
  name repeats across resources (`campaigns.list`, `templates.list`); those
  fall back to verbNoun (`getCampaigns`). Inputs and outputs keep the wire's
  snake_case names.
- **`subscriberHash(email)`** is the MD5 of the lowercased address, the
  member id in `/members/{subscriber_hash}` paths. Pure TypeScript, since Web
  Crypto has no MD5.
- **Errors** are RFC 7807 problem documents, mapped by status onto the shared
  classes (`NotFound`, `BadRequest`, `TooManyRequests`, …). A 400's
  `errors: [{ field, message }]` are appended to the message.
- **Pagination** is `count`/`offset`; paginated operations expose `.pages`
  and `.items`, which stop at `total_items`, an empty page or a short page.
- **Optional response fields accept `null`**, because the spec marks nothing
  nullable.
