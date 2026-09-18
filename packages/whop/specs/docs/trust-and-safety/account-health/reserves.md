> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Reserves

> Why Whop holds part of your balance in reserve, how each reserve type works, and when Whop releases held funds

A reserve is a portion of your balance that Whop holds back from payout for a period of time. Reserved funds are still your money. They count toward your total balance, are never a fee, and release back to your available balance automatically.

## Why reserves are necessary

When a customer disputes a payment, Whop deducts the payment amount and any card-network dispute fee from your balance. As the payment platform, Whop is responsible for those amounts even when a business has already withdrawn its funds or is unable to fulfill its orders.

It's possible that an account's balance isn't enough to cover future disputes and refunds. To avoid that situation, Whop places reserves where it anticipates losses. The reserve exists to cover those losses. If the losses never materialize, Whop releases the funds in full and lifts the reserve. This process can be difficult, but it protects both your business and your customers.

## When a reserve is placed

Whop continuously reviews every account. It sizes reserves for the specific risk on each account. That risk includes how much of your recent volume remains exposed to refunds or disputes and how likely those outcomes are, based on your track record. Whop may place or increase a reserve when:

* Your account is new, or doesn't have much sales history yet
* Your account has an elevated dispute rate, or its rate trends toward card network thresholds
* You have a high rate of unresolved [Resolution Center](/payments/resolution-center) cases
* Customers pay you well before you deliver (pre-orders, bookings, or services delivered over months), so payments stay disputable long after the sale
* A sudden change in your sales patterns increases refund or dispute exposure

The same review works in both directions. Your reserve shrinks and eventually comes off as these conditions improve. For example, your dispute rate may come down, or older sales may age out of their dispute windows.

<Note>
  You can see every reserve on your account, broken down by type with amounts
  and release dates, on the [Balances](https://whop.com/dashboard/balance/)
  page of your dashboard.
</Note>

## Rolling reserve

Whop holds a percentage of each sale for a set number of days, then releases it. Whop ties every hold to the sale that created it, so funds return continuously as each sale ages past its hold period. You receive older funds back at the same rate Whop holds funds from new sales.

For example, with a 10% reserve and a 90-day hold period:

| Sale     | Amount  | Held  | Releases |
| -------- | ------- | ----- | -------- |
| March 1  | \$1,000 | \$100 | May 30   |
| March 15 | \$500   | \$50  | June 13  |
| April 1  | \$2,000 | \$200 | June 30  |

<div className="my-8 space-y-3">
  <div className="flex items-center gap-3">
    <div className="w-24 shrink-0 text-right text-sm text-gray-500 dark:text-gray-400">Mar 1 sale</div>

    <div className="relative flex-1 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
      <div className="absolute inset-y-0 left-0 w-[74%] rounded-full bg-[#ff6423] flex items-center justify-center text-white text-xs font-medium whitespace-nowrap">\$100 held → releases May 30</div>
    </div>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-24 shrink-0 text-right text-sm text-gray-500 dark:text-gray-400">Mar 15 sale</div>

    <div className="relative flex-1 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
      <div className="absolute inset-y-0 left-[12%] w-[74%] rounded-full bg-[#ff6423] flex items-center justify-center text-white text-xs font-medium whitespace-nowrap">\$50 held → releases Jun 13</div>
    </div>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-24 shrink-0 text-right text-sm text-gray-500 dark:text-gray-400">Apr 1 sale</div>

    <div className="relative flex-1 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
      <div className="absolute inset-y-0 left-[26%] w-[74%] rounded-full bg-[#ff6423] flex items-center justify-center text-white text-xs font-medium whitespace-nowrap">\$200 held → releases Jun 30</div>
    </div>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-24 shrink-0" />

    <div className="flex-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>Mar 1</span>
      <span>Apr 1</span>
      <span>May 1</span>
      <span>Jun 1</span>
      <span>Jun 30</span>
    </div>
  </div>
</div>

Your reserve breakdown always shows your current percentage and hold period. If Whop lowers your reserve percentage, the lower rate applies to new sales. Money already in reserve keeps its original release date. If Whop removes your reserve entirely, it immediately releases the held funds into your available balance.

### How the hold period is determined

A sale doesn't stay at risk forever. Once you deliver the product and its typical refund or dispute window passes, little remains for a reserve to cover. Whop sizes the hold period to that lifecycle. It lasts long enough to cover your fulfillment cycle and the period after delivery when refunds and disputes typically arrive. If you deliver instantly, that window is short. If customers pay months before you deliver, it's longer.

## Fixed-amount reserve

Sometimes Whop holds a specific dollar amount from your existing balance, rather than taking a percentage of new sales. This is a fixed-amount reserve. It can apply on its own or alongside a rolling reserve, and it never holds more than what's actually in your balance.

A fixed-amount reserve is one lump sum with a single release date, shown as its own line in your reserve breakdown. On that date the whole amount releases together. It can also release early. If Whop lowers the amount, the difference returns to your available balance right away. If Whop removes the reserve, the entire amount returns right away.

For example, a \$5,000 fixed-amount reserve placed on June 1 with a 90-day hold releases in full on August 30:

<div className="my-8 space-y-3">
  <div className="flex items-center gap-3">
    <div className="w-24 shrink-0 text-right text-sm text-gray-500 dark:text-gray-400">Jun 1 hold</div>

    <div className="relative flex-1 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
      <div className="absolute inset-y-0 left-0 w-full rounded-full bg-[#ff6423] flex items-center justify-center text-white text-xs font-medium whitespace-nowrap">\$5,000 held → releases in full Aug 30</div>
    </div>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-24 shrink-0" />

    <div className="flex-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>Jun 1</span>
      <span>Jul 1</span>
      <span>Aug 1</span>
      <span>Aug 30</span>
    </div>
  </div>
</div>

## How reserves are released

Every hold carries a release date, visible in your reserve breakdown. When the date arrives, the funds move to your available balance automatically.

## Financing (BNPL) reserves

Sales financed through a buy now, pay later provider carry a reserve set by that provider, not by Whop. You're paid up front while the customer pays the provider in installments, so the provider requires a hold on part of each financed sale until the plan settles. These reserves apply to financed sales regardless of your account's health, and appear in your reserve breakdown as their own lines with their own release dates.

Each provider's guide covers its reserve in detail:

* [Splitit](/payments-and-billing/financing/splitit-guide): 15% of each financed sale, held for 180 days
* [SeQura](/payments-and-billing/financing/sequra-guide): 12% of each financed sale, with a hold period of about 12 months

## Seeing your reserves

The [Balances](https://whop.com/dashboard/balance/) page shows your full reserve breakdown: the total held, each reserve type with its current percentage and hold period, and the exact dates funds unlock.

You can also retrieve the same breakdown programmatically via API, using `GET /accounts/{account_id}/reserves`.

## Next steps

<CardGroup cols={2}>
  <Card title="Managing dispute rates" href="/trust-and-safety/account-health/managing-dispute-rates">
    Keeping disputes low is the fastest way to shrink a reserve, and to never
    get one.
  </Card>

  <Card title="Payment health" href="/trust-and-safety/account-health/payment-health">
    Read your Payment health dashboard and the controls on your account.
  </Card>
</CardGroup>
