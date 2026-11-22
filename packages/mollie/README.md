# @distilled.cloud/mollie

Effect-native [Mollie](https://www.mollie.com) SDK, generated from Mollie's
[OpenAPI description](https://github.com/mollie/openapi) (`specs.yaml`).

## Installation

```bash
npm install @distilled.cloud/mollie effect
```

## Quick start

A checkout with a partial refund: create a payment, wait until it is final, refund part of it,
and list its refunds.

```ts
import { Effect, Layer, Schedule, Stream } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Mollie from "@distilled.cloud/mollie";

// A payment is final once it can no longer change status.
const isFinal = (payment: Mollie.GetPaymentResponse) =>
  ["paid", "canceled", "expired", "failed"].includes(payment.status);

const program = Effect.gen(function* () {
  // 1. Create the payment. Retrying with the same idempotency key returns
  //    the same payment, so a durable workflow can safely re-run this step.
  const payment = yield* Mollie.createPayment({
    amount: { currency: "EUR", value: "25.00" },
    description: "Order #12345",
    redirectUrl: "https://shop.example/orders/12345",
    webhookUrl: "https://shop.example/webhooks/mollie",
    idempotencyKey: "0b6e6f5e-6a52-4b8e-9a43-2f1d6c9c7e15",
  });
  yield* Effect.log(`Send the customer to ${payment._links.checkout?.href}`);

  // 2. Poll until the payment is final (a webhook only POSTs its id, so a
  //    webhook handler calls getPayment the same way). Give up after
  //    15 minutes and cancel it.
  const settled = yield* Mollie.getPayment({ paymentId: payment.id }).pipe(
    Effect.repeat({ schedule: Schedule.spaced("10 seconds"), until: isFinal }),
    Effect.timeoutOption("15 minutes"),
  );
  if (settled._tag === "None") {
    return yield* Mollie.cancelPayment({ paymentId: payment.id });
  }
  if (settled.value.status !== "paid") return settled.value;

  // 3. Refund part of it: one returned item.
  yield* Mollie.createRefund({
    paymentId: payment.id,
    amount: { currency: "EUR", value: "5.00" },
    description: "Returned item",
  });

  // 4. Every refund on the payment, fetching more pages as the stream needs them.
  const refunds = yield* Mollie.listRefunds
    .items({ paymentId: payment.id })
    .pipe(Stream.runCollect);
  yield* Effect.log(`${refunds.length} refund(s)`);

  return yield* Mollie.getPayment({ paymentId: payment.id });
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Mollie.CredentialsFromEnv);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`MOLLIE_API_KEY` is sent as `Authorization: Bearer <key>`. It takes any credential Mollie accepts
on `/v2`: a profile API key (`live_...` or `test_...`), an organization access token
(`access_...`), or an OAuth access token. `MOLLIE_BASE_URL` is optional and defaults to
`https://api.mollie.com`. To pass the key directly, use
`Mollie.fromApiKey({ apiKey: Redacted.make(key) })`.

With an organization access token or an OAuth token, set `testmode: true` on a call to work in test
mode; a `test_...` API key is always in test mode.

## Coverage

All of the spec's 129 `/v2` operations: payments, refunds, captures, chargebacks, payment links,
checkout sessions, methods, customers, mandates, subscriptions, sales invoices, settlements,
balances, invoices, payouts, terminals, webhooks, profiles, organizations, onboarding, Connect
balance transfers, Business Accounts and more. The two `/oauth2/tokens` routes are left out: they
authenticate with the OAuth app's client id and secret (HTTP Basic) instead of a bearer token. Run
that exchange with your OAuth client and pass the access token as the API key.

## Pagination

List operations are plain calls (one page) and also expose streams that follow the `_links.next`
URL as you consume them:

```ts
const payments = Mollie.listPayments.items({ limit: 250 }).pipe(Stream.take(1000), Stream.runCollect);
```

## Errors

Each operation's declared statuses are typed errors (`BadRequest`, `NotFound`, `Conflict`, `Gone`,
`UnprocessableEntity`, …); `message` is Mollie's `detail` and `body.field` names the input member
that caused it. Throttling (429) and 5xx responses are retried by the default policy;
`Mollie.Retry.none` turns retries off.

A webhook's `webhookSecret` (`createWebhook`) and a checkout session's `clientAccessToken` come
back as `Redacted` values, so they print as `<redacted>` in logs and errors; `Redacted.value`
unwraps one where you need it.
