> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Whop Ads

> Run ads through Whop's agency accounts with first-party attribution from real buyer data

Whop Ads gives creators and businesses external advertising infrastructure. It includes agency ad accounts on Meta, with TikTok, Google, and more rolling out. It also includes Whop's first-party attribution pixel ([the Whop Pixel](#whop-attribution-pixel)). You run everything from one dashboard inside Whop. **No setup fees, no monthly fees, no minimum spend.**

You bring the strategy and creative — Whop Ads is infrastructure, not a managed service. Your media buyer (or you) still runs the campaigns.

## How Whop Ads compares to running on your own Meta account

|                      | Your own Meta account                         | Whop Ads                                                                                                     |
| -------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Account standing** | Standard                                      | Platinum-tier HIVA (Meta's highest tier) — priority bidding and lower cost per thousand impressions at scale |
| **Ad rejections**    | Common                                        | Fewer thanks to higher account standing                                                                      |
| **Support**          | Standard Meta support                         | Direct Meta representative + Whop account manager                                                            |
| **Bulk uploads**     | Limited                                       | Launch dozens of ads in minutes                                                                              |
| **Daily spend**      | Hard platform limits                          | No spend limit — scale from day one                                                                          |
| **Attribution**      | Browser-based, degrading as cookies disappear | First-party attribution from real payment data (the Whop Pixel)                                              |

## Pricing

It's free to use Whop Ads. There are no platform, setup, or monthly fees when you run ads through the Whop dashboard — you only pay for ad spend, and you can fund it three ways:

| Funding method           | Processing fee | Rewards                                                      |
| ------------------------ | -------------- | ------------------------------------------------------------ |
| **Credit card**          | None           | Earn your card's normal points/rewards                       |
| **Whop Card**            | None           | Spend directly from your Whop balance                        |
| **Pending Whop balance** | None           | Spend unsettled revenue same-day instead of waiting 4–5 days |

<Tip>
  Even after Meta moves to invoice-only billing, you can keep paying for ads with a credit card through Whop and continue earning card rewards. You pay Whop, not Meta.
</Tip>

## Get started

<Steps>
  <Step title="Open the Ads tab" titleSize="h3">
    Open the **Ads** tab in your Whop business dashboard. There's no application or waitlist — every business can launch ads today.
  </Step>

  <Step title="Connect your accounts" titleSize="h3">
    Connect your Facebook page and Instagram via OAuth. Whop automatically provisions a pixel for your business, seeded with your existing Whop sales data.
  </Step>

  <Step title="Import custom audiences (optional)" titleSize="h3">
    Bring your custom audiences over from your existing ad account into the new agency account.
  </Step>

  <Step title="Run the self-serve setup" titleSize="h3">
    Self-serve setup takes under 5 minutes, and you can launch your first campaign right away.
  </Step>
</Steps>

<Tip>
  Invite your media buyer or team with the **Advertiser** role on Whop. They get access to the Ads dashboard only — not your analytics, payouts, or business settings.
</Tip>

## Whop attribution pixel

The Whop Pixel is Whop's first-party attribution pixel. Whop owns the underlying payments stack, so the pixel attributes conversions from real payment data instead of browser signals. This keeps attribution accurate as third-party cookies disappear.

[Install the Whop Pixel on your site](/developer/guides/pixel) to start tracking conversions.

**Official integrations:**

* Triple Whale
* Cometly
* Trackbee
* Cortana
* Omni
* Hyros

**Coming soon:**

* WeTracked

**Send conversions in and out:**

* Whop forwards your conversions to Meta through the Conversions API.
* Any platform that can fire events to an endpoint can report conversions to Whop through the [Events API](/api-reference/beta/events/create-event). Examples include sales platforms, funnel builders, form builders, and custom backends.

## Lookalike audiences

<Note>
  Lookalike audiences built from Whop's first-party buyer data are coming soon.
</Note>

## Fund ad campaigns with Whop

Fund campaigns the same day from your **pending Whop balance** instead of waiting the usual 4–5 days for revenue to settle. This is especially useful when you're scaling fast and don't want cash flow to gate ad spend.

The **Whop Card** draws from your Whop balance, so you can put the revenue you earn on Whop directly toward ad spend.

You don't need a Whop Card to start — a regular credit card works on day one. Your account manager can walk you through getting set up with one whenever you're ready. [Learn more about Whop Cards](/whop-finance/cards).

## Spend limits

There's no spend limit on Whop's agency ad accounts. You can scale from day one. Whop's account standing supports high daily spend without the hard platform caps of a standard account.

## Supported platforms

| Platform                        | Status      |
| ------------------------------- | ----------- |
| **Meta** (Facebook + Instagram) | Live        |
| **TikTok**                      | Coming soon |
| **Google**                      | Coming soon |
| **Snapchat**                    | Coming soon |
| **X**                           | Coming soon |
| **Reddit**                      | Coming soon |

<Note>
  Manage campaigns inside the Whop dashboard, not Meta Ads Manager directly. The Whop Pixel and cross-platform features live in the Whop UI, which provides a consistent experience across every supported platform. AI creative tools are coming soon.
</Note>

## Who can advertise

Whop Ads supports legitimate ("white hat") businesses across most categories. Before you launch a campaign, Whop Ads runs **built-in compliance checks** to make sure your creatives and copy meet Meta's requirements.

| Allowed                           | Not allowed                        |
| --------------------------------- | ---------------------------------- |
| Trading and finance education     | Fake or unverifiable income claims |
| Sports picks and handicapping     | Fake testimonials                  |
| E-commerce                        | Lewd or adult content              |
| Business opportunity and coaching | Scam-style or deceptive offers     |
| Most information products         |                                    |

## Limits to know about

* One ad account per Whop business
* No credit lines — fund ad spend through a credit card, Whop Card, or pending Whop balance

## Next steps

<CardGroup cols={2}>
  <Card title="Tracking links" href="/manage-your-business/growth-marketing/tracking-links">
    Build branded links to attribute traffic and conversions across channels.
  </Card>

  <Card title="Promo codes" href="/manage-your-business/growth-marketing/promo-codes">
    Run discounts and trials to convert paid traffic into paying members.
  </Card>

  <Card title="Whop Cards" href="/whop-finance/cards">
    Fund ad spend straight from your Whop balance and reinvest into your business.
  </Card>
</CardGroup>
