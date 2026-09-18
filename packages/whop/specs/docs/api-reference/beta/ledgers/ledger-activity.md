> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ledger Activity

A Ledger Activity row is a single financial event on an account's ledger — a payment, payout, refund, transfer, on-chain deposit, swap, or card transaction. Each row is derived from the underlying ledger lines and carries a typed `resource` and `source` so you can present and link the event without extra lookups.

Use Ledger Activity to build a statement or transaction feed for an account or user. Reconcile against your own records with `amount` (signed, in the currency's smallest precision units) and `posted_at`, and use `available_at` to know when inflows became withdrawable.

## Endpoints

| Endpoint                                                                       | Request                                                                |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [Get Financial Report](/api-reference/beta/ledgers/get-financial-report)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/financial_reports`  |
| [List Financial Activity](/api-reference/beta/ledgers/list-financial-activity) | <Badge color="blue" size="sm" stroke>GET</Badge> `/financial-activity` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Ledger activity ID.
    </ResponseField>

    <ResponseField name="account" type="account or user">
      The viewer account that owns this row's ledger. Present only when the response
      aggregates owned accounts (include\_owned\_accounts=true); omitted otherwise.
    </ResponseField>

    <ResponseField name="amount" type="string" required>
      Signed amount in the currency's smallest precision units.
    </ResponseField>

    <ResponseField name="available_at" type="string | null" required>
      ISO 8601 timestamp these funds became (or are scheduled to become)
      withdrawable: the posted time for already-settled funds, or 00:00:00 UTC on
      the scheduled release date for pending funds. Present only on inflows entering
      the balance (payments, top-ups, incoming transfers/affiliate); null on
      payouts, refunds, disputes and on-chain rows. The available\_after/before
      filters window on its UTC settlement date.
    </ResponseField>

    <ResponseField name="currency" type="object" required>
      Currency for this ledger activity.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="code" type="string" required>
          Currency code.
        </ResponseField>

        <ResponseField name="precision" type="string" required>
          Precision factor for the currency, for example `100000000` for USD.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="ledger_account_id" type="string | null">
      The ledger account (a ldgr\_ identifier) this row belongs to. Present only when
      the response aggregates owned accounts (include\_owned\_accounts=true); omitted
      otherwise. Pair it with `account` to scope drawers and dashboard links to the
      owning business.
    </ResponseField>

    <ResponseField name="line_type" type="string" required>
      The ledger line category this activity was posted under.

      Available options: `ad_budget_release`, `ad_campaign_budget`, `ad_publisher_payout`, `ad_publisher_payout_received`, `ad_spend_charge`, `affiliate_fee`, `airdrop`, `airdrop_link_created`, `airdrop_link_redeemed`, `airdrop_link_returned`, `airdrop_reversal`, `application_fee`, `application_fee_payout`, `balance_reservation`, `balance_reservation_reversal`, `bank_transfer`, `billing_percentage_fee`, `buyer_fee`, `card_spend_authorization`, `card_spend_authorization_void`, `card_spend_refund`, `company_referral`, `cross_border_percentage_fee`, `currency_conversion_incoming`, `currency_conversion_outgoing`, `dispute_alert_fee`, `dispute_hold_adjustment`, `dispute_representment_fee`, `fraud_prevention_fee`, `fx_percentage_fee`, `high_risk_merchant_fee`, `installment_default`, `internal_balance_transfer_incoming`, `internal_balance_transfer_outgoing`, `internal_withdrawal`, `internal_withdrawal_reversal`, `legacy_crypto_payment`, `legacy_payment`, `legacy_payment_refund`, `license_sale`, `license_sale_commission`, `license_sale_revenue`, `misc_purchase`, `misc_refund`, `misc_reversal`, `onchain_deposit`, `onchain_swap_target`, `onchain_wallet_transfer_incoming`, `onchain_wallet_transfer_outgoing`, `orchestration_percentage_fee`, `passthrough_gmv`, `payment_dispute`, `payment_dispute_adjustment`, `payment_dispute_fee`, `payment_dispute_reversal`, `payment_gross`, `payment_gross_reversal`, `payment_processing_fixed_fee`, `payment_processing_percentage_fee`, `payment_referral`, `payment_referral_reversal`, `payment_refund`, `payment_refund_reversal`, `payment_revshare`, `payment_revshare_payout`, `payment_revshare_refund`, `payment_revshare_reversal`, `payout_fee`, `platform_affiliate_payment`, `platform_affiliate_payment_reversal`, `platform_balance_payment`, `platform_balance_payment_refund`, `platform_balance_transfer_incoming`, `platform_balance_transfer_outgoing`, `platform_covered_dispute`, `promo_reversal`, `referral_bonus`, `resolution_center_refund`, `revshare_percentage_fee`, `sales_tax_fee`, `sales_tax_remittance`, `sales_tax_remittance_reversal`, `software_rental_revshare`, `software_rental_transaction`, `stripe_domestic_processing_fee`, `stripe_international_processing_fee`, `three_ds_fixed_fee`, `topup`, `topup_fee`, `topup_reversal`, `treasury_payin`, `whop_processing_fee`, `withdrawal`, `withdrawal_clawback`, `withdrawal_clawback_reversal`, `withdrawal_reclassification`, `withdrawal_reversal`
    </ResponseField>

    <ResponseField name="object" type="string" required />

    <ResponseField name="payment" type="payment | null">
      Payment related to this ledger activity. Included when rich resource hydration is enabled and the movement is tied to a payment.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Payment ID, prefixed `pay_`.
        </ResponseField>

        <ResponseField name="amount" type="object | null" required>
          Total charged by the payment.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="amount" type="string" required>
              The amount in major units, as an exact decimal string — `"10.00"` is ten
              dollars. A string so no float rounds it in transit.
            </ResponseField>

            <ResponseField name="currency" type="string" required>
              Three-letter ISO 4217 currency code, lowercase.
            </ResponseField>

            <ResponseField name="decimals" type="integer" required>
              How many decimal places the amount CARRIES — the precision the charge itself
              runs at.
            </ResponseField>

            <ResponseField name="display_decimals" type="integer" required>
              How many decimal places to SHOW. Usually equal to `decimals`, and deliberately not always: COP is charged in centavos but written in whole pesos, so it is `2` and `0`. Format the number in your own locale using this.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="card_brand" type="string | null" required>
          Card brand, when the customer paid by card.
        </ResponseField>

        <ResponseField name="card_last4" type="string | null" required>
          Last four digits of the card, when the customer paid by card.
        </ResponseField>

        <ResponseField name="created_at" type="string" required>
          When the payment was created.
        </ResponseField>

        <ResponseField name="object" type="string" required />

        <ResponseField name="payment_method_type" type="string | null" required>
          How the customer paid, such as `card` or `paypal`.
        </ResponseField>

        <ResponseField name="payment_processor" type="string | null" required>
          Processor that handled the payment, such as `stripe`.
        </ResponseField>

        <ResponseField name="plan" type="object | null" required>
          Plan associated with the payment, when applicable.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              Plan ID, prefixed `plan_`.
            </ResponseField>

            <ResponseField name="name" type="string | null" required>
              Plan name.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="product" type="object | null" required>
          Product associated with the payment, when applicable.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              Product ID, prefixed `prod_`.
            </ResponseField>

            <ResponseField name="name" type="string" required>
              Product name.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="user" type="object | null" required>
          Customer associated with the payment. Email requires member:email:read.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              Customer ID, prefixed `user_`.
            </ResponseField>

            <ResponseField name="email" type="string | null" required>
              Customer email, or null without member:email:read.
            </ResponseField>

            <ResponseField name="name" type="string" required>
              Customer display name.
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="payment_id" type="string | null">
      Payment ID for any payment-related activity, including refunds and disputes.
    </ResponseField>

    <ResponseField name="plan_id" type="string | null">
      ID of the plan associated with the payment, when applicable.
    </ResponseField>

    <ResponseField name="plan_name" type="string | null">
      Name of the plan associated with the payment, when applicable.
    </ResponseField>

    <ResponseField name="posted_at" type="string" required>
      When the activity posted to the ledger.
    </ResponseField>

    <ResponseField name="product_id" type="string | null">
      ID of the product associated with the payment, when applicable.
    </ResponseField>

    <ResponseField name="product_name" type="string | null">
      Name of the product associated with the payment, when applicable.
    </ResponseField>

    <ResponseField name="resource" type="account or user or bounty or ledger_account or payment_method or payout_method or card_transaction | null" required>
      Resource associated with this ledger activity.
    </ResponseField>

    <ResponseField name="source" type="object | null" required>
      Source of this ledger activity.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required />

        <ResponseField name="amount_float" type="number | null">
          Payout amount as a decimal number in the destination currency (payout sources
          only; requires payout:withdrawal:read).
        </ResponseField>

        <ResponseField name="card_brand" type="string | null">
          Card brand used by the payment source.
        </ResponseField>

        <ResponseField name="chain" type="string | null">
          Chain the deposit landed on, for example plasma (onchain\_transaction sources
          only).
        </ResponseField>

        <ResponseField name="claim_url" type="string | null">
          Public claim URL for the airdrop link (airdrop\_link sources only).
        </ResponseField>

        <ResponseField name="created_at" type="string | null">
          Payout creation time as an ISO 8601 timestamp (payout sources only; requires
          payout:withdrawal:read).
        </ResponseField>

        <ResponseField name="estimated_arrival" type="string | null">
          Estimated arrival as an ISO 8601 timestamp (payout sources only; requires
          payout:withdrawal:read).
        </ResponseField>

        <ResponseField name="from_amount" type="string | null">
          Amount converted out of from\_currency as a decimal string (swap sources only).
        </ResponseField>

        <ResponseField name="from_currency" type="string | null">
          Lowercase currency code converted from (swap sources only).
        </ResponseField>

        <ResponseField name="object" type="string" required />

        <ResponseField name="payer_name" type="string | null">
          Name of the entity processing the payout (payout sources only; requires
          payout:withdrawal:read).
        </ResponseField>

        <ResponseField name="payment_amount" type="object | null">
          Total charged by the payment source.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="amount" type="string" required>
              The amount in major units, as an exact decimal string — `"10.00"` is ten
              dollars. A string so no float rounds it in transit.
            </ResponseField>

            <ResponseField name="currency" type="string" required>
              Three-letter ISO 4217 currency code, lowercase.
            </ResponseField>

            <ResponseField name="decimals" type="integer" required>
              How many decimal places the amount CARRIES — the precision the charge itself
              runs at.
            </ResponseField>

            <ResponseField name="display_decimals" type="integer" required>
              How many decimal places to SHOW. Usually equal to `decimals`, and deliberately not always: COP is charged in centavos but written in whole pesos, so it is `2` and `0`. Format the number in your own locale using this.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="payment_method_type" type="string | null">
          Payment method used by the payment source.
        </ResponseField>

        <ResponseField name="payment_processor" type="string | null">
          Processor used by the payment source.
        </ResponseField>

        <ResponseField name="payout_destination" type="object | null">
          Payout destination display info (payout sources only).

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="icon_url" type="string | null" />

            <ResponseField name="payer_name" type="string | null" />
          </Accordion>
        </ResponseField>

        <ResponseField name="payout_token_nickname" type="string | null">
          Saved payout destination nickname (payout sources only).
        </ResponseField>

        <ResponseField name="reason" type="string | null">
          Why the activity happened. On transfer sources this is the transfer reason,
          for example pool\_top\_up or bounty\_return. On payout sources it explains why
          the payout was canceled, denied, or failed (requires payout:withdrawal:read);
          null while the payout is progressing normally.
        </ResponseField>

        <ResponseField name="risk_review_hold" type="boolean | null">
          Whether this payout is currently held for manual risk review (payout sources
          only; requires payout:withdrawal:read).
        </ResponseField>

        <ResponseField name="sender_address" type="string | null">
          Sender wallet address or onramp provider identifier (onchain\_transaction
          sources only).
        </ResponseField>

        <ResponseField name="status" type="string | null">
          Lifecycle status. On payout sources this is the payout status (requires
          payout:withdrawal:read); on airdrop\_link sources it is the claim-link status
          (ungated); on payment and top-up sources it is the friendly payment status
          such as succeeded/pending/failed (ungated).
        </ResponseField>

        <ResponseField name="to_amount" type="string | null">
          Amount received in to\_currency as a decimal string (swap sources only).
        </ResponseField>

        <ResponseField name="to_currency" type="string | null">
          Lowercase currency code converted to (swap sources only).
        </ResponseField>

        <ResponseField name="tx_hash" type="string | null">
          On-chain transaction hash (onchain\_transaction and swap sources only).
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="user_email" type="string | null">
      Email of the customer associated with the payment. Requires member:email:read.
    </ResponseField>

    <ResponseField name="user_id" type="string | null">
      ID of the customer associated with the payment.
    </ResponseField>

    <ResponseField name="user_name" type="string | null">
      Display name of the customer associated with the payment.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json LedgerActivity theme={null}
      {
      	"id": "line_cGF5bWVudF9ncm9zczpsaTpwZXRhbHBvc3Q6YWM6bGVkZ2VyOmxlOjE6djppazpyZWNlaXB0",
      	"object": "ledger_activity",
      	"line_type": "payment_gross",
      	"amount": "4800000000",
      	"currency": {
      		"code": "usd",
      		"precision": "100000000"
      	},
      	"posted_at": "2026-06-14T18:49:49Z",
      	"available_at": "2026-06-17T00:00:00Z",
      	"resource": {
      		"id": "user_4Hk2mZ9qLpXa",
      		"object": "user",
      		"name": "Jordan Avery",
      		"username": "jordanavery",
      		"profile_picture_url": "https://cdn.whop.com/users/jordan-avery.png"
      	},
      	"source": {
      		"id": "pay_8QcR2mZ9qLpXa",
      		"object": "payment"
      	},
      	"account": {
      		"id": "biz_9dCwK2mZ9qLpXa",
      		"object": "account",
      		"title": "Acme Studios",
      		"route": "acme-studios",
      		"logo_url": "https://cdn.whop.com/companies/acme-studios.png"
      	},
      	"ledger_account_id": "ldgr_7bQx2mZ9qLpXa"
      }
      ```
    </div>
  </Column>
</Columns>

## Glossary of line types

Every activity row carries a `line_type` that names the financial event it represents. Pass one or more `line_types` to [List Financial Activity](/api-reference/beta/ledgers/list-financial-activity) to filter the feed to specific events — either as repeated `line_types[]` parameters or as a single comma-separated value (`line_types=payment_gross,payment_refund`). Unknown line types return a `400`.

The term Local Payment Method (LPM) means a non-card method, including bank debits, bank transfers, and wallets.

### Categories

In place of listing individual line types, you can pass a category shorthand. A category expands to every line type it contains.

| Category | Expands to                                                                      |
| -------- | ------------------------------------------------------------------------------- |
| `fees`   | All processing-fee line types — every entry in the [Fees](#fees) section below. |

### Payments

| Line type                  | Description                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `payment_gross`            | A card or LPM sale settling into the wallet — the gross amount before fees.                                                                      |
| `topup`                    | Funds the account added to its own wallet balance, rather than a product sale.                                                                   |
| `platform_balance_payment` | A purchase paid for with existing wallet balance instead of an external card or LPM.                                                             |
| `passthrough_gmv`          | Recorded Gross Merchandise Value (GMV) for a purchase made through an external processor, such as Stripe Standard, PayPal, or Coinbase Commerce. |
| `installment_default`      | A charge to the wallet covering a buyer's defaulted Buy Now, Pay Later installment.                                                              |

### Refunds

| Line type                         | Description                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `payment_refund`                  | A refund of a card or LPM payment, deducted from the wallet.                         |
| `payment_refund_reversal`         | Reverses a `payment_refund`, returning the funds to the wallet.                      |
| `platform_balance_payment_refund` | A refund of a wallet-balance purchase, returned to the original purchaser's balance. |

### Disputes

| Line type                    | Description                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `payment_dispute`            | A chargeback on a card or LPM payment, debited from the wallet.                                                            |
| `payment_dispute_adjustment` | A credit or debit that adjusts a chargeback when the disputed amount differs from the original payment (partial disputes). |
| `payment_dispute_reversal`   | Reverses a `payment_dispute` after the merchant wins the dispute.                                                          |
| `platform_covered_dispute`   | The portion of a chargeback Whop's marketplace covers when the sale carried a buyer fee. It can be a credit or a debit.    |
| `dispute_hold_adjustment`    | Moves funds into or out of a dispute hold. A debit places the hold, and a credit releases it.                              |

### Reserves

| Line type             | Description                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| `psp_reserve_hold`    | A payment processor withholds part of a settlement in reserve, making those funds unavailable until released. |
| `psp_reserve_release` | A payment processor returns previously withheld reserve funds to the available settlement balance.            |

### Payouts

| Line type                      | Description                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `withdrawal`                   | A payout of wallet funds to an external bank account (the line type keeps its historical name).                    |
| `withdrawal_reversal`          | Reverses a canceled or rejected payout and returns the funds to the wallet.                                        |
| `withdrawal_clawback`          | A credit to the wallet that recovers funds from the linked bank account to cover a negative balance.               |
| `withdrawal_clawback_reversal` | Reverses a `withdrawal_clawback` when the clawback later fails or the bank returns the funds.                      |
| `withdrawal_reclassification`  | Returns a payout's net amount to the wallet's available balance when Whop reclassifies it as an internal transfer. |

### Transfers

| Line type                            | Description                                                                                                                                        |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `platform_balance_transfer_outgoing` | A transfer of wallet funds out to another account on the platform.                                                                                 |
| `platform_balance_transfer_incoming` | A transfer of funds into the wallet from another account on the platform.                                                                          |
| `internal_balance_transfer_outgoing` | A transfer out to another wallet owned by the same entity, such as primary to pool. It doesn't count as revenue.                                   |
| `internal_balance_transfer_incoming` | A transfer in from another wallet owned by the same entity, such as a transfer from a parent wallet to a pool wallet. It doesn't count as revenue. |

### Currency conversion

| Line type                      | Description                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `currency_conversion_outgoing` | The source-currency debit created when the wallet converts a balance between currencies.       |
| `currency_conversion_incoming` | The destination-currency credit created when the wallet converts a balance between currencies. |

### Affiliates & revenue share

| Line type                             | Description                                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `payment_referral`                    | An affiliate referral bonus the merchant chose to share from a card or LPM payment, credited to the affiliate's wallet. |
| `payment_referral_reversal`           | Reverses a previously paid referral bonus, debited from the affiliate's wallet.                                         |
| `payment_revshare`                    | A revenue-share amount debited from the seller's wallet on a payment.                                                   |
| `payment_revshare_payout`             | A revenue-share amount credited to an affiliate's wallet on a payment.                                                  |
| `payment_revshare_reversal`           | Reverses a previously paid revenue share, debited from the affiliate's wallet.                                          |
| `payment_revshare_refund`             | Returns a revenue-share amount to the seller's wallet after a refund or dispute.                                        |
| `application_fee_payout`              | A platform fee from a connected-account payment, settled into the parent account.                                       |
| `platform_affiliate_payment`          | A referral bonus for referring an account or buyer to Whop: a share of the processing revenue that account generated.   |
| `platform_affiliate_payment_reversal` | Reverses a `platform_affiliate_payment` that Whop determined was invalid or needed correction.                          |
| `ad_publisher_payout_received`        | A credit to a publisher's wallet for ad revenue earned.                                                                 |
| `ad_publisher_payout`                 | A payout of ad revenue, debited from the Whop Ads wallet.                                                               |
| `company_referral`                    | Legacy: a referral bonus for referring an account to Whop, sharing the processing revenue that account generated.       |

### Airdrops

| Line type                  | Description                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `airdrop`                  | A credit of funds into the wallet at Whop's expense, typically promotional or to make good on an issue.           |
| `airdrop_reversal`         | Reverses an `airdrop` found to be invalid or in need of correction.                                               |
| `airdrop_link_created`     | Debits the wallet to fund a newly created airdrop link.                                                           |
| `airdrop_link_returned`    | Returns an airdrop link's funds to the sender's available balance after the sender cancels the link.              |
| `airdrop_link_redeemed`    | Credits a claimed airdrop link's funds into the recipient's available balance.                                    |
| `resolution_center_refund` | A refund to a buyer that Whop covers out of pocket after resolving a Resolution Center case in the buyer's favor. |

### Advertising

| Line type            | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `ad_campaign_budget` | Earmarks funds for an ad campaign when funding the campaign.                              |
| `ad_spend_charge`    | A charge to earmarked campaign funds for ad spend, billed at the marked-up rate.          |
| `ad_budget_release`  | Releases unspent campaign budget, typically the first step of a refund or balance return. |

### On-chain assets and cards

<Note>
  `onchain_deposit` is opt-in: it is excluded from the default feed and only
  returned when you request it explicitly in `line_types`.
</Note>

| Line type                          | Description                                                                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `onchain_deposit`                  | An inbound on-chain crypto transfer credited to a Whop-managed wallet (including onramps such as MoonPay). Opt-in — only returned when explicitly requested. |
| `onchain_wallet_transfer_outgoing` | An outbound on-chain transfer from a Whop-managed crypto wallet to another Whop-managed wallet.                                                              |
| `onchain_wallet_transfer_incoming` | An inbound on-chain transfer to a Whop-managed crypto wallet from another Whop-managed wallet.                                                               |
| `onchain_swap_target`              | The received side of an on-chain token swap — the output token credited to the wallet.                                                                       |
| `treasury_payin`                   | A credit to the cash wallet from a treasury pay-in, such as a crypto off-ramp moving stablecoin balance back into cash.                                      |
| `card_spend_authorization`         | A card authorization hold that debits the card balance when the issuer authorizes a purchase.                                                                |
| `card_spend_authorization_void`    | Returns a card authorization to the card balance when it's voided, expired, or declined after auth.                                                          |
| `card_spend_refund`                | A merchant refund credited back to the card balance.                                                                                                         |

### Legacy & miscellaneous

| Line type                     | Description                                                                                                                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `legacy_crypto_payment`       | A historical Coinbase Commerce payment Whop processed and paid out to the merchant's wallet.                                                                                                               |
| `legacy_payment`              | A historical express-account payment credited directly to the user's wallet.                                                                                                                               |
| `legacy_payment_refund`       | Reverses a `legacy_payment`, debiting the merchant's wallet.                                                                                                                                               |
| `license_sale`                | The merchant payout for a multi-party software license sale — the sale amount net of fees. Commission and revenue shares use the distinct `license_sale_commission` and `license_sale_revenue` line types. |
| `license_sale_commission`     | The commission portion of a software license sale, credited to the commission wallet.                                                                                                                      |
| `license_sale_revenue`        | The revenue-share portion of a software license sale, credited to the revenue wallet.                                                                                                                      |
| `software_rental_revshare`    | A revenue-share payout for a software rental, crediting the merchant net of fees.                                                                                                                          |
| `software_rental_transaction` | The final settlement of a software rental, crediting the merchant net of fees.                                                                                                                             |
| `misc_purchase`               | A purchase made directly from Whop, for example a legacy software rental or proxy.                                                                                                                         |
| `misc_refund`                 | A refund of a `misc_purchase`.                                                                                                                                                                             |
| `referral_bonus`              | A bonus for referring a new user to sign up for whop.com.                                                                                                                                                  |
| `promo_reversal`              | A one-time reversal of promotional, non-withdrawable `referral_bonus` balance.                                                                                                                             |
| `misc_reversal`               | Legacy — a miscellaneous debit for charges negotiated outside the normal transaction lifecycle.                                                                                                            |

### Fees

| Line type                             | Description                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `payment_processing_fixed_fee`        | A fixed fee (≈\$0.30) for processing a card or LPM payment.                                                        |
| `payment_processing_percentage_fee`   | A percentage fee such as 2.7% for processing a card or LPM payment.                                                |
| `billing_percentage_fee`              | A fee on recurring billing transactions covering subscription management and retries.                              |
| `cross_border_percentage_fee`         | A fee on cross-border transactions, charged when the buyer is outside the processing region.                       |
| `fx_percentage_fee`                   | A fee for converting a payment processed in a foreign currency at settlement.                                      |
| `orchestration_percentage_fee`        | A fee for routing a payment across multiple PSPs (smart routing and failover).                                     |
| `revshare_percentage_fee`             | A fee for using revenue-share payouts on a payment.                                                                |
| `three_ds_fixed_fee`                  | A fixed fee for 3DS authentication, charged only when checkout requires 3DS.                                       |
| `whop_processing_fee`                 | A platform fee for using whop.com, not tied directly to processing cost.                                           |
| `fraud_prevention_fee`                | A fee for fraud prevention on card or LPM payments.                                                                |
| `buyer_fee`                           | A buyer fee booked as platform income. It posts only when the configuration treats buyer fees as platform revenue. |
| `sales_tax_fee`                       | A fee for Whop collecting and remitting sales tax on a payment.                                                    |
| `sales_tax_remittance`                | Sales tax collected on a transaction that Whop remits to the tax authority.                                        |
| `sales_tax_remittance_reversal`       | Reverses a `sales_tax_remittance` after someone refunds or disputes a payment.                                     |
| `affiliate_fee`                       | The portion of a card or LPM payment earmarked to pay an affiliate referral bonus.                                 |
| `application_fee`                     | The platform fee from a connected-account payment paid to the parent account.                                      |
| `payout_fee`                          | A fee covering the cost of paying out to a bank account.                                                           |
| `payment_dispute_fee`                 | A fee (≈\$15) for receiving a chargeback on a card or LPM payment.                                                 |
| `dispute_alert_fee`                   | A fee for receiving an early dispute warning on a card or LPM payment.                                             |
| `stripe_domestic_processing_fee`      | Legacy — a fee for processing a card or LPM payment through Stripe domestically.                                   |
| `stripe_international_processing_fee` | Legacy — a fee for processing a card or LPM payment through Stripe internationally.                                |
