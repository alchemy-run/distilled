> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SeQura guide

> Let your Spanish customers split purchases into installments with SeQura

SeQura is a Buy Now, Pay Later payment method in Spain that lets customers split a purchase into installments instead of paying the full amount upfront.

Offering SeQura helps reduce price friction at checkout, which can lead to higher conversion rates and make higher average order values possible for your customers.

<CardGroup cols={2}>
  <Card style={{ border: "none" }} title="Fully managed installments" icon="calendar-check">
    SeQura handles customer approval, installment collection, and payment
    processing
  </Card>

  <Card style={{ border: "none" }} title="88% payout in 14 days" icon="money-bill-wave">
    Sellers receive 88% of the transaction amount 14 days after purchase
  </Card>
</CardGroup>

SeQura lets sellers offer flexible financing without managing installment payments or taking on additional operational overhead.

# SeQura eligibility

SeQura payments through Whop are currently available for customers based in Spain who pay in euros.

To get approval, customers need:

* To be 18 years or older
* To be a resident of Spain
* A valid Spanish identification number (<abbr title="Documento Nacional de Identidad">DNI</abbr> or <abbr title="Número de Identidad de Extranjero">NIE</abbr>)
* A Spanish phone number
* A valid debit or credit card

During checkout, SeQura performs a quick automated approval check to determine whether the customer is eligible for financing.

# Installment options

SeQura purchases must be between **€50** and **€5,000**. Customers can choose between **3, 6, 9, and 12 month** installment plans.

The order amount and selected plan determine whether SeQura charges the customer a small fixed monthly fee.

<Info>
  Customers will see the exact payment schedule and any applicable fees during
  checkout before confirming their purchase.
</Info>

# How seller payouts work

When a customer uses SeQura for a purchase, Whop distributes payouts in two stages.

### Stage 1: Initial payout

After the customer completes the purchase and SeQura processes the payment:

* Sellers receive **88%** of the transaction amount
* Whop sends this payout **14 days** after the purchase

### Stage 2: Final payout

Whop pays the remaining **12%** of the transaction amount **12 months** after the purchase date, regardless of the customer's installment plan.

This 12% acts as a reserve to account for situations where customers fail to complete their installment payments.

* If customers complete all payments, the seller receives the full remaining 12%
* If some customers default on their payments, Whop deducts the losses from this reserve

This means:

* 12% is the **maximum** remaining payout
* Whop **deducts losses caused by defaults** from this reserve

### Tracking your SeQura reserve

The held portion of each sale appears on your [Balances](https://whop.com/dashboard/balance/) page as a **SeQura reserve**. Each sale shows a release date separate from any **Whop reserve** on your account. Releases follow a weekly cycle after a sale's plan matures. If SeQura's installment reporting is incomplete on the release date, a short reporting delay postpones the release instead of skipping it. Defaulted installments reduce the reserve when it releases.

For how reserves work across your account, see [Reserves](/trust-and-safety/account-health/reserves).

### Example payment timeline

**Example purchase:** Customer buys a €1,000 product using a 12-month installment plan.

<Steps>
  <Step title="Day 0">Customer completes purchase using SeQura</Step>
  <Step title="Day 14">Seller receives **€880** initial payout (88%)</Step>

  <Step title="During the installment period">
    SeQura collects the remaining installment payments from the customer
  </Step>

  <Step title="12 months after purchase">
    Seller receives the remaining **€120** reserve, minus any defaults
  </Step>
</Steps>

<Info>The following example ignores Whop platform fees for simplicity.</Info>

# How to enable SeQura

Take these two steps to enable SeQura on your account:

<Steps>
  <Step title="Apply to access financing">
    Apply to access financing at [this
    link](https://whop.com/dashboard/settings/payments/)
  </Step>

  <Step title="Contact Whop">
    During the initial SeQura release, the Whop team adds merchants manually.
    Contact your Whop Account Manager or sales rep, or contact
    [Whop Support](https://whop.com/chats/new) after you've applied
    through the financing application form to enable SeQura on your account
  </Step>
</Steps>

After Whop enables SeQura on your account, eligible customers will automatically see the option during checkout.

Sellers don't need to complete additional setup.

# Frequently asked questions

<AccordionGroup>
  <Accordion title="How does SeQura compare to other BNPL providers?">
    Sellers sometimes ask why SeQura is only 3%, while other BNPL providers charge 15%. The reason is that they work differently:

    **Fee structure:**

    * **SeQura:** Lower fee, but the seller takes on default risk
      * **Other BNPL providers:** Higher fee, but the provider takes on default risk

    **Settlement speed:**

    * **SeQura:** Funds are typically paid out after around 14 days
      * **Other BNPL providers:** Funds are typically paid out after around 2 days

    So while SeQura looks cheaper upfront, the seller is still exposed if customers fail to repay over time. For example, if SeQura costs 3% but defaults end up at 12%, the real cost incurred would be 15%.

    With other BNPL providers, the seller receives funds upfront (net of fees), and the provider absorbs the repayment risk.

    **In simple terms:**

    | Provider                 | Fee            | Payout speed | Risk holder |
    | :----------------------- | :------------- | :----------- | :---------- |
    | **SeQura**               | Lower (\~3%)   | \~14 days    | Seller      |
    | **Other BNPL providers** | Higher (\~15%) | \~2 days     | Provider    |
  </Accordion>
</AccordionGroup>
