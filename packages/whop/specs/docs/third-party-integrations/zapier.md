> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Zapier

> Connect Whop to 7,000+ apps with Zapier. Automate triggers, actions, and conditional workflows.

## About Zapier

Zapier is an automation platform that connects over 7,000 apps without code. It works on a simple idea: when something happens in one app (a **trigger**), automatically do something in another app (an **action**).

Zapier calls these automated workflows **Zaps**. Each Zap starts with one trigger and can include one or more actions. For example, a new member could trigger a welcome message in Discord. The Zap could also add the member to a Google Sheet and send a Slack notification.

## Key Zapier concepts

* **Triggers** — Events that start a Zap. In the Whop integration, triggers fire when something happens on your Whop (e.g., new payment, new member, new dispute).
* **Actions** — Tasks Zapier runs after a trigger. Whop actions let you cancel a membership, create an invoice, approve a waitlist entry, look up member details, and more.
* **Paths** — Conditional logic (if/then branching). Route high-value payments differently than standard ones, or handle different product types with different workflows.
* **Filters** — Conditions a Zap must meet to continue, such as payments over \$50 or specific products.

## Triggers — events that start your workflows

Triggers are the starting point of every Zap. When one of these events occurs on your Whop, Zapier runs the workflow you built. Whop has **14 triggers**:

| Trigger                 | Description                                         | Status  |
| ----------------------- | --------------------------------------------------- | ------- |
| New Member Joined       | Fires when a new member joins your Whop             | UPDATED |
| Membership Went Valid   | Fires when any membership becomes active/valid      | UPDATED |
| Membership Went Invalid | Fires after a membership expiration or cancellation | Updated |
| Payment Completed       | Fires when a payment is successfully processed      | UPDATED |
| Payment Failed          | Fires when a payment attempt fails                  | UPDATED |
| Payment Refunded        | Fires after a payment refund                        | New     |
| New Dispute             | Fires when a customer files a chargeback or dispute | New     |
| `New Dispute Alert`     | Fires when Whop detects an early dispute signal     | New     |
| Invoice Created         | Fires when Whop generates a new invoice             | New     |
| Invoice Past Due        | Fires when an invoice becomes overdue               | New     |
| New Lead                | Fires when Whop captures a new lead or prospect     | New     |
| New Entry               | Fires when someone submits a waitlist entry         | New     |
| Entry Approved          | Fires after approval of a waitlist entry            | New     |
| Entry Denied            | Fires after denial of a waitlist entry              | New     |

### Trigger details

**Membership triggers**

* **New Member Joined** — Fires when a new member successfully joins your Whop with any plan. Data includes member email, product, plan, and membership ID. Use for welcome messages, sales platform updates, or team notifications.
* **Membership Went Valid** — Fires when any membership becomes active through a new purchase, renewal, restored access, or resumption. This trigger covers more events than New Member Joined. Use it to track active subscribers or sync access.
* **Membership Went Invalid** — Fires when a membership becomes inactive after cancellation, expiration, failed payment, or manual revocation. Use it to remove access, run win-back campaigns, or log churn.

**Payment triggers**

* **Payment Completed** — Fires on every successful payment. Payload includes amount, currency, payment method, member details, product, plan, and whether it’s initial or renewal. Use for revenue tracking, sales notifications, and financial logging.
* **Payment Failed** — Fires when the processor declines a payment or another failure occurs. Includes the failure reason, member information, and plan. Use for payment reminders, failure logs, or churn notifications.
* **Payment Refunded** — Fires after a payment receives a refund. Use it to update accounting, adjust revenue trackers, or send a customer confirmation.

**Dispute and dispute alert triggers**

* **New Dispute** — Fires when a customer files a chargeback or dispute. Use it to notify your team, pause member access, or start evidence collection.
* **New Dispute Alert** — Fires when Whop detects an early dispute signal before it becomes a chargeback. Use it to contact the customer and resolve the issue before the chargeback.

**Invoice triggers**

* **Invoice Created** — Fires when Whop generates a new invoice. Use it to sync accounting, send custom invoice notifications, or log to a sheet.
* **Invoice Past Due** — Fires when an invoice passes its due date unpaid. Use for follow-up emails, finance-team alerts, or pausing access until paid.

**Lead trigger**

* **New Lead** — Fires when Whop captures a new lead from a store page, landing page, or API. Use it to add the lead to email marketing, notify sales, or start a nurture sequence.

**Waitlist / entry triggers**

* **New Entry** — Fires when someone submits a waitlist application. Use to notify your team, log to a review sheet, or send a confirmation.
* **Entry Approved** — Fires when you approve a waitlist entry. Use it to send welcome messages, add the user to Discord, or update your sales platform.
* **Entry Denied** — Fires when you deny a waitlist entry. Use it to send a rejection email or log the reason.

## Actions — what happens next

Actions run after a trigger (or as steps in multi-step Zaps). Whop has **29 actions** in these categories.

### Membership actions

| Action            | Description                           | Status  |
| ----------------- | ------------------------------------- | ------- |
| Cancel Membership | Cancel an existing membership         | UPDATED |
| Pause Membership  | Temporarily pause a membership        | New     |
| Resume Membership | Resume a previously paused membership | New     |
| Update Membership | Update membership details or metadata | New     |

* **Cancel Membership** — Terminates an active subscription. Use it when a customer files a dispute or for self-service cancellation flows.
* **Pause Membership** — Suspends access without cancelling. Use for seasonal holds or member-requested breaks.
* **Resume Membership** — Reactivates a paused membership. Pair with a trigger or manual step.
* **Update Membership** — Change membership details or metadata (tags, custom fields, etc.).

### Payment actions

| Action           | Description                                       | Status  |
| ---------------- | ------------------------------------------------- | ------- |
| Create Payment   | Charge a member using their stored payment method | UPDATED |
| Refund Payment   | Issue a full or partial refund on a payment       | New     |
| Retry Payment    | Retry a failed payment attempt                    | New     |
| Get Payment Fees | Retrieve fee breakdown for a payment              | New     |

* **Create Payment** — Charges a member's stored payment method asynchronously. Use webhooks or Payment Completed to confirm the result. Use this action for add-ons or one-off charges.
* **Refund Payment** — Issues a full or partial refund. Use it for automatic refund rules, such as refunding small amounts after dispute alerts.
* **Retry Payment** — Retry a failed charge. Use in dunning sequences after a delay.
* **Get Payment Fees** — Get fee breakdown (platform + processor). Use for reporting and reconciliation.

### Invoice actions

| Action         | Description                         | Status |
| -------------- | ----------------------------------- | ------ |
| Create Invoice | Generate a new invoice for a member | New    |
| Void Invoice   | Void an existing unpaid invoice     | New    |

* **Create Invoice** — Generate a new invoice. Use for custom billing or one-off charges.
* **Void Invoice** — Cancel an unpaid invoice to prevent collection. Use this action when you create an invoice in error.

### Lead actions

| Action      | Description                       | Status |
| ----------- | --------------------------------- | ------ |
| Create Lead | Create a new lead/prospect record | New    |
| Update Lead | Update an existing lead record    | New    |

* **Create Lead** — Create a lead in Whop from external sources (e.g., Typeform, Facebook Lead Ad).
* **Update Lead** — Update an existing lead (status, notes, etc.).

### Waitlist / entry actions

| Action        | Description                      | Status |
| ------------- | -------------------------------- | ------ |
| Approve Entry | Approve a pending waitlist entry | New    |
| Deny Entry    | Deny a pending waitlist entry    | New    |

* **Approve Entry** — Approve a waitlist entry and trigger checkout or access. Whop notifies the user.
* **Deny Entry** — Deny a waitlist entry and optionally notify the user.

### Create & manage actions

| Action                  | Description                                          | Status  |
| ----------------------- | ---------------------------------------------------- | ------- |
| Create Plan             | Create a new pricing plan for a product              | UPDATED |
| Update Plan             | Update an existing plan’s pricing or settings        | New     |
| Update Product          | Update a product’s title, description, or visibility | New     |
| Create Promo Code       | Create a new discount promo code                     | UPDATED |
| Delete Promo Code       | Archive/delete an existing promo code                | UPDATED |
| Create Checkout Session | Generate a checkout link for a plan                  | UPDATED |

* **Create Plan** — Create a free, one-time, or recurring plan with stock, a waitlist, automatic expiration, and other settings.
* **Update Plan** — Change pricing, interval, visibility, stock, and other plan settings.
* **Update Product** — Change product title, description, visibility, and related settings.
* **Create Promo Code** — Create a discount code (percentage or fixed), usage limits, product/plan restrictions, expiration.
* **Delete Promo Code** — Archive a promo code to prevent its use for new checkouts.
* **Create Checkout Session** — Generate a checkout link for a plan. Use for dynamic links in emails or campaigns.

### Find & lookup actions

| Action          | Description                               | Status  |
| --------------- | ----------------------------------------- | ------- |
| Find Membership | Look up a membership by ID or filters     | UPDATED |
| Find Products   | Search for products in your Whop          | New     |
| Find Entry      | Look up a specific waitlist entry         | New     |
| Find Entries    | Search/list waitlist entries with filters | New     |

* **Find Membership** — Look up a membership by ID or filters. Use before conditional actions or to get details for later steps.
* **Find Products** — Search products. Use when you need product IDs for other actions or for reports.
* **Find Entry** — Look up one waitlist entry by ID.
* **Find Entries** — List waitlist entries with filters (product, plan, status, date). Use for review workflows or exporting applicants.

## Using Zapier Paths for conditional workflows

**Paths** add if/then logic: one trigger can lead to different actions depending on the data.

1. Add a **Paths** step after your trigger.
2. Define two or more paths. Each path has rules and its own actions.
3. Zapier evaluates the trigger data and runs the matching paths.

**Example: Payment routing**

* **Path A — High-value:** If amount > \$100 → post to #high-value-sales in Slack, add to the priority customers sheet.
* **Path B — Standard:** If amount ≤ \$100 → post to #sales in Slack.
* **Path C — First-time:** If first payment → send welcome email, notify #new-customers in Discord.
* **Path D — Renewal:** If renewal → log to a renewal tracker sheet.

**Example: New member onboarding**

* **Path A — Premium:** If member joined a premium product → assign premium Discord role, send onboarding email, add to outreach sheet.
* **Path B — Free:** If free product → assign basic Discord role, send welcome with upgrade incentives.

**Example: Failed payment recovery**

* **Path A — First failure:** Send an email to update the payment method. Retry payment after 24 hours.
* **Path B — Repeated failures:** Notify #churn-risk in Slack and send a more urgent email.

**Example: Dispute handling**

* **Path A — Low-value:** If the disputed amount is under your threshold, such as \$25, issue an automatic refund to avoid fees.
* **Path B — High-value:** If the amount exceeds the threshold → notify the team in Slack with member and payment details.

<Tip>
  Use specific conditions, add a fallback path for unmatched events, and use
  Find actions before Paths to enrich data. Keep each path focused on one
  scenario.
</Tip>

## Common integration examples

**Slack** — Post completed payments to #sales and new disputes to #disputes. Send new members to #new-members and payment failures to #churn-risk. Route waitlist notifications to a review channel.

**Discord** — Send a welcome message when a member joins. Post sale notifications in a feed channel and notify moderators when memberships become invalid. Announce waitlist approvals.

**Google Sheets** — Log payment dates, amounts, members, products, and plans. Track new members, membership churn, leads, and waitlist applicants.

**Gmail and email** — Send welcome messages to new members. Send payment, refund, failed-payment, and waitlist confirmations. Create lead nurture or launch emails.

**Customer relationship management systems** — Create or update contacts when members join or Whop captures leads. Log payments as deals or revenue. Update membership status changes.

**Accounting systems** — Create accounting invoices when Whop generates invoices. Record payments as income. Log refunds and adjust revenue in QuickBooks, Xero, or another system.

## Getting started

1. Log in at [Zapier.com](https://zapier.com) and select **Create Zap**.
2. Search for **Whop** as the trigger app and select it.
3. Choose one of the 14 trigger events.
4. Connect your Whop account (authenticate with your Whop API credentials).
5. Test the trigger to pull test data from your Whop.
6. Add one or more actions — use Whop's 29 actions or any of Zapier's 7,000+ apps.
7. Optionally add a **Paths** step between trigger and actions for conditional branching.
8. Test and publish your Zap. It will run automatically when the trigger event occurs.

For more on Whop’s API and resources, see the [Whop Developer Documentation](https://docs.whop.com).
