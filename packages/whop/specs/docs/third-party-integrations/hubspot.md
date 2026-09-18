> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# HubSpot

> Connect Whop to HubSpot. Sync products, generate checkout links from deals and contacts, and see payments natively in Commerce Hub.

<Card title="Install the Whop app for HubSpot" icon="download" href="https://ecosystem.hubspot.com/marketplace/listing/whoppayments-by-whop">
  Available on the HubSpot App Marketplace
</Card>

## Overview

The Whop × HubSpot integration brings your payment, subscription, and membership data into HubSpot using **native** Payment and Subscription objects — not custom properties or spreadsheets. Your sales team gets full visibility into revenue inside HubSpot's customer relationship management tools.

This guide covers what the integration does, how payments flow through the system, and how to connect Whop to HubSpot.

## What this integration does

| Feature                          | Description                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Product Sync**                 | Sync all Whop products and pricing plans into HubSpot's product library in one action.                                           |
| **Checkout Link Generation**     | Generate and send Whop checkout sessions from a deal or contact record in a few actions.                                         |
| **Native Payment Records**       | Every Whop payment creates a native HubSpot payment record in Commerce Hub.                                                      |
| **Subscription Tracking**        | Recurring subscriptions appear as HubSpot subscription objects with status, recurring revenue, and billing details.              |
| **Deal & Contact Association**   | HubSpot links payments and subscriptions to the relevant deal, contact, or both.                                                 |
| **Quote Payments**               | Add a "Pay with Whop" button directly to HubSpot quote templates.                                                                |
| **Multi-Payment Method Support** | Supports all payment methods enabled in your Whop account. The right methods appear automatically based on the buyer's location. |

## Connecting Whop to HubSpot

Setup is one-time and usually takes under 10 minutes.

### Prerequisites

* An active Whop account (free to create)
* HubSpot account with admin or integration permissions
* At least one product in Whop. This is optional during setup but required to process payments.

### Part 1: Install the app in HubSpot

1. In HubSpot, open the App Marketplace and search for **Whop**, or use the install button at the top of this page.
2. Select the orange **Connect** button. If you have multiple HubSpot accounts, choose the correct one.
3. Confirm you have a Whop account (or create one at whop.com).
4. Select **Yes** to continue to the API key step.

### Part 2: Generate your Whop API key

1. Log into your Whop dashboard.
2. In the left sidebar, go to **Developer**.
3. Scroll to **API Keys** and select **Create API Key**.
4. Select **All** permission scopes and name the key (e.g., "HubSpot Integration").
5. Select **Save**. Copy the token immediately and store it securely — Whop won't show it again.

<Tip>
  To update your API key later, go to HubSpot
  **Settings** → **Integrations** → **Connected Apps** → **Whop** → **Settings**
  and paste the new key.
</Tip>

### Part 3: Connect the API key in HubSpot

1. In HubSpot, paste the API key into the field provided.
2. Select **Save**. You should see "API key saved."
3. Select **OK** to finish. The integration is now active.

## Syncing products

After connecting, sync your Whop products into HubSpot's product library so they're available when generating checkout links.

1. In HubSpot, go to **Settings** → **Integrations** → **Connected Apps** → **Whop**.
2. Select **Sync Products**.
3. HubSpot imports all products from your Whop account into its product library.

Re-run this sync any time you add or update products in Whop.

## Adding the Whop payment card to records

Add the Whop payment card to your deal and contact views so your team can generate checkout links without leaving HubSpot. Do this once per view.

### For deal records

1. Open any deal in HubSpot.
2. Select **Customize** in the right panel, and then select **Customize the default view**.
3. Select **Add a card** and open the **Card Library**.
4. Search for **Whop** and add the **Whop-Payment-Link-Deal** card.
5. Drag it to your preferred position. For easy access, place it near the top. Then select **Save and Exit**.

### For contact records

Follow the same steps inside a contact record view. Each view has its own configuration.

## Generating a checkout session

1. Open the deal or contact where you want to collect payment.
2. Find the Whop payment card on the record.
3. Select the **Product** from the dropdown (populated from your synced Whop products).
4. Select the **Pricing Plan** (e.g., $2,000 one-time or $500/month recurring).
5. Select **Generate Checkout Session**.
6. Copy the unique checkout link and send it to the prospect.

<Tip>
  The checkout form automatically displays the right payment methods based on
  the buyer's location. Whop supports 100+ payment methods across 135+
  currencies.
</Tip>

## Adding Whop payment links to invoices

You can add the Whop payment link as a visible column on your invoice list for quick access.

1. In HubSpot, go to **Invoices**.
2. Select **Edit columns**.
3. Search for and select **Whop payment link**.
4. Save the view. The payment link now appears as a column on every invoice row.

## Adding a payment button to quotes

You can add a "Pay with Whop" button to any HubSpot quote template so prospects can pay directly from the quote.

1. Find **Quote template settings** through HubSpot search, and then select it.
2. Select **Customize Quote Template** and select the template you want to edit.
3. Select a content block (e.g., the Quote Name block for the top, or Sender Company for the bottom).
4. In the rich content editor, select **Insert** → **Embed**.
5. Paste the payment button code below.

```html theme={null}
<a href="https://whop-payments.com/quote-pay.html?quoteId=&portalId=YOUR_PORTAL_ID"
   style="display: inline-block; padding: 12px 20px;
          background-color: #ff6423; color: white;
          border-radius: 6px; text-decoration: none;">
   Pay with Whop
</a>
```

Replace `YOUR_PORTAL_ID` with your HubSpot portal ID.

## How payment data appears in HubSpot

When a customer pays through a Whop checkout link generated from HubSpot, HubSpot logs the data automatically.

### Payment records

Every completed payment creates a native HubSpot payment record. View them under **Commerce Hub** → **Payments**. Each record includes payment ID, amount, card details, contact/deal association, and timestamp.

### Subscription records

For recurring payments, HubSpot creates a subscription record alongside the payment. It tracks subscription status, monthly recurring revenue, annual recurring revenue, total collected, billing method, and Whop Membership ID.

### Object associations

| Association            | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| Payment → Contact      | HubSpot links the payment to the contact used for checkout.  |
| Payment → Deal         | HubSpot links the payment to the deal that started checkout. |
| Subscription → Contact | HubSpot links the subscription to the contact.               |
| Subscription → Payment | HubSpot links each payment to its parent subscription.       |

<Tip>
  You don't need to log payments or update deal stages manually. Data flows from
  Whop into HubSpot as soon as Whop processes a payment.
</Tip>

## Frequently asked questions

**Paid Whop account**

No. Whop accounts are free. You only pay transaction fees on payments you process. See [Pricing and fees](/fees) for details.

**Supported payment methods**

Whop supports more than 100 payment methods across 195 countries and more than 135 currencies. Options include cards, digital wallets, bank transfers, and financing. Examples include Visa, Apple Pay, PayPal, Klarna, and Afterpay. The available methods depend on the buyer's location. See [Pricing and fees](/fees) for the full list.

**Using another payment processor**

Yes. Whop payments are separate and clearly labeled. In **Commerce Hub** → **Payments** you can filter to show only Whop transactions.

**Viewing all Whop payments**

Go to **Commerce Hub** → **Payments** in HubSpot to see every Whop payment as a native record.
