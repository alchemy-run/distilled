> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Local payment methods

> Pay with regional, non-card options like bank transfers, iDEAL, crypto, and more, with no additional setup required.

<div className="compact-lists" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", fontVariantNumeric: "normal" }}>
  Beyond card payments, Whop supports a wide range of local payment methods, so customers can pay using the options most common in their region. You don't need to do anything to enable these — eligible options appear automatically at checkout.

  <div style={{ marginTop: "1.5rem" }}>
    <CardGroup cols={3}>
      <Card style={{ border: "none" }} title="No setup required" icon="circle-check">
        All eligible payment methods appear automatically at checkout.
      </Card>

      <Card style={{ border: "none" }} title="Customer location" icon="globe">
        Customers see the most popular payment methods in their region.
      </Card>

      <Card style={{ border: "none" }} title="Configure per link" icon="sliders">
        Choose which local payment methods to show or hide when you set up each checkout link.
      </Card>
    </CardGroup>
  </div>

  ## Which local payment methods display at checkout?

  Local payment methods will automatically appear at checkout if:

  * Customer is in **eligible geography** (based on IP address)
  * The checkout link is in an **eligible currency**
  * The checkout link doesn't exceed the **maximum price** the local payment method supports
  * The local payment method supports the **pricing type** (i.e. one-time payment vs subscription)
  * The merchant hasn't disabled the payment method when configuring the link

  <p>
    The customer's geography, not the merchant's, determines the available local payment methods.
    For example, a customer in the Netherlands will see iDEAL – even if the
    merchant operates from the US. A customer in the US may see ACH or Cash App.
  </p>

  <Tip>
    If a local payment method doesn't appear, make sure the link uses an eligible
    currency and the customer is in an eligible region. Ask the customer to turn
    off any VPN.
  </Tip>

  ## Local payment method overview

  | Method                     | Countries | Currency      | Minimum–maximum         |
  | -------------------------- | --------- | ------------- | ----------------------- |
  | **US Bank Transfer (ACH)** | US        | USD           | $0.50–$1M               |
  | **EU bank transfers**      | EU        | EUR           | €1–€1M                  |
  | **Crypto**                 | Global    | USD           | $0–$1M                  |
  | **Cash App**               | US        | USD           | $0.50–$1M               |
  | **iDEAL**                  | EU        | EUR           | €0–€1M                  |
  | **Bancontact**             | EU        | EUR           | €0.50–€1M               |
  | **SEPA Debit**             | EU        | EUR           | €0.50–€11.5k            |
  | **Vipps**                  | NO        | NOK           | kr 0.50–kr 50k          |
  | **MobilePay**              | DK, FI    | DKK, EUR      | kr 0.50–40k / €0.50–€5k |
  | **Swish**                  | SE        | SEK           | kr 0.50–kr 50k          |
  | **PayPal**                 | Global    | USD + 18 more | $0–$1M                  |

  ## What local payment methods does Whop offer?

  Learn more about Whop's local payment method options below:

  ## Bank transfers

  #### 1. US Bank Transfer (ACH)

  ACH (Automated Clearing House) is the main US bank-to-bank transfer network. Customers pay directly from their bank account with low fees and high reliability, and it's one of the most trusted options for larger US transactions.

  * **Country:** US
  * **Currency:** USD
  * **Minimum–maximum amount:** {"$0.50-$1M"}
  * **Fees:** 0.8% (capped at \$5)
  * **Payment support:** One-time and recurring subscriptions
  * **Settlement:** 4 business days from payment creation (Stripe). Eligible US merchants can get 2 business days. Then normal payout to your bank.
  * **Refunds:** Yes. Full and partial refunds supported. Whop processes refunds from your balance. Timing to the customer's account depends on their bank (often 5–10 business days).
  * **Disputes:** Yes, but decisions are final. NACHA permits only 3 reasons. The customer can claim they never authorized the payment or revoked authorization. They can also claim the payment occurred earlier than authorized or the amount differed from the authorized amount. You can't appeal. A successful dispute invalidates the mandate. A second dispute on the same account can trigger an account block.

  #### 2. EU bank transfers

  Whop accepts one-time payments via EU bank transfers.

  * **Country:** EU
  * **Currency:** EUR
  * **Minimum–maximum amount:** €1 – €1M
  * **Fees:** 1% (capped at €5)
  * **Payment support:** One-time payments only
  * **Settlement:** The transfer usually arrives in 1 business day, followed by the standard payout time for your country (e.g. 3 business days in many EU countries).
  * **Refunds:** Yes. Refunds require customer bank details. You can request them within a limited window (e.g. up to 180 days). They usually reach the customer in 5–10 business days.
  * **Disputes:** No card-style dispute flow. Customers need to raise issues with their own bank. There is no standard chargeback or dispute process like with cards or ACH.

  #### 3. iDEAL

  iDEAL is the most widely used online banking payment method in the Netherlands and in parts of the EU.

  * **Country:** EU
  * **Currency:** EUR
  * **Minimum–maximum amount:** €0 – €1M
  * **Fees:** 2.5% + €0.8
  * **Payment support:** One-time and recurring subscriptions
  * **Settlement:** Instant bank-to-bank transfer. The standard country payout follows (e.g. Netherlands 3 business days after settlement).
  * **Refunds:** Yes. Full and partial. Often 5–10 business days to customer.
  * **Disputes:** Yes. Customers can dispute through their bank. The PSP supports iDEAL disputes. The customer's bank decides the outcome.

  #### 4. Bancontact

  Bancontact is Belgium's leading payment method, linked to customers' bank cards and mobile banking apps.

  * **Country:** EU
  * **Currency:** EUR
  * **Minimum–maximum amount:** €0.50 – €1M
  * **Fees:** 3.9% + €0.30
  * **Payment support:** One-time and recurring subscriptions
  * **Settlement:** Instant. The standard country payout follows (e.g. Belgium 3 business days).
  * **Refunds:** Yes. Full and partial refunds typically reach the customer in 5–10 business days.
  * **Disputes:** Yes. Card-linked disputes and chargebacks work similarly to card payments. The customer disputes with their bank, you can submit evidence, and the bank or network decides.

  #### 5. SEPA Debit

  SEPA Direct Debit lets EU customers pay from their bank account over European banking rails.

  * **Country:** EU
  * **Currency:** EUR
  * **Minimum–maximum amount:** €0.50 – €11.5k
  * **Fees:** 1% + €0.30
  * **Payment support:** One-time and recurring subscriptions
  * **Settlement:** 6 business days (Stripe: T+6 from payment creation). Longer than cards because of SEPA scheme and return risk.
  * **Refunds:** Yes. Standard full and partial SEPA refunds often reach the customer in 3–4 business days.
  * **Disputes:** Yes. Strong consumer protection lets the customer get a refund "no questions asked" within 8 weeks. From 8 weeks to 13 months, they can get a refund only if they didn't authorize the transaction. You can reverse a debit within 5 business days.

  #### 6. Swish

  Swish is Sweden's main bank-linked mobile payment method. Customers pay in real time using their mobile number.

  * **Country:** Sweden (SE)
  * **Currency:** SEK
  * **Minimum–maximum amount:** kr 0.50 – kr 50k
  * **Fees:** 0.60% + 3 SEK
  * **Payment support:** One-time payments only
  * **Settlement:** Standard payout for Sweden (e.g. 3 business days).
  * **Refunds:** Yes. Full and partial refunds supported.
  * **Disputes:** Yes. Disputes and complaints follow the bank or PSP process.

  #### 7. MobilePay

  MobilePay is a leading mobile wallet in Denmark and Finland. Payments go through app-based banking links.

  * **Countries:** Denmark (DK), Finland (FI)
  * **Currencies:** DKK, EUR
  * **Minimum–maximum amount:** DK: kr 0.50 – 40k | FI: €0.50 – €5k
  * **Fees:** 0.60% + €0.20
  * **Payment support:** One-time payments only
  * **Settlement:** Standard payout for Denmark and Finland (e.g. 3 business days).
  * **Refunds:** Yes. Full and partial refunds supported.
  * **Disputes:** Yes. Consumers can raise complaints about unauthorized or problematic payments. Consumer protection and complaint handling apply.

  #### 8. Vipps

  Vipps is Norway's most popular mobile payment app. Customers pay from their bank account or mobile number.

  * **Country:** Norway (NO)
  * **Currency:** NOK
  * **Minimum–maximum amount:** kr 0.50 – kr 50k
  * **Fees:** 0.50% + €0.20
  * **Payment support:** One-time payments only
  * **Settlement:** Standard payout for Norway (e.g. 3 business days).
  * **Refunds:** Yes. Full and partial refunds typically reach the customer in 2–3 business days (up to \~10 depending on bank). Merchants can often issue refunds for a long window (e.g. 365 days).
  * **Disputes:** Yes. Complaint and payment-regret mechanisms apply. Consumer protection and complaint handling also apply.

  ## Crypto and wallets

  #### 1. Crypto

  Customers can pay with digital assets, which Whop converts to USD at checkout. Crypto supports global customers and offers fast settlement without traditional banking friction.

  * **Country:** Global
  * **Currency:** USD
  * **Minimum–maximum amount:** {"$0-$1M"}
  * **Fees:** 1.5%
  * **Payment support:** One-time payments only
  * **Settlement:** Fast (minutes for on-chain confirmation). Funds then settle to your balance in USD.
  * **Refunds:** Yes. You can refund from your balance (e.g. send back to the customer).
  * **Disputes:** No. On-chain transactions are irreversible. There is no chargeback or dispute mechanism.

  #### 2. Cash App

  Cash App Pay is a US mobile wallet that lets customers pay instantly from their Cash App balance or a linked card.

  * **Country:** US
  * **Currency:** USD
  * **Minimum–maximum amount:** {"$0.50 – $1M"}
  * **Fees:** {"2.9% + $0.30"}
  * **Payment support:** One-time and recurring subscriptions
  * **Settlement:** Daily batch (ACH) to the PSP, with a configurable cutoff (e.g. 23:00 UTC). Net of refunds and disputes. Then normal payout to you.
  * **Refunds:** Yes. You can issue full and partial refunds for a long time (e.g. up to 7 years per Cash App). The refund returns to the customer's Cash App balance, linked card, or bank account.
  * **Disputes:** Yes. Customers can dispute (fraud, duplicate charge, refund not received, etc.). Settlement and reconciliation records reflect disputes as adjustments.

  #### 3. PayPal

  PayPal is a globally recognized digital wallet that lets customers pay using their PayPal balance, linked bank account, or card. PayPal supports 19 different currencies.

  * **Country:** Global
  * **Currency:** USD, EUR, GBP, SEK, NOK, CZK, + 13 more
  * **Minimum–maximum amount:** {"$0-$1M"}
  * **Fees:** {"3.49% + $0.49"}
  * **Payment support:** One-time and recurring subscriptions

  ## Related resources

  <CardGroup cols={1}>
    <Card title="Fees" icon="coins" href="/payments-and-billing/fees/fees">
      See full fee details for cards and local payment methods.
    </Card>
  </CardGroup>
</div>
