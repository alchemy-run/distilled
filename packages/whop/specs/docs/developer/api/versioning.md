> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API versions

> Pin your requests to a dated API version so changes to the API never break your integration.

The Whop API is versioned with dates. Pin a version when you want a stable API contract. Official SDKs automatically send the version used to generate them.

```bash theme={null}
curl https://api.whop.com/api/v1/plans \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Api-Version-Date: 2026-07-23"
```

| You send                       | You get                                   |
| ------------------------------ | ----------------------------------------- |
| `Api-Version-Date: 2026-07-23` | The API as it worked on that date         |
| No header, API key has a pin   | The API version stored on the API key     |
| No header or stored pin        | The original `2025-01-01` behavior        |
| An unknown date                | A `400` error with the supported versions |

<Note>
  **If you don't pass an `Api-Version-Date` or have a stored API-key pin, the stable API model is used.** Requests with neither are served by the pre-versioning behavior, so existing integrations keep working unchanged. Pin a dated version to opt into the latest API.
</Note>

## Application programming interface key version pins

API keys carry their own API version pin. Requests authenticated with an API key use that pin when they omit `Api-Version-Date`. Existing keys without a stored pin use `2025-01-01`. Newly created keys use the latest released version.

An explicit `Api-Version-Date` header always takes precedence over the API key's pin, so you can test an upgrade before changing the saved version.

Every version automatically gets new endpoints and optional fields. Breaking changes create a new dated version, which the changelog below lists.

## Changelog

<Update label="2026-08-25-2" description="Explicit app verification filtering" tags={["Latest"]}>
  `GET /apps` now uses `verified` as an optional equality filter instead of treating its absence as `verified=false` for public website lists.

  * Omit `verified` to return publicly discoverable website blueprints from both verification states.
  * Set `verified=true` for Whop-verified blueprints or `verified=false` for community blueprints.
  * `recommended=true` filters recommended apps independently of verification status.
</Update>

<Update label="2026-08-25-1" description="Legacy withdrawals endpoints retired">
  The legacy `/withdrawals` endpoints are deprecated in favour of the native [Payouts](/api-reference/payouts/payout) API and are no longer served at this version.

  * `GET /withdrawals` and `POST /withdrawals` return `410 Gone` with an `error.type` of `gone`. Use `GET /payouts` and `POST /payouts` instead. Payout ids are the same `wdrl_` ids, so existing identifiers keep resolving.
  * `GET /withdrawals/{id}` still responds at this version. Use `GET /payouts/{id}` for new work.
  * Every response from the legacy endpoints, at any version, now carries `Deprecation` and `Link: <…/payouts>; rel="successor-version"` headers. A `Sunset` header will announce the date they stop responding for every version. Until then, requests pinned to earlier versions, and requests without a version, keep working unchanged.
</Update>

<Update label="2026-08-25" description="Ad post IDs">
  An ad's `post_id` now names the post the ad network serves, whichever way the ad was built.

  * `post_id` returns the network's post for the ad — the one Meta created for an uploaded creative, or the post being promoted. It used to be `null` for every ad built from uploaded creatives.
  * The post you point an ad at moved to `existing_post_id`, on both the response and the create/update body. `post_source` and `post_thumbnail_url` describe that field.
</Update>

<Update label="2026-08-21-1" description="Native Files API">
  `POST /files` and `GET /files/{id}` are served natively with a redesigned file object, and multipart uploads finish through the new `POST /files/{id}/complete`.

  * File responses carry the standard envelope: `object`, `visibility`, and an ISO 8601 `created_at`. The `size` and `url` fields are `null` until the upload is `ready`.
  * `GET /files/{id}` only resolves files you created — other callers receive a 404.
</Update>

<Update label="2026-08-21" description="Payouts status v2">
  The payout object's lifecycle vocabulary is rebuilt and its money fields become decimal strings.

  * `status` speaks eight words: `requested`, `in_review`, `processing`, `completed`, `reversed`, `canceled`, `failed`, `denied`. A settled payout the provider reverses reads `reversed`, with the return code and `funds_returned_at` in `failure`.
  * A new `status_detail` field carries the finest machine phase under the status word. Its values can grow without a version bump — `status` is the versioned contract.
  * `amount`, `fee_amount`, `net_amount`, `markup_fee`, and `destination_amount` are decimal strings. `exchange_rate` stays a number.
  * Payouts are created under their `wdrl_` id: the id `POST /payouts` returns is the id `GET /payouts` lists, and a stablecoin payout's conversion request survives as `payout_request_id`. Conversion requests created before this version keep answering under their `cofr_` id.
  * The idempotency key is sent only in the `Idempotency-Key` header, and the `idempotency_key` body field is rejected.

  Requests pinned to earlier versions keep the previous vocabulary, float money, and body-field idempotency keys. Webhook payloads follow the subscription's `api_version_date` the same way: subscriptions pinned `2026-08-21` or later receive the new payout shape, earlier or unpinned subscriptions keep the previous one.
</Update>

<Update label="2026-08-14" description="Webhook envelope account_id">
  The webhook envelope's `company_id` field is renamed to `account_id`.

  * Webhook deliveries pinned to `2026-08-14` or later carry `account_id` in the envelope.
  * Webhooks pinned to earlier versions — and webhooks without an `api_version_date` pin — keep `company_id`.
</Update>

<Update label="2026-08-13" description="In-transit balance breakdowns">
  Account and personal balance breakdowns now expose `in_transit` alongside `pending`.

  * Add `pending` and `in_transit` to present the total amount awaiting settlement.
  * Callers pinned to earlier versions continue receiving the combined amount in `pending`.
</Update>

<Update label="2026-08-12" description="Webhook API version input removed">
  The `api_version` input on `POST /webhooks` and `PATCH /webhooks/{id}` is removed.

  * New webhooks always use the `v1` events and payloads. Requests passing `api_version` are rejected with a `400`.
  * Pin a webhook's payload shape with `api_version_date` instead.
  * Existing `v2` and `v5` webhooks keep delivering. You can no longer create or switch webhooks to these versions.
</Update>

<Update label="2026-08-10" description="Native dispute alert endpoints">
  Dispute alerts are now a native REST resource and remain dual-served with the legacy proxy.

  * `GET /dispute_alerts` lists an account's alerts with cursor pagination, and filters by `account_id`, `payment_id`, `type`, and a creation window.
  * `type` replaces `alert_type` and names the two kinds an issuer sends: `early_fraud_warning` (Visa TC40 / Mastercard SAFE fraud reports) and `dispute_alert` (pre-dispute notices).
  * `fee_charged` replaces `charge_for_alert` and reports whether Whop actually billed the account. Early fraud warnings are never billed.
  * `actionable` reports whether refunding the payment can still prevent a chargeback.
  * `payment` and `dispute` objects are replaced by the `payment_id` and `account_id` tags. Timestamps are ISO 8601, with `reported_at` for when the issuer filed the report.
</Update>

<Update label="2026-08-05-1" description="Fiat currency conversion on swaps">
  Fiat-pair swaps (`POST /swaps` with two fiat currencies) now support free-form currency conversion, and `amount` matches crypto swap semantics.

  * `amount` is the amount of `from_token` to convert at the mid-market rate — no negative balance required.
  * Sizing a partial repayment of a negative `to_token` balance moved to the new `to_amount` field (denominated in `to_token`, capped at the debt). `amount` and `to_amount` are mutually exclusive.
  * Omitting both still repays the full negative `to_token` balance.
  * Callers pinned to earlier versions keep the previous behavior: their fiat `amount` is treated as the `to_token` repayment amount.
</Update>

<Update label="2026-08-05" description="Flat verification requirements">
  A verification's `requested_information` is now a flat list: one requirement per entry, one write per answer.

  * Each entry names what's needed in `requirement` — a document such as `bank_statement`, or a field key such as `ssn` — with a `label` to show the user.
  * Answer `file` entries with `file` (a direct upload ID). Answer `text`, `date`, `phone`, and `select` entries with `value`, and `address` entries with `address`. Nothing from the response is echoed back.
  * An entry marked `multiple` takes several files in one answer, in slot order — front first for a two-sided document.
  * An entry listing `options` also takes a `value`. For `select` entries, the options are the allowed answers. For identity documents, the options are the accepted ID types.
  * Keys that don't apply are omitted, and rejected submissions carry structured `errors` with a stable `code` and a `reason`.
  * The nested `requested_files`/`category` form shape is gone from this version. Callers pinned to earlier versions keep it, and their answers are translated automatically.
</Update>

<Update label="2026-08-03" description="Native promo code endpoints">
  Promo codes are now a complete top-level REST resource and remain dual-served with the legacy proxy.

  * `GET /promo_codes` lists an account's promo codes and uses `account_id` instead of `company_id`.
  * `POST /promo_codes` creates promo codes. `GET` and `DELETE /promo_codes/{id}` retrieve and archive them.
  * `POST /promo_codes/{id}/activate` and `POST /promo_codes/{id}/deactivate` replace the legacy `PATCH` status write.
  * List responses use cursor pagination and support status, product, plan, timestamp, and sorting filters.
  * Callers pinned to earlier versions keep the legacy proxy contract unchanged.
</Update>

<Update label="2026-07-31" description="Richer parent accounts">
  Account responses now expose a richer parent account relationship for connected accounts.

  * `parent_account` replaces `parent_account_id`.
  * The parent account includes its `id`, `title`, `route`, and `logo_url`.
</Update>

<Update label="2026-07-29-1" description="Supported payout methods">
  Supported payout methods now have their own paginated endpoint.

  * `GET /payouts/supported_methods` lists the payout methods an account or user is eligible to add.
  * Supported methods use `object: "supported_payout_method"`, and their `podst_` IDs are passed as `supported_payout_method_id`.
  * Saved payout methods expose `supported_payout_method`. Payouts expose `payout_method.supported_payout_method`.
  * Use `country` to list supported methods for a country other than the payout account's country.
  * `GET /payouts/methods` no longer accepts `include_available` or returns `available_destinations`.
  * Callers pinned to earlier versions keep `destination_id`, `payout_destination`, and `payout_token`.
</Update>

<Update label="2026-07-29" description="Native card transactions, payout method arrival estimates">
  Card transactions now use native REST endpoints and remain dual-served with the legacy proxy.

  * `GET /card_transactions` lists an account's card transactions, and `GET /card_transactions/{id}` retrieves one by its `citx_` id. The list also takes a `transaction_ids` filter to fetch specific transactions in one request.
  * Card transactions are account-scoped: the owner is selected with `account_id`, defaulting to the account the credential belongs to.
  * Filters on `transaction_ids`, `card_id`, `cardholder_id`, `status`, `created_after`, and `created_before`. Timestamp filters are ISO 8601.
  * `cardholder_id` is new on the response: the user the card is assigned to.

  Payout methods now carry amount-independent fee and delivery terms, and the quote no longer duplicates arrival estimates.

  * Each payout method returns `fee_structure` (percentage, fixed amount, and currency) and `estimated_arrival` (per-speed timestamps) without requiring an `amount`.
  * The quote's `standard` and `instant` objects no longer include `estimated_arrival`. Read it from the method's top-level `estimated_arrival` field.
</Update>

<Update label="2026-07-27" description="Native Resolution Center endpoints">
  Resolution Center cases now use native REST endpoints and remain dual-served with the legacy proxy.

  * `status`, `escalated`, `outcome`, `refund`, `reason`, and `available_actions` expose case state and permitted actions.
  * Events are available from paginated `GET /resolution_center_cases/{id}/events`. Summaries are available from `GET /resolution_center_cases/summary`.
  * Writes use `message` and `attachments`. `due_date` is renamed `response_due_at`. Listing no longer requires `account_id`.
</Update>

<Update label="2026-07-26" description="Native shipments endpoints">
  Shipments now use native REST endpoints and remain dual-served with the legacy proxy.

  * `GET /shipments` lists shipments. `GET /shipments/{id}` retrieves by shipment id or payment id.
  * `POST /shipments` creates a shipment, and `PATCH /shipments/{id}` updates its tracking number.
  * Responses use `account_id` and `tracking_number`, alongside `carrier`, `tracking_url`, `order_id`, and `payment_id`.
  * Callers pinned before this date keep the legacy proxy contract unchanged.
</Update>

<Update label="2026-07-25" description="Native disputes endpoints">
  Disputes now use native REST endpoints and remain dual-served with the legacy proxy.

  * `PATCH /disputes/{id}` edits evidence, and `POST /disputes/{id}/submit` submits it. Evidence is nested under `evidence`.
  * `GET /disputes/summary` provides totals grouped by `status` and `currency`. List and retrieve return the same fields.
  * Responses use `account_id`, `product_id`, and `plan_id`, plus `buyer` alongside `payment`. Listing no longer requires `account_id`.
  * `status` and `reason` are normalized enums, and `needs_response_by`, `rdr`, and `editable` are replaced by their new fields.
  * Callers pinned before this date keep the legacy proxy contract unchanged.
</Update>

<Update label="2026-07-23" description="Members and memberships">
  Members and memberships now use native resources with an account-oriented membership model and redesigned lifecycle actions.

  * Membership responses return `plan_id` and `product_id` instead of nested `plan` and `product` objects.
  * Listing memberships returns everything the caller can read — their own plus their managed accounts' — and `account_id`/`user_id` narrow that list instead of switching modes or erroring.
  * Set `cancel_at_period_end` to schedule cancellation. The `cancel` action ends access immediately.
  * The `extend` action replaces `add_free_days`.
</Update>

<Update label="2026-07-22" description="REST response and timestamp consistency">
  The Experimental API now uses consistent delete responses, timestamp inputs, and Account naming.

  * Delete endpoints for products, plans, checkout configurations, ads, ad groups, ad campaigns, social accounts, and bounty submissions return `{ id, deleted: true }` instead of a bare boolean.
  * Timestamp filters on products, plans, checkout configurations, transfers, and financial reports accept ISO 8601 only instead of also accepting epoch seconds.
  * Product responses return `account` instead of `company`.
</Update>

<Update label="2026-07-20" description="Partner business payout percentages">
  Partner businesses now expose separate payout rates for every income source.

  * `payout_percentage` is replaced by `payout_percentages`.
  * The nested object includes `sales`, `ad_spend`, `transfer`, and `card_interchange` rates.
</Update>

<Update label="2026-07-18" description="Products and checkout configurations">
  Products and checkout configurations now use the Account model consistently.

  * Product request parameters use `account_id` instead of `company_id`.
  * Checkout configuration requests use `account_id` at the top level and inside inline `plan` objects.
  * Checkout configuration responses return `account_id` instead of `company_id`.
</Update>

<Update label="2026-07-08-1" description="Checkout configuration timestamps">
  Checkout configuration timestamps now use the same format as the rest of the API.

  * `created_at` and `updated_at` are ISO 8601 strings instead of Unix epoch integers.
</Update>

<Update label="2026-07-08" description="User balances">
  User balances now provide a complete, structured balance summary.

  * The flat `total_usd` and `balances` fields are replaced by a nested `balance` object.
  * The summary separates cash, crypto, in-flight treasury deposits, and balances for accounts the user owns.
</Update>

<Update label="2026-07-01" description="Business referral earnings resources">
  Business referral earnings now identify the polymorphic resource that generated the earning.

  * `receipt` is replaced by `resource`.
  * `access_pass` is replaced by `product`.
  * Receipt-backed earnings return `resource.object: "receipt"` with receipt payment details.
  * The `resource` field can support additional earning resources in future versions without reusing receipt-specific fields.
</Update>

<Update label="2026-06-20" description="Business referrals resource">
  Business referral volume and earnings are now reported as reconciling groups.

  * `processing_volume`, `total_earnings`, `pending_payout`, and `completed_payout` are replaced by nested `volume_usd` and `earnings_usd` objects.
  * Earnings rename `base_amount`/`amount` to `transaction_amount_usd`/`commission_amount_usd` and express `payout_percentage` as a fraction.
</Update>

<Update label="2026-06-09" description="Plans resource">
  Plans now use the Account model consistently.

  * Request parameters and request bodies use `account_id` instead of `company_id`.
  * Plan responses return `account` instead of `company`.
</Update>

<Update label="2026-06-08" description="Users resource">
  User access requests now use the Account model consistently.

  * Request parameters and request bodies use `account_id` instead of `company_id`.
  * Response shapes are unchanged.
</Update>

<Update label="2025-01-01" description="Original version">
  The original Experimental API behavior before dated versioning existed.

  Requests without `Api-Version-Date` use this version so existing integrations keep working.
</Update>
