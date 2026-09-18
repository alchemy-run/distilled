> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payment health

> Read your Payment health dashboard: your dispute rate, refund rate, why customers dispute, and the controls on your account

Your **Payment health** dashboard shows how disputes and refunds affect your account and payment controls. You'll find it in your dashboard under **Payments** → **Payment health**, at [whop.com/dashboard/payments/health](https://whop.com/dashboard/payments/health/).

## What a dispute rate is

A dispute (also called a chargeback) happens when a customer asks their bank to reverse a payment instead of asking you for a refund. Your dispute rate is the share of your payments that end in a dispute.

A few disputes are normal for any business. The problem is the rate. Card networks hold every merchant to a maximum dispute rate, and the line they care about is **1.5%**. Stay under it and you're in good standing. Go over it and there are consequences for you and for Whop.

## Your dispute rate, measured two ways

The dashboard shows your dispute rate in two modes: **30d window** and **By purchase date**. They answer different questions.

* **30d window**: disputes filed in the last 30 days ÷ payments taken in the last 30 days.
* **By purchase date**: takes the payments from one period and asks how many of them got disputed. Disputes filed within N days of the payment ÷ payments taken in the period, where N is the **Disputed within 7 days**, **Disputed within 14 days**, or **Disputed within 28 days** selector. The dashboard assigns each dispute to the payment date, not the filing date.

For example, say you took 1,000 payments in the last 30 days, and 10 disputes arrived in that time:

<div className="my-8 space-y-4">
  <div className="flex items-center gap-2">
    <div className="h-4 w-4 rounded-full bg-[#ff6423]" />

    <div className="h-4 w-4 rounded-full bg-[#ff6423]" />

    <div className="h-4 w-4 rounded-full bg-[#ff6423]" />

    <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />

    <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />

    <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />

    <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />

    <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />

    <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />

    <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />
  </div>

  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
    <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#ff6423]" />3 on payments from the last 30 days</span>
    <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700" />7 on older payments</span>
  </div>
</div>

The **30d window** rate counts all 10 disputes: 10 ÷ 1,000 = **1%**. The **By purchase date** rate counts only the 3 that belong to this month's payments: 3 ÷ 1,000 = **0.3%** so far. That rate keeps rising as more disputes on this month's payments come in.

Which one to watch depends on your situation:

* **If your sales are steady**, the two rates look about the same.
* **If you're growing fast**, the 30d window rate looks low because customers haven't had time to dispute your newest payments yet. Watch the by-purchase-date rate instead: it shows your dispute rate before the 30d number catches up.

<Note>
  The by-purchase-date view only counts payments after their full dispute
  window has elapsed. If your business took a payment yesterday, its 28-day
  window hasn't elapsed, so the view can't score it yet.
</Note>

## Statuses

Each dispute rate metric gets a status: **Healthy**, **At risk**, or **Critical**. The chart draws the exact bands for each metric, and every payment method tab has its own: American Express, Discover, and buy now, pay later methods are held to different lines than standard cards. If your account doesn't have enough payments or disputes to score yet, the metric shows **Low data** instead.

## The controls on your account

The **Controls** section of the page lists the [payment controls](/trust-and-safety/account-health/controls) currently set on your account: your reserve, auto-refund thresholds, pending delay, fees, and financing availability. Reviews run continuously, and controls ease or lift automatically as your account recovers.

## Refund rate

The dashboard also shows your refund rate: refunds issued as a share of payments. Read it next to your dispute rate. A low refund rate with a high dispute rate means customers who wanted their money back went to their bank instead of coming to you.

## Why customers dispute

The **Why customers dispute** card breaks your disputes down by reason. Each reason points at a fix:

| Reason                    | What the customer is saying                | The fix                                                      |
| ------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| **Fraudulent**            | "I don't recognize this charge"            | Use a clear billing descriptor and disclose rebills up front |
| **Not received**          | "My order never arrived"                   | Add tracking and set honest delivery estimates               |
| **Subscription canceled** | "I canceled but was still charged"         | Make canceling easy and honor it quickly                     |
| **Product unacceptable**  | "This wasn't what I was promised"          | Make your storefront match what you actually deliver         |
| **Credit not processed**  | "I was promised a refund and never got it" | Issue owed refunds fast                                      |

<Tip>
  If one reason dominates the chart, start there. Fixing the largest slice
  moves your rate the most.
</Tip>

## Next steps

<CardGroup cols={2}>
  <Card title="Payment controls" href="/trust-and-safety/account-health/controls">
    What each control on your account does and how controls lift.
  </Card>

  <Card title="Managing dispute rates" href="/trust-and-safety/account-health/managing-dispute-rates">
    The concrete steps that bring a dispute rate down.
  </Card>
</CardGroup>
