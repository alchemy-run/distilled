> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Connected accounts

> Manage connected accounts for payouts, split payments, and platforms

Connected accounts let you pay out to partners, affiliates, or team members directly from Whop.

## Connected account uses

* **Affiliates and partners**: Pay commissions or revenue share to their linked accounts
* **Team**: Pay team members or contractors through connected accounts
* **Verification**: Each connected account may need to complete identity verification before receiving payouts

Manage connected accounts from your **Dashboard** > **Balances** or **Affiliates**, depending on your setup.

## Whop platform features

<Info>
  Access to the platforms API is currently invite only. Please contact
  [sales@whop.com](mailto:sales@whop.com) to see if your use case is eligible.
</Info>

Whop for Platforms is a product similar to Stripe Connect that enables you to build marketplaces, platforms, and multi-tenant applications. With Whop for Platforms, you can onboard connected accounts and facilitate payments on their behalf.

### About platform payments

Whop for Platforms lets you act as a platform operator. Other businesses or individuals, called connected accounts, can accept payments through your platform. This is ideal if you're building:

* **Marketplaces**: Where multiple sellers offer products or services. For example, a watch marketplace where you can buy luxury watches from different sellers.
* **Platforms**: Where independent creators or businesses operate. For example, a content creation platform that pays content creators directly for sponsored content.
* **Multi-tenant applications**: Where each entity needs to process its own payments

<Tip>
  Whop for Platforms handles the complexity of payment processing, compliance,
  and payouts so you can focus on building your platform's core features.
</Tip>

### How it works

As a platform, you can:

1. **Onboard connected accounts**: Invite businesses or individuals to join your platform
2. **Facilitate payments**: Process payments on behalf of your connected accounts
3. **Manage payouts**: Automatically route funds to your connected accounts
4. **Transfer funds**: Move money between accounts on your platform instantly

### Types of connected accounts

A connected account can be either:

* **A business**: Companies, organizations, or registered entities that want to sell products or services through your platform
* **An individual**: Sole proprietors, freelancers, creators, or individual sellers who want to monetize through your platform

Each connected account has their own account on your platform and can:

* Accept payments from customers
* Receive payouts to their bank account
* Manage their own products and pricing
* View their transaction history and analytics

### Benefits

* **Simplified onboarding**: Easy connected account enrollment process
* **Automatic payouts**: Funds are automatically routed to connected accounts
* **Compliance handled**: Whop manages regulatory requirements
* **Flexible transfers**: Move money between accounts instantly via API
* **Unified dashboard**: Manage all connected accounts from one place

### Next steps for platform developers

<CardGroup cols={2}>
  <Card title="Enroll connected accounts" icon="user-plus" href="/developer/platforms/enroll-connected-accounts">
    Learn how to onboard businesses and individuals to your platform
  </Card>

  <Card title="Pay connected accounts" icon="arrow-right-arrow-left" href="/developer/platforms/collect-payments-for-connected-accounts">
    Make a payment to a connected account
  </Card>

  <Card title="Render payout portal" icon="money-bill-transfer" href="/developer/platforms/render-payout-portal">
    Configure and manage payouts to your connected accounts
  </Card>
</CardGroup>
