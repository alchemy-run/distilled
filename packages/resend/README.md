# @distilled.cloud/resend

Effect-native SDK for [resend](https://www.npmjs.com/package/@distilled.cloud/resend).

## Installation

```bash
npm install @distilled.cloud/resend effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Resend from "@distilled.cloud/resend";

const program = Effect.gen(function* () {
  const { id } = yield* Resend.createEmail({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello",
    text: "It works.",
  });
  return yield* Resend.getEmail({ email_id: id! });
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Resend.CredentialsFromEnv,
  Resend.ResendProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `RESEND_API_KEY`. Optional: `RESEND_API_BASE_URL`.

## Errors

Each operation fails with typed errors matched on Resend's error `name`: auth
errors (`RestrictedApiKey`, `InvalidApiKey`, ...), `ValidationError`, a
not-found per resource (`ContactNotFound`, `DomainNotFound`, ...),
`AlreadyExists`, and on the sending operations `UnverifiedSender`,
`TestingRecipientOnly`, `DailyQuotaExceeded` and `MonthlyQuotaExceeded`.

```ts
Resend.getContact({ id }).pipe(
  Effect.catchTag("ContactNotFound", () => Effect.succeed(undefined)),
);
```

Rate limits (`TooManyRequests`) are retried by default; the quota errors are
not, because they reset at midnight UTC.

## Webhooks

`Resend.Webhooks.constructEvent` checks a delivery's Svix signature with
WebCrypto (Node, Bun and workerd) and returns the event typed from the spec,
narrowed on `type`:

```ts
const event = yield* Resend.Webhooks.constructEvent({
  payload: rawBody, // the body exactly as received
  headers: request.headers, // svix-id, svix-timestamp, svix-signature
  secret: signingSecret, // whsec_..., from createWebhook or getWebhook
});
if (event.type === "email.bounced") console.log(event.data.bounce.type);
```

## Spec

Generated from [resend/resend-openapi](https://github.com/resend/resend-openapi),
with the corrections in `patches/` taken from live responses and Resend's
official Node SDK.
