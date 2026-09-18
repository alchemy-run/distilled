> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payment declines

> Learn how payment declines work and how to manage them

Learn what causes payment declines, what Whop does to recover them, and how you or your customers can fix declined payments.

## Specific decline reasons and messages

When the payment processor declines a payment, you may receive one of these specific decline codes. Here's what each means and how to resolve it:

| Decline Reason                    | Explanation                                                                                                                                                                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `insufficient_funds`              | Your card has insufficient funds to complete this purchase. Please use a different payment method or check that your account has sufficient funds.                                                                                                                             |
| `lost_card`                       | The card issuer declined this payment because the cardholder reported the card as lost. Please use a different card to complete your purchase.                                                                                                                                 |
| `stolen_card`                     | The card issuer declined this payment because the cardholder reported the card as stolen. Please use a different card to complete your purchase.                                                                                                                               |
| `expired_card`                    | Your card has expired. Please check the expiration date and try again, or use a different card.                                                                                                                                                                                |
| `suspected_fraud`                 | Security checks prevented the payment. Please contact your bank for more information or try a different payment method.                                                                                                                                                        |
| `invalid_card_number`             | The card number is incorrect. Please double-check the 16-digit number on your card and try again.                                                                                                                                                                              |
| `invalid_cvc`                     | The card verification code (<abbr title="card verification code">CVC</abbr>) is incorrect. Please check the three- or four-digit code on the back of your card (or front for Amex) and try again.                                                                              |
| `invalid_cvc_or_expiration`       | The card verification code (<abbr title="card verification code">CVC</abbr>) or expiration date is incorrect. Please double-check both the three- or four-digit security code and the <abbr title="month/year">MM/YY</abbr> expiration date.                                   |
| `incorrect_pin`                   | The personal identification number (<abbr title="personal identification number">PIN</abbr>) you entered is incorrect. Please try again with the correct number. This decline applies only to payments made with a card reader.                                                |
| `authentication_required`         | This payment needs additional verification. Your bank may open its website or send a text message to confirm this transaction. Please complete the verification to proceed.                                                                                                    |
| `card_not_supported`              | This card doesn't support this type of purchase. Please try a different credit or debit card.                                                                                                                                                                                  |
| `currency_not_supported`          | Your card doesn't support payments in this currency. Please use a different card or contact your bank about international transactions.                                                                                                                                        |
| `duplicate_transaction`           | A transaction with the same amount and card was just processed. Please check your email for confirmation. If you didn't receive it, please wait a few minutes before trying again.                                                                                             |
| `generic_decline`                 | Your card issuer declined the payment. Please try: 1) Using a different card, 2) Contacting your bank, or 3) Checking that your billing information is correct.                                                                                                                |
| `invalid_account`                 | This card or the associated account is invalid. Please use a different card or contact your bank for assistance.                                                                                                                                                               |
| `invalid_amount`                  | The payment amount exceeds your card's limit. Please try a smaller amount or use a different payment method.                                                                                                                                                                   |
| `processing_error`                | A temporary issue interrupted payment processing. Please wait a moment and try again, or use a different card.                                                                                                                                                                 |
| `restricted_card`                 | Your bank has restrictions on this card that prevent this payment. Please contact your bank to enable international or online purchases, or use a different card.                                                                                                              |
| `card_velocity_exceeded`          | You've exceeded your card's transaction limit or available balance. Please try a smaller amount or use a different card.                                                                                                                                                       |
| `contact_issuer`                  | Please contact your card issuer for more information about this decline. Call the 800 number on the back of your card.                                                                                                                                                         |
| `bank_declined`                   | Your bank has declined this transaction. Please try a different card or contact your bank.                                                                                                                                                                                     |
| `regulatory_blocked`              | Regulatory restrictions in your region prevent this transaction. Please try a different payment method or contact support for alternatives.                                                                                                                                    |
| `transaction_not_permitted`       | Your card issuer doesn't permit this type of transaction. Please use a different card or contact your bank to enable this transaction type.                                                                                                                                    |
| `card_type_not_supported`         | The payment processor doesn't support this card type. Please try a different card.                                                                                                                                                                                             |
| `issuer_not_found`                | The card issuer declined the payment because of incorrect card or billing details. Please verify your card number, expiration date, and billing address, then try again.                                                                                                       |
| `closed_account`                  | The card account is no longer open. Please use a different card to complete your purchase.                                                                                                                                                                                     |
| `issuer_unavailable`              | The payment processor couldn't reach your card issuer to authorize this payment. This is usually temporary. Please try again in a few minutes or use a different card.                                                                                                         |
| `invalid_zip`                     | The billing postal/ZIP code doesn't match your card's records. Please enter the ZIP code associated with your card's billing address.                                                                                                                                          |
| `invalid_expiry_month`            | The expiration month is invalid. Please enter a valid month (01-12) and try again.                                                                                                                                                                                             |
| `invalid_expiry_year`             | The expiration year is invalid. Please enter a valid 2 or 4-digit year (e.g., 25 or 2025) and try again.                                                                                                                                                                       |
| `invalid_expiry`                  | The expiration date is invalid. Please enter a valid date in <abbr title="month/year">MM/YY</abbr> format and check that the card hasn't expired.                                                                                                                              |
| `invalid_transaction`             | The issuing bank has declined this transaction. This may be due to an incorrect card number, expired card, invalid card, wrong expiration date, mismatched billing address or zip code, or multiple rapid transaction attempts. Please verify your card details and try again. |
| `cannot_authorize`                | The payment processor couldn't authorize this payment. Please try a different card or contact your bank for more information.                                                                                                                                                  |
| `pin_required`                    | This card requires a personal identification number (<abbr title="personal identification number">PIN</abbr>) for the transaction. Please use a compatible card reader or try a different card.                                                                                |
| `pin_try_exceeded`                | You entered an incorrect personal identification number (<abbr title="personal identification number">PIN</abbr>) too many times. The card is temporarily blocked for security. Please contact your bank or use a different card.                                              |
| `high_risk`                       | Security concerns prevented the payment. Please try a different card or contact support for assistance.                                                                                                                                                                        |
| `test_mode_decline`               | This appears to be a test card number. Please use a real credit or debit card to complete your purchase.                                                                                                                                                                       |
| `merchant_blacklist`              | Security checks blocked this payment. Please try a different card or contact support for assistance.                                                                                                                                                                           |
| `reenter_transaction`             | Your bank couldn't process this payment. Please try again, use a different card, or contact your bank for more information.                                                                                                                                                    |
| `invalid_pin`                     | The personal identification number (<abbr title="personal identification number">PIN</abbr>) you entered is incorrect. Please try again with the correct number for this card.                                                                                                 |
| `pin_required_as`                 | This card requires a personal identification number (<abbr title="personal identification number">PIN</abbr>) for the transaction. Please use a compatible card reader or try a different card.                                                                                |
| `withdrawal_count_limit_exceeded` | You've exceeded your card's daily transaction limit or available balance. Please try again tomorrow or use a different card.                                                                                                                                                   |
| `invalid_country`                 | The billing country doesn't match your card's records. Please verify your billing address country and try again.                                                                                                                                                               |
| `issuer_error`                    | Your bank detected an issue but couldn't identify the problem. Please try again in a few minutes or contact your bank directly for assistance.                                                                                                                                 |

## What happens after a payment decline

When a customer's payment gets declined or fails, Whop takes several steps to try and recover the payment:

* **The subscription status changes to Past due**: The payment needs attention, but the status doesn't immediately cancel access
  * Go to **Dashboard** > **Payments**, select **Status**, and select only **Past due**
* **Whop emails the customer**: Your customers receive emails prompting them to update their payment information
* **Whop retries the payment**: Whop automatically retries the charge over a five-day period
* **Access may be temporarily paused**: Depending on your settings, your customer might lose access to your whop until the payment goes through
  * Go to **Dashboard** > **Settings** > **Checkout**
  * Choose whether members have **Access while past due**
* **Whop cancels the subscription**: If the payment still fails after five days, Whop automatically cancels the subscription

## What you can do to fix a declined payment

After a payment decline, you can help the customer update their payment method and manually retry the payment from your dashboard.

**Step 1: Ask the customer to update their payment method**

* Contact the customer to confirm they have sufficient funds and a working payment method
* To update their payment method, ask them to follow these steps:
  1. Go to [https://whop.com/@me/settings/memberships](https://whop.com/@me/settings/memberships)
  2. Select the inactive membership
  3. Select **Update payment method**
  4. Add the new card details and save

**Step 2: Manually retry the payment from your dashboard**

1. Go to **Dashboard** > **Payments**
2. Select **Status** and select only **Failed**
3. Select the failed payment
4. Select **Retry payment**

When the payment processes successfully, Whop restores the customer’s access automatically.
