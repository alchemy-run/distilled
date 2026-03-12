# @distilled.cloud/stripe

Effect-native Stripe SDK generated from the [Stripe OpenAPI specification](https://github.com/stripe/openapi). Covers payments, subscriptions, invoices, customers, and 560+ operations with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/stripe effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { getCustomersSearch } from "@distilled.cloud/stripe/operations";
import { CredentialsFromEnv } from "@distilled.cloud/stripe";

const program = Effect.gen(function* () {
  const results = yield* getCustomersSearch({ query: "email:'test@example.com'" });
  return results;
});

const StripeLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);

program.pipe(Effect.provide(StripeLive), Effect.runPromise);
```

## Configuration

Set the following environment variable:

```bash
STRIPE_API_KEY=sk_test_...
```

## Error Handling

Stripe errors are dispatched by `error.type` first, then HTTP status. Typed error classes include:

```typescript
import { postPaymentIntents } from "@distilled.cloud/stripe/operations";

postPaymentIntents({ amount: 1000, currency: "usd" }).pipe(
  Effect.catchTags({
    CardError: (e) => Effect.fail(new Error(`Card declined: ${e.message}`)),
    InvalidRequestError: (e) => Effect.fail(new Error(`Invalid: ${e.message}`)),
    PaymentError: (e) => Effect.fail(new Error(`Payment failed: ${e.message}`)),
    IdempotencyError: (e) => Effect.fail(new Error(`Idempotency: ${e.message}`)),
    UnknownStripeError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

### Stripe-Specific Errors

- `CardError` -- card cannot be charged (includes `decline_code`, `charge`, network-level codes)
- `InvalidRequestError` -- invalid request parameters (includes `param`)
- `IdempotencyError` -- Idempotency-Key re-used with different parameters
- `PaymentError` -- payment request failed (HTTP 402)
- `ExternalDependencyFailed` -- external dependency failed (HTTP 424, retryable)

## Services

Key operation areas include:

- **Payments** -- payment intents, charges, refunds, disputes, payment methods, payment links
- **Customers** -- CRUD, balance, cash balance, payment methods, sources, tax IDs, search
- **Subscriptions** -- CRUD, items, schedules, search, migration
- **Invoices** -- CRUD, finalize, pay, send, void, line items, rendering templates
- **Products & Prices** -- CRUD, features, search
- **Checkout** -- sessions, line items
- **Billing** -- alerts, meters, meter events, portal, credit balance, credit grants
- **Connect** -- accounts, capabilities, external accounts, persons, transfers, payouts
- **Issuing** -- authorizations, cardholders, cards, disputes, transactions
- **Terminal** -- readers, locations, connection tokens, configurations
- **Treasury** -- financial accounts, transactions, inbound/outbound transfers and payments
- **Identity** -- verification sessions and reports
- **Radar** -- early fraud warnings, value lists, payment evaluations
- **Tax** -- calculations, registrations, transactions, rates
- **Webhooks** -- endpoint CRUD

## License

MIT
