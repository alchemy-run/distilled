> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# QuickBooks

> Sync Whop payments, refunds, and payouts to QuickBooks Online automatically. Keep your books accurate without manual data entry.

<Card title="Install the Whop app for QuickBooks" icon="download" href="https://whop.com/apps/app_ygXqVjukBrVaU3/install/">
  Available on Whop Apps
</Card>

## Overview

The Whop × QuickBooks integration connects your QuickBooks Online account with Whop and keeps the two in sync automatically. It works in both directions:

1. **Sell on Whop → sync to QuickBooks.** Whop records payments as SalesReceipts and reconciles payouts with your bank. No manual data entry.
2. **Invoice from QuickBooks → pay through Whop.** The integration adds a Whop payment option to each invoice so customers can pay online. It marks the invoice Paid when they pay.

Refunds, recurring subscriptions, withdrawals, and processing fees all sync between the two systems automatically.

## What this integration does

| Feature                        | Description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| **Payment Sync**               | Whop records every payment in QuickBooks as a SalesReceipt automatically.           |
| **Invoice Automation**         | QuickBooks invoices get a Whop payment link. Payments mark the invoice Paid.        |
| **Refund Tracking**            | QuickBooks sends refunds through Whop automatically.                                |
| **Subscription Sync**          | Recurring Transactions in QuickBooks create matching Whop recurring plans.          |
| **Payout Reconciliation**      | Whop records payouts as multi-line Bank Deposits that reconcile 1:1 with your bank. |
| **Bidirectional Product Sync** | Products/Services sync between QuickBooks and Whop in either direction.             |

## Before you begin

* An active Whop account where you sell your products or services
* An active QuickBooks Online account (any plan — sandbox accounts work too)
* Admin access to both accounts

Estimated setup time: 5–10 minutes.

## Step 1: Install the app from Whop

Select the **Install the Whop app for QuickBooks** button at the top of this page, or search for "QuickBooks Sync" in the Whop App Marketplace. Select **Install**. The app then appears in your Whop dashboard under the Apps section.

## Step 2: Connect your QuickBooks account

Open the app and select **Connection** in the left sidebar. You have two options:

* **Connect (Sandbox)** — for testing with a QuickBooks sandbox account
* **Connect (Production)** — for your live QuickBooks account

Select the button for your environment. Intuit opens a page where you can log in, select your company, and authorize the connection.

## Step 3: Configure your account mapping

Select **Accounts** in the sidebar and configure:

| Field                      | What to pick                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Revenue Account**        | Where QuickBooks records invoice revenue — usually "Sales" or "Sales of Product Income"                                   |
| **Processing Fee Account** | Where QuickBooks records Whop fees — use the automatic "Whop Processing Fees" account or pick an existing expense account |
| **Bank Account**           | Where Whop withdrawals land — pick your business checking account                                                         |
| **Undeposited Funds**      | QuickBooks detects this account automatically. No action needed.                                                          |

<Note>
  **Tax handling:** QuickBooks calculates tax based on your settings, and Whop
  charges the tax-inclusive total. If your Whop products have their
  own tax codes configured, remove them to avoid double-taxation.
</Note>

## Step 4: Import historical data (optional)

If you have existing data in QuickBooks from before connecting, select **Backfill** in the sidebar. Four operations are available:

* **Users to Customers** — imports Whop members as QuickBooks customers (matches by email)
* **Items / Products** — sync items between QuickBooks and Whop in either direction
* **Unpaid Invoices** — creates Whop payment links for existing unpaid invoices
* **Paid Invoice Matching** — matches existing paid invoices to Whop payments for reconciliation

Each backfill is idempotent — safe to re-run. Entities already mapped get skipped.

## Sync modes

The integration supports three sync modes. Switch anytime from the dashboard — the change is forward-only.

### All sales (recommended)

Records every Whop sale individually in QuickBooks. Direct sales create a SalesReceipt depositing to a Whop Clearing account. Payments on QuickBooks Online invoices create a Payment record. Withdrawals drain the clearing account through a multi-line Bank Deposit.

### Withdrawals only

QuickBooks records only Whop payouts. It doesn't record individual sales. This mode works best for sellers who don't use QuickBooks Online invoices and only want to track payouts.

<Warning>
  If you also use QuickBooks Online invoices in this mode, revenue will be double-counted
  (the invoice credits Revenue, and the deposit credits it again).
</Warning>

### Invoicing only

QuickBooks doesn't record Whop payments, refunds, or withdrawals in this mode. QuickBooks Online → Whop flows still work, including invoice link embedding, recurring templates, product sync, and refunds.

## What happens next

Once connected and configured, the integration syncs automatically:

* **New QuickBooks Online invoice** → The integration generates and embeds a Whop payment link within about 1 minute
* **Customer pays** → The integration creates a QuickBooks Payment record and marks the invoice Paid
* **Refund in QuickBooks Online** → QuickBooks sends the refund through Whop automatically
* **Recurring Transaction** → Creates a Whop recurring plan. Future payments sync back
* **Whop payout** → Creates a multi-line Bank Deposit in QuickBooks Online for the gross amount minus fees

## Monitoring sync activity

The **Sync History** page shows every event processed — filter by status (completed, failed, pending). The **Errors** page shows failed events with retry status. The integration retries failed operations up to 5 times with exponential backoff.

## Frequently asked questions

**Whop payments without QuickBooks invoices**

Use All Sales sync mode, which is the default. The integration records every Whop payment as a SalesReceipt.

**Existing QuickBooks Payments setup**

While connected, the integration routes new invoices through Whop instead of QuickBooks Payments. It leaves existing open invoices unchanged. Use the unpaid invoice backfill to convert them.

**Testing with a QuickBooks sandbox account**

Select **Connect (Sandbox)** on the Connection page.

**Disconnecting QuickBooks**

Go to the Connection page and select **Disconnect QuickBooks**. Your sync history and mappings remain available if you reconnect later.
