> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payment controls

> The controls Whop places on accounts with elevated dispute rates, what each one does, and how they lift

When your account carries elevated risk, most often an elevated dispute rate, Whop may place controls on it. You can see the controls set on your account on your [Payment health](/trust-and-safety/account-health/payment-health) dashboard. Controls aren't a penalty. Each one either stops disputes before they land or protects the funds needed to cover incoming disputes. The controls let you keep taking payments throughout the process.

Whop reviews every account continuously and sets controls per account, based on the risk it carries. As that risk rises, more controls apply and existing ones tighten. As it falls, controls ease and lift on their own. Your dashboard always shows exactly which controls are active on your account.

## Why controls exist

Card networks hold Whop responsible for the dispute rates of every business that processes payments on the platform. If left unchecked, a high dispute rate ends in card networks shutting off card payments for your business without warning or a way to reverse the decision. Controls let Whop intervene early enough to prevent that outcome.

They also protect your money. A high dispute rate means more chargebacks are coming. Holding funds now is what keeps you from ending up with a [negative balance](/trust-and-safety/account-health/managing-dispute-rates#negative-balances) you'd have to repay out of pocket.

## The controls

These are the controls your dashboard can show, and what each one does:

| Control                           | What it does                                                                                                                                                                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Reserve**                       | The reserve holds a portion of payment volume to cover future disputes and refunds. See [Reserves](/trust-and-safety/account-health/reserves).                                                  |
| **Auto-refund threshold**         | Pre-chargeback alerts under this amount trigger automatic refunds. An alert refunded in time never becomes a dispute, so it never counts toward your rate.                                      |
| **Resolution-center auto-refund** | Open Resolution Center cases under set amounts trigger automatic refunds. This resolves unhappy customers before they go to their bank.                                                         |
| **Dispute alert fee**             | Each pre-chargeback alert intercepted on your behalf incurs a fee.                                                                                                                              |
| **High-risk processing fee**      | An additional fee applies to card transactions while controls are active, covering the extra risk the account carries.                                                                          |
| **Pending delay**                 | This control adds days on top of the processor's settlement period before funds are available for payout. The delay keeps enough in your account to cover incoming disputes.                    |
| **Financing at checkout**         | This control can pause buy now, pay later options. Disputes occur more often for financed purchases than for standard card payments, so pausing them removes a concentrated source of disputes. |

Two more can apply in specific situations:

* **3D Secure**: when most of your disputes are fraud-coded, the checkout flow may require customers to verify card payments with their bank. 3DS blocks fraudulent charges before they happen, and the chargebacks that come with them. You can see this in your payment settings.
* **Card brand restrictions**: if your dispute rate on a specific card network far exceeds that network's limits, this control can pause that brand at checkout. Other brands keep working.

## How controls lift

Whop continuously reviews controls, just as it reviews [reserves](/trust-and-safety/account-health/reserves). As your account recovers, they ease and lift automatically. You don't need to contact support.

The fastest way out is the same as the way to never get controls at all: keep your dispute rate down. [Managing dispute rates](/trust-and-safety/account-health/managing-dispute-rates) covers the steps that actually work.

You can also retrieve the controls on your account programmatically via API: `GET /accounts/{id}` returns them in the `payment_controls` field.

## Next steps

<CardGroup cols={2}>
  <Card title="Managing dispute rates" href="/trust-and-safety/account-health/managing-dispute-rates">
    Refund faster, resolve cases, and remove what's causing disputes.
  </Card>

  <Card title="Reserves" href="/trust-and-safety/account-health/reserves">
    Why a reserve can hold part of your balance and when it releases the funds.
  </Card>
</CardGroup>
