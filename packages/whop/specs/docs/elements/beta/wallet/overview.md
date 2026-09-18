> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Wallet

> Drives an account's money surfaces. `actions` renders the Deposit, Accept, and Send controls from Whop's balance dashboard: Deposit and Send open their Wallet overlays, while Accept opens Whop's checkout-link creator for a business account or company creation for a personal account. `deposit` returns live funding rails; `send` moves money to a recipient or creates a public claim link; `withdraw` collects a payout request; `balances` holds two faces — the holdings list, and the balance block drawing value over a window; `cards` lists issued cards; and `activity` lists ledger movements. Every data-backed surface but `deposit` can use the viewer's session when no token is provided.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

## Playground

Assemble the elements with example data. Drive the controls, add and arrange elements, and watch events fire live:

<div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
  <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

  <div data-whop-demo-native="playground:wallet" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
</div>

<div data-whop-usage="wallet/playground">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Wallet } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Wallet /* options */>
            {/* mount elements here */}
          </Wallet>
        </WhopElements>
      );
    }
    ```

    ```html JavaScript theme={null}
    <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
    <script type="module">
      const wallet = window.WhopElements().wallet.create({ /* options */ });
    </script>
    ```
  </CodeGroup>
</div>

## Options

Pass these to `whop.wallet.create({ … })`, or as props on `<Wallet>` in React.

<ResponseField name="currency" type="string">
  Three-letter ISO 4217 currency code for amount fields. An unknown code falls back to `usd`. Defaults to `"usd"`.
</ResponseField>

<ResponseField name="accountId" type="string" required>
  Account or user ID whose money these surfaces read. Account IDs are prefixed `biz_`; user IDs are prefixed `user_` and can read only the viewer's own balance.
</ResponseField>

<ResponseField name="appearance" type="Appearance">
  Visual customization for this group's elements. Overrides the global `WhopElements({ appearance })`. Change it live with `update({ appearance })`.
</ResponseField>

<ResponseField name="locale" type="WhopElementsLocale">
  Locale for this group's element UI text. Set it to one of the app's built locales to override the global configuration. Any other value falls back to the default locale.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onLoadingChange`

Runs when the grouped loading state changes. The value is `true` while any mounted element is still loading.

**Signature:** `((loading: boolean) => void)`

## Methods

Call these on the Wallet handle from `whop.wallet.create({ … })` or `useWallet()`.

### `update`

Merges new handle options into every mounted element. In React, change the namespace props instead.

**Signature:** `(options: Partial<WalletOptions>) => void`

### `destroy`

Destroys every element and sub-controller this handle created, removes the controller frame, and releases its subscriptions. You can call it more than once, but a destroyed handle refuses any other call — create a new handle to start over. React removes the group automatically when the provider unmounts.

**Signature:** `() => void`

## Types

Named types used throughout this page.

## `ActivityDateRangeOverride`

Fields on `ActivityDateRangeOverride`.

### `start`

**Signature:** `string`

### `end`

**Signature:** `string`

### `includeTime`

**Signature:** `boolean | undefined`

### `postedAfter`

**Signature:** `string | undefined`

### `postedBefore`

**Signature:** `string | undefined`

### `displayPostedAfter`

**Signature:** `string | undefined`

### `displayPostedBefore`

**Signature:** `string | undefined`

## `Money`

Fields on `Money`.

### `currency`

Three-letter ISO 4217 currency code, lowercase.

**Signature:** `string`

### `amount`

The amount in major units, as an exact decimal string — `"10.00"` is ten dollars. A string so no float rounds it in transit.

**Signature:** `string`

### `decimals`

How many decimal places the amount CARRIES — the precision the charge itself runs at.

**Signature:** `number`

### `display_decimals`

How many decimal places to SHOW. Usually equal to `decimals`, and deliberately not always: COP is charged in centavos but written in whole pesos, so it is `2` and `0`. Format the number in your own locale using this.

**Signature:** `number`

## `LedgerActivity`

Fields on `LedgerActivity`.

### `object`

**Signature:** `"ledger_activity"`

### `id`

Ledger activity ID.

**Signature:** `string`

### `line_type`

The ledger line category this activity was posted under.

**Signature:** `"ad_budget_release" | "ad_campaign_budget" | "ad_publisher_payout" | "ad_publisher_payout_received" | "ad_spend_charge" | "affiliate_fee" | "airdrop" | "airdrop_link_created" | "airdrop_link_redeemed" | "airdrop_link_returned" | "airdrop_reversal" | "application_fee" | "application_fee_payout" | "balance_reservation" | "balance_reservation_reversal" | "bank_transfer" | "billing_percentage_fee" | "buyer_fee" | "card_spend_authorization" | "card_spend_authorization_void" | "card_spend_refund" | "company_referral" | "cross_border_percentage_fee" | "currency_conversion_incoming" | "currency_conversion_outgoing" | "dispute_alert_fee" | "dispute_hold_adjustment" | "dispute_representment_fee" | "fraud_prevention_fee" | "fx_percentage_fee" | "high_risk_merchant_fee" | "installment_default" | "internal_balance_transfer_incoming" | "internal_balance_transfer_outgoing" | "internal_withdrawal" | "internal_withdrawal_reversal" | "legacy_crypto_payment" | "legacy_payment" | "legacy_payment_refund" | "license_sale" | "license_sale_commission" | "license_sale_revenue" | "misc_purchase" | "misc_refund" | "misc_reversal" | "onchain_deposit" | "onchain_swap_target" | "onchain_wallet_transfer_incoming" | "onchain_wallet_transfer_outgoing" | "orchestration_percentage_fee" | "passthrough_gmv" | "payment_dispute" | "payment_dispute_adjustment" | "payment_dispute_fee" | "payment_dispute_reversal" | "payment_gross" | "payment_gross_reversal" | "payment_processing_fixed_fee" | "payment_processing_percentage_fee" | "payment_referral" | "payment_referral_reversal" | "payment_refund" | "payment_refund_reversal" | "payment_revshare" | "payment_revshare_payout" | "payment_revshare_refund" | "payment_revshare_reversal" | "payout_fee" | "platform_affiliate_payment" | "platform_affiliate_payment_reversal" | "platform_balance_payment" | "platform_balance_payment_refund" | "platform_balance_transfer_incoming" | "platform_balance_transfer_outgoing" | "platform_covered_dispute" | "promo_reversal" | "referral_bonus" | "resolution_center_refund" | "revshare_percentage_fee" | "sales_tax_fee" | "sales_tax_remittance" | "sales_tax_remittance_reversal" | "software_rental_revshare" | "software_rental_transaction" | "stripe_domestic_processing_fee" | "stripe_international_processing_fee" | "three_ds_fixed_fee" | "topup" | "topup_fee" | "topup_reversal" | "treasury_payin" | "whop_processing_fee" | "withdrawal" | "withdrawal_clawback" | "withdrawal_clawback_reversal" | "withdrawal_reclassification" | "withdrawal_reversal"`

### `amount`

Signed amount in the currency's smallest precision units.

**Signature:** `string`

### `currency`

Currency for this ledger activity.

**Signature:** `{ code: string; precision: string; }`

### `posted_at`

When the activity posted to the ledger.

**Signature:** `string`

### `available_at`

ISO 8601 timestamp these funds became (or are scheduled to become) withdrawable: the posted time for already-settled funds, or 00:00:00 UTC on the scheduled release date for pending funds. Present only on inflows entering the balance (payments, top-ups, incoming transfers/affiliate); null on withdrawals, refunds, disputes and on-chain rows. The available\_after/before filters window on its UTC settlement date.

**Signature:** `string | null`

### `created_at`

When the activity record was created.

**Signature:** `string | null`

### `resource`

Resource associated with this ledger activity.

**Signature:** `{ object: "account"; id: string; title: string | null; route: string | null; logo_url: string | null; } | { object: "user"; id: string; name: string | null; username: string | null; profile_picture_url: string | null; } | { object: "bounty"; id: string; title: string; status: string; } | { object: "ledger_account"; id: string; owner: { object: "account"; id: string; title: string | null; route: string | null; logo_url: string | null; } | { object: "user"; id: string; name: string | null; username: string | null; profile_picture_url: string | null; } | null; } | { object: "payment_method"; id: string; payment_method_type: string | null; gateway_type: string | null; card: { brand: string | null; last4: string | null; exp_month: number | null; exp_year: number | null; } | null; bank: { bank_name: string | null; account_name: string | null; last4: string | null; account_type: string | null; } | null; email_identifier: string | null; } | { object: "payout_method"; id: string; nickname: string | null; institution_name: string | null; account_reference: string | null; provider: string | null; destination_currency_code: string | null; } | { object: "card_transaction"; id: string; card_id: string | null; merchant_name: string | null; merchant_icon_url: string | null; merchant_category: string | null; status: string | null; usd_amount: string | null; local_amount: string | null; local_currency: string | null; cashback_usd: string | null; authorized_at: string | null; posted_at: string | null; declined_reason: string | null; } | null`

### `source`

Source of this ledger activity.

**Signature:** `{ object: string; id: string; status?: string | null | undefined; payment_amount?: Money | null | undefined; payment_method_type?: string | null | undefined; payment_processor?: string | null | undefined; card_brand?: string | null | undefined; reason?: string | null | undefined; claim_url?: string | null | undefined; amount_float?: number | null | undefined; created_at?: string | null | undefined; estimated_arrival?: string | null | undefined; payer_name?: string | null | undefined; payout_token_nickname?: string | null | undefined; tx_hash?: string | null | undefined; sender_address?: string | null | undefined; chain?: string | null | undefined; from_amount?: string | null | undefined; from_currency?: string | null | undefined; to_amount?: string | null | undefined; to_currency?: string | null | undefined; payout_destination?: { payer_name?: string | null | undefined; icon_url?: string | null | undefined; } | null | undefined; [key: string]: unknown; } | null`

### `payment`

Payment related to this ledger activity. Included when rich resource hydration is enabled and the movement is tied to a payment.

**Signature:** `{ object: "payment"; id: string; amount: Money | null; payment_method_type: string | null; payment_processor: string | null; card_brand: string | null; card_last4: string | null; created_at: string; } | null | undefined`

### `account`

The viewer account that owns this row's ledger. Present only when the response aggregates owned accounts (include\_owned\_accounts=true); omitted otherwise.

**Signature:** `{ object: "account"; id: string; title: string | null; route: string | null; logo_url: string | null; } | { object: "user"; id: string; name: string | null; username: string | null; profile_picture_url: string | null; } | undefined`

### `ledger_account_id`

The ledger account (a ldgr\_ identifier) this row belongs to. Present only when the response aggregates owned accounts (include\_owned\_accounts=true); omitted otherwise. Pair it with `account` to scope drawers and dashboard links to the owning business.

**Signature:** `string | null | undefined`

## `DepositSavedCard`

A card the consumer already holds for this account — the element renders it as a funding row and hands the choice back through `cardDepositRequested`; it never collects a card payment itself.

### `id`

Payment-method ID echoed back in `cardDepositRequested`.

**Signature:** `string`

### `label`

Row label, for example, `Visa •••• 4242`.

**Signature:** `string`

### `cardBrand`

Brand key used to pick the row icon — `visa`, `mastercard`, `amex`, `discover`, `jcb`.

**Signature:** `string | null | undefined`

## `DepositCardFee`

Fields on `DepositCardFee`.

### `percentageFee`

Percentage POINTS, not a fraction: `2.9` means 2.9%.

**Signature:** `number`

### `fixedFee`

Flat fee in major units: `0.3` means \$0.30.

**Signature:** `number`

### `radarFee`

Fraud-screening fee in major units.

**Signature:** `number`

## `WithdrawalQuoteSpeed`

Fields on `WithdrawalQuoteSpeed`.

### `estimatedArrival`

**Signature:** `string | null | undefined`

### `fee`

**Signature:** `number`

### `totalReceived`

**Signature:** `number`

### `currency`

**Signature:** `string | undefined`

### `destinationCurrency`

**Signature:** `string | undefined`

### `exchangeRate`

**Signature:** `number | undefined`

### `minLimit`

**Signature:** `number | undefined`

### `maxLimit`

**Signature:** `number | null | undefined`

## `WithdrawalQuote`

Fields on `WithdrawalQuote`.

### `amount`

**Signature:** `number`

### `currency`

**Signature:** `string`

### `destinationCurrency`

**Signature:** `string`

### `exchangeRate`

**Signature:** `number`

### `minLimit`

**Signature:** `number`

### `maxLimit`

**Signature:** `number | null | undefined`

### `standard`

**Signature:** `WithdrawalQuoteSpeed | null | undefined`

### `instant`

**Signature:** `WithdrawalQuoteSpeed | null | undefined`

## `WithdrawalMethod`

Fields on `WithdrawalMethod`.

### `id`

**Signature:** `string`

### `nickname`

**Signature:** `string | null | undefined`

### `accountReference`

**Signature:** `string | null | undefined`

### `payerName`

**Signature:** `string | null | undefined`

### `destinationCurrency`

**Signature:** `string`

### `isDefault`

**Signature:** `boolean`

### `iconUrl`

**Signature:** `string | null | undefined`

### `deliveryType`

**Signature:** `string`

### `supportsStandard`

**Signature:** `boolean`

### `supportsInstant`

**Signature:** `boolean`

### `bankVerificationState`

**Signature:** `string | null | undefined`

### `unavailableReason`

**Signature:** `string | null | undefined`

### `feeStructure`

**Signature:** `{ percentage: number; fixedAmount: number; currency: string; } | null | undefined`

### `standardEstimatedArrival`

**Signature:** `string | null | undefined`

### `instantEstimatedArrival`

**Signature:** `string | null | undefined`

### `quote`

**Signature:** `WithdrawalQuote | null | undefined`

## `WithdrawalRequiredField`

Fields on `WithdrawalRequiredField`.

### `id`

**Signature:** `string`

### `label`

**Signature:** `string`

### `inputType`

**Signature:** `string`

### `required`

**Signature:** `boolean`

### `sensitive`

**Signature:** `boolean`

### `placeholder`

**Signature:** `string | null | undefined`

### `validation`

**Signature:** `string | null | undefined`

### `options`

**Signature:** `string[] | null | undefined`

## `WithdrawalSupportedMethod`

Fields on `WithdrawalSupportedMethod`.

### `id`

**Signature:** `string`

### `name`

**Signature:** `string | null | undefined`

### `iconUrl`

**Signature:** `string | null | undefined`

### `deliveryType`

**Signature:** `string`

### `supportsStandard`

**Signature:** `boolean`

### `supportsInstant`

**Signature:** `boolean`

### `supportsPlaid`

**Signature:** `boolean | undefined`

### `quotes`

**Signature:** `WithdrawalQuote[]`

### `requiredFields`

**Signature:** `WithdrawalRequiredField[]`

## `WithdrawalLimits`

Fields on `WithdrawalLimits`.

### `standard`

**Signature:** `{ maxAmount: number; errorMessage?: string | null | undefined; }`

### `instant`

**Signature:** `{ maxAmount: number; dailyAmountRemaining?: number | null | undefined; errorMessage?: string | null | undefined; }`

## `WithdrawalCreateMethodInput`

Fields on `WithdrawalCreateMethodInput`.

### `country`

**Signature:** `string`

### `supportedPayoutMethodId`

**Signature:** `string`

### `destinationCurrency`

**Signature:** `string`

### `nickname`

**Signature:** `string`

### `fields`

**Signature:** `Record<string, string>`

## `WithdrawalRequest`

Fields on `WithdrawalRequest`.

### `amount`

**Signature:** `number`

### `currency`

**Signature:** `string`

### `payoutMethodId`

**Signature:** `string`

### `presentedFee`

**Signature:** `number`

### `speed`

**Signature:** `"standard" | "instant"`

### `notes`

**Signature:** `string | undefined`

### `acknowledgeBankWarning`

**Signature:** `boolean | undefined`

## `SendRecipient`

Fields on `SendRecipient`.

### `id`

**Signature:** `string`

### `name`

**Signature:** `string | null`

### `username`

**Signature:** `string | null`

### `profilePicUrl`

**Signature:** `string | null`

### `kind`

**Signature:** `"business" | "user" | "email"`

## Elements

The elements this group mounts. Each has its own page:

<CardGroup cols={2}>
  <Card title="Balances" href="/elements/beta/wallet/balances">
    Two views of an account's money. The balance view shows the total, a chart of how it changed, and a picker for the time range. The list view shows the holdings that make up that total, valued in dollars. *(sub-controller, 2 elements)*
  </Card>

  <Card title="ActivityElement" href="/elements/beta/wallet/activity">
    An account's ledger activity: every movement of money in or out, newest first. The list pages as the viewer scrolls, and rows report which one was tapped instead of navigating, so you can open your own detail screen.
  </Card>

  <Card title="ActionsElement" href="/elements/beta/wallet/actions">
    The account action row from Whop's balance dashboard. Deposit and Send open the Wallet controller's built-in overlays. Accept opens Whop's checkout-link creator for a business account or company creation for a personal account. Each button also emits its requested event so the embedding page can observe the action.
  </Card>

  <Card title="DepositElement" href="/elements/beta/wallet/deposit">
    Funds a Whop account. Renders an amount field and the account's live funding rails — crypto (a per-network deposit address with its QR) and bank transfer (the wire fields for each settlement currency) — resolved from the account ID with no credentials, so it works on any page. Cards and platform balance are opt-in: pass `savedCards`, `allowNewCard`, or `showPlatformBalance` and the element collects the amount and the choice, then emits `cardDepositRequested` / `addCardRequested` / `platformBalanceSelected` and waits for you to call `showStep({ step: 'amount' })` when your own screen is done.
  </Card>

  <Card title="WithdrawElement" href="/elements/beta/wallet/withdraw">
    Collects a payout amount and saved payout method, groups standard and instant delivery choices with live fees and arrival estimates, collects a new payout method when needed, and presents a confirmation screen before emitting the final payout request.
  </Card>

  <Card title="SendElement" href="/elements/beta/wallet/send">
    Sends money from an account to a recipient — a user, another account, or a public claim link anyone can redeem. Renders its own recipient search resolved from the account ID with no credentials beyond the account's own token. Needs an `accessToken` scoped to `payout:withdraw_funds`; account recipient search additionally needs `company:authorized_user:read` and `member:basic:read`, and account claim links need `airdrop_link:manage` — a host without one of those scopes should turn off the matching prop rather than leave a row that will 403.
  </Card>

  <Card title="CardsElement" href="/elements/beta/wallet/cards">
    Lists the account's active issued cards, most recently issued first. Needs an `accessToken`. The title and rows are click targets that emit events instead of navigating — a host wires up its own routing and card-detail UI.
  </Card>
</CardGroup>
