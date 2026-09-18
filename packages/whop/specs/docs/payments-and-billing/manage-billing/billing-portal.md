> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Billing portal

> A self-service portal for subscription management.

The billing portal is where customers can manage active memberships and view billing history.

<Tip>
  The billing portal is the easiest way to let customers manage their own
  subscriptions. It saves you time on support requests and gives customers
  instant control.
</Tip>

## What customers can do in the portal

The billing portal gives customers full control over their memberships:

* **View membership details:** See active plans, renewal dates, and billing cycles
* **Update payment methods:** Add, remove, or change credit cards and other payment methods
* **View billing history:** Access past invoices and receipts
* **Cancel subscriptions:** Cancel memberships without contacting support
* **Transfer memberships:** Move memberships to another account

## How to access the billing portal

Customers can access the billing portal by going to [Profile → Orders](https://whop.com/@me/settings/orders/) and selecting an active subscription.

## For developers

If you're building an integration, you can access the billing portal URL programmatically through the Whop API. Each membership has a `manage_url` field that provides a direct link to that customer's billing portal.

When you retrieve a membership through the API, the `manage_url` field will look like:

```
https://whop.com/billing/manage/mber_*************/
```

This URL is unique to each membership. Users must log in to access the portal. Whop prompts users to log in when needed. You can include this link in your app, emails, or customer dashboards to give users quick access to their billing portal.

<Card title="Retrieve Membership API" icon="code" href="https://docs.whop.com/api-reference/memberships/retrieve-membership">
  See the API reference for retrieving memberships and accessing the
  `manage_url` field.
</Card>
