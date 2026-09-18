> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Adaptive pricing

> Show buyers prices in their local currency at checkout to lower fees, unlock local payment methods, and reduce declines.

Adaptive pricing automatically displays your checkout in the buyer's local currency and routes the payment through domestic rails. It's free for sellers, configured per checkout link, and turned off by default.

<CardGroup cols={3}>
  <Card style={{ border: "none" }} title="Lower fees" icon="coins">
    Domestic processing replaces international card and FX fees.
  </Card>

  <Card style={{ border: "none" }} title="Local payment methods" icon="globe">
    iDEAL, SEPA, Klarna, and other regional options appear automatically.
  </Card>

  <Card style={{ border: "none" }} title="Higher acceptance" icon="circle-check">
    The buyer's bank is less likely to decline domestic transactions.
  </Card>
</CardGroup>

## How it works

When you enable adaptive pricing on a checkout link, Whop detects the buyer's region from their IP address and displays the price in their local currency. Whop then processes the payment domestically in that region.

Buyers can switch back to the original currency at checkout if they prefer.

<Note>
  Buyers in unsupported regions automatically see the original price and
  currency — no fallback configuration needed.
</Note>

## Benefits

* **Lower processing fees.** Non-domestic transactions get billed at domestic rates instead of incurring international card fees and currency conversion fees. See [Fees](/payments-and-billing/fees/fees).
* **Local payment methods and financing.** iDEAL, bank transfers in the Single Euro Payments Area, Klarna, and other regional options depend on currency. They appear only when the checkout uses the matching local currency. See [Local payment methods](/payments-and-billing/local-payment-methods) and [Financing](/payments-and-billing/financing/all-bnpl-options).
* **Higher bank acceptance.** The buyer's bank is less likely to decline domestic transactions than cross-border ones.
* **Familiar amounts for buyers.** Local currency reduces post-purchase confusion and "I don't recognize this charge" disputes.

## Example

A seller in the United States has a link priced at <abbr title="United States dollars">USD</abbr> 100. An Australian buyer opens it.

|                                 | Without adaptive pricing                           | With adaptive pricing                                     |
| ------------------------------- | -------------------------------------------------- | --------------------------------------------------------- |
| **Buyer sees**                  | <abbr title="United States dollars">USD</abbr> 100 | Equivalent in <abbr title="Australian dollars">AUD</abbr> |
| **Processed as**                | International                                      | Domestic in Australia                                     |
| **Seller pays**                 | Domestic rate + international card fee + FX fee    | Domestic rate                                             |
| **Local payment methods shown** | No                                                 | Yes                                                       |

## Fees

**Sellers:** Free. There's no additional Whop fee for enabling adaptive pricing — you simply pay the domestic rate instead of international + FX.

**Buyers:** The displayed local price includes a small currency conversion fee. The amount shown at checkout is the total they pay.

## Enable adaptive pricing

Configure adaptive pricing for each checkout link.

<Steps>
  <Step title="Open your checkout link's settings">
    Go to your [Dashboard](https://whop.com/dashboard/links/checkout) and select the checkout link you want to update.
  </Step>

  <Step title="Toggle Adaptive pricing on">
    Switch **Accept local currency payments** to on in the link's settings.
  </Step>

  <Step title="Save">
    Buyers in supported regions will now see prices in their local currency the next time they open the link.
  </Step>
</Steps>

<Warning>
  Adaptive pricing is only available for one-time payments. Recurring
  subscriptions continue to bill in the original checkout currency.
</Warning>

## Next steps

<CardGroup cols={2}>
  <Card title="Local payment methods" icon="globe" href="/payments-and-billing/local-payment-methods">
    See every regional payment option that becomes available with local currency checkouts.
  </Card>

  <Card title="Financing options" icon="credit-card" href="/payments-and-billing/financing/all-bnpl-options">
    Offer Klarna, Afterpay, and other BNPL methods that depend on local currency.
  </Card>

  <Card title="Fees" icon="coins" href="/payments-and-billing/fees/fees">
    Compare domestic and international rates so you know exactly what adaptive pricing saves.
  </Card>

  <Card title="Create a checkout link" icon="link" href="/manage-your-business/payment-processing/create-checkout-link">
    Set up the checkout link you'll enable adaptive pricing on.
  </Card>
</CardGroup>
