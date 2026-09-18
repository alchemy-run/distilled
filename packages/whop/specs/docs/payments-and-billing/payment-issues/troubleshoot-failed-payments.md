> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Failed subscription payments

> When a subscription payment is unsuccessful, Whop, the merchant, and the customer can take steps to fix the failure.

## What happens after a payment decline

When a customer's payment gets declined or fails, Whop takes several steps to try and recover the payment:

* **The subscription status changes to Past due:** The payment needs attention, but the status doesn't immediately cancel access
  * Go to **Dashboard** > **Payments**, select **Status**, and select only **Past due**
* **Whop emails the customer:** Your customers receive emails prompting them to update their payment information
* **Whop retries the payment:** Whop automatically retries the charge over a five-day period
* **Access may be temporarily paused:** Depending on your settings, your customer might lose access to your whop until the payment goes through
  * Go to **Dashboard** > **Settings** > **Checkout**
  * Choose whether members have **Access while past due**
* **Whop cancels the subscription:** If the payment still fails after five days, Whop automatically cancels the subscription

## For merchants — how to fix a declined payment

After a payment decline, you can help the customer update their payment method and manually retry the payment from your dashboard.

1. **Ask the customer to update their payment method**
   * Contact the customer to confirm they have sufficient funds and a working payment method
   * To update their payment method, ask them to follow these steps:
     1. Go to [https://whop.com/@me/settings/memberships](https://whop.com/@me/settings/memberships)
     2. Select the inactive membership
     3. Select **Update payment method**
     4. Add the new card details and save

2. **Manually retry the payment from your dashboard**

   1. Go to **Dashboard** > **Payments**
   2. Select **Status** and select only **Failed**
   3. Select the failed payment
   4. Select **Retry payment**

   When the payment processes successfully, Whop restores the customer's access automatically.

### How to change a subscription renewal date

To adjust a customer's renewal date, the merchant can add free days to the plan. This change postpones the customer's next charge. See [how to add free days to a plan](/manage-your-business/manage-payments/manage-users#how-to-add-free-days-to-a-plan).

For a subscription in the middle of a billing cycle, calculate how many days to add before the next charge. Merchants must make this change from their dashboard. Customers can't change their own membership. Please [contact the seller](/memberships-and-access/cancellations-and-refunds/contact-a-merchant) to make this request.

## For customers — how to fix a declined payment

If one of your subscription payments has failed:

1. Go to [membership settings](https://whop.com/@me/settings/memberships).
2. Sign in with your email.
3. Select the inactive membership
4. Select **Update Payment Method** and enter your new billing information.
5. Retry the payment. When it succeeds, you'll see a confirmation on the page.
