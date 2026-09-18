> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Card declines & risk rules

> Why Whop Card transactions get declined and the risk rules applied during authorization

Whop Cards apply system rules, card limits, and real-time risk checks to every authorization. This page explains why Whop may decline a card transaction, which authorization codes you may encounter, and which automatic risk rules it enforces.

## Common transaction decline reasons

Declines can occur for several reasons, including system rules, card limits, and real-time risk checks. When Whop declines a transaction, it records a reason with the transaction.

This list isn't exhaustive. Some declines originate at the card network or processor rather than from a Whop rule, and these take precedence. In those cases, the reason may be a generic description such as `restricted card`, or Whop may not receive a reason.

## What you can do about a decline

Many declines represent outcomes you can act on. The following table maps common reasons to their cause and your next step:

| Decline reason                                         | What it means                                                                                       | What you can do                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `card spending limit exceeded`                         | The transaction reached the card's configured spending limit                                        | Review or adjust the card's spending controls                                  |
| `account credit limit exceeded`                        | Insufficient available balance for the transaction                                                  | Add funds to your balance before retrying                                      |
| `card locked` / `card canceled` / `card not activated` | The card isn't active                                                                               | Manage the card's status (activate or unlock as appropriate)                   |
| `invalid pin attempt limit exceeded`                   | Too many incorrect personal identification number attempts. The system automatically locks the card | Unlock the card to restore access, or contact Whop support                     |
| `transaction declined by risk rules`                   | The fraud risk scoring engine declined the authorization                                            | Contact Whop support if you believe the engine declined a transaction in error |
| `restricted country`                                   | The transaction originated in a restricted or sanctioned jurisdiction                               | These declines follow compliance policy, and you can't override them           |

A few additional defaults worth noting:

* Automatic teller machine withdrawals are unavailable by default.
* Whop restricts quasi-cash and certain money-transfer categories by default.
* 3D Secure (3DS): a failed 3DS verification can result in a decline.
* Address Verification Service (<abbr title="Address Verification Service">AVS</abbr>): Whop supports this service and lets you configure it per card. Mismatches can contribute to a decline.

## Authorization codes and their meanings

Whop Cards use specific authorization codes to classify the context and status of each transaction. Here are some commonly encountered codes:

| Code | Meaning                                               |
| ---- | ----------------------------------------------------- |
| 00   | Normal presentment                                    |
| 01   | Customer not present                                  |
| 02   | Unattended terminal - terminal can retain card        |
| 03   | Merchant suspicious                                   |
| 05   | Customer present, card not present                    |
| 06   | Pre-authorized request                                |
| 07   | Telephone device required                             |
| 08   | Mail/telephone order                                  |
| 09   | <abbr title="point of sale">POS</abbr> security alert |
| 10   | Customer identity verified                            |
| 11   | Suspicious Activity                                   |
| 12   | Security reasons                                      |
| 13   | Representation of item                                |
| 14   | Public utility terminal                               |
| 15   | Customer's terminal                                   |
| 16   | Administrative terminal                               |
| 17   | Returned item                                         |
| 18   | No check in envelope - return                         |
| 19   | Deposit out of balance - return                       |
| 20   | Payment out of balance - return                       |
| 21   | Manual reversal                                       |
| 22   | Terminal error - counted                              |
| 23   | Terminal error - not counted                          |
| 24   | Deposit out of balance - apply                        |
| 25   | Payment out of balance - apply                        |
| 26   | Withdrawal error - reversed                           |
| 27   | Unattended terminal - terminal can't retain card      |
| 51   | Request for account number verification               |
| 59   | E-commerce request through public network             |
| 71   | Card present, magnetic stripe unreadable (U.S. only)  |

## Risk rules enforced during authorization

Whop Cards enforce automatic risk detection rules to prevent high-risk or suspicious transactions. Each rule includes a time window and trigger threshold:

| Rule name                                                             | Description                                                                                                                                                                 | Time window | Trigger threshold                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| Blocked Country                                                       | Decline all transactions at blocked countries                                                                                                                               | Immediate   | N/A                                                     |
| High Risk <abbr title="merchant category code">MCC</abbr>             | Decline transactions with high-risk merchant category codes                                                                                                                 | Immediate   | N/A                                                     |
| High Risk E-commerce                                                  | Decline transactions with flagged online merchants                                                                                                                          | Immediate   | N/A                                                     |
| E-commerce Rapid Transaction                                          | Prevent an e-commerce transaction burst when someone attempts more than 2 transactions within a 5-minute period                                                             | 5 Minutes   | 2 Transactions                                          |
| Card-present Rapid Transaction                                        | Prevent a card-present transaction burst when someone attempts more than 2 transactions within a 5-minute period                                                            | 5 Minutes   | 2 Transactions                                          |
| Card-not-present Daily Velocity                                       | Card-not-present transaction daily limit reached, more than 11 card-not-present transactions attempted within a 24-hour period                                              | 24 Hours    | 11 Transactions                                         |
| Card-Merchant Daily Velocity                                          | Decline transactions between the same card and merchant when more than 200 transactions occur within a 24-hour period. Surfaces as `transaction declined by risk rules`     | 24 Hours    | 200 Transactions                                        |
| Card-Merchant Authentication 15min Burst Velocity                     | Decline Google temporary-hold (authentication) charges when the same card and merchant exceed 20 transactions within a 14-minute window                                     | 14 Minutes  | 20 Transactions                                         |
| <abbr title="automated fuel dispenser">AFD</abbr> Auth Hold           | Place fuel (<abbr title="merchant category code">MCC</abbr> 5542) authorizations below \$175 on an over-authorization hold rather than declining them                       | Immediate   | \$175 <abbr title="United States dollars">USD</abbr>    |
| Gaming Limit                                                          | Decline a single video game or digital goods (<abbr title="merchant category code">MCC</abbr> 5816/7994) transaction that exceeds \$2,000                                   | Immediate   | \$2,000 <abbr title="United States dollars">USD</abbr>  |
| Gaming Velocity                                                       | Decline if more than 25 gaming transactions within a 2-day period                                                                                                           | 2 Days      | 25 Transactions                                         |
| Ad Services Limit                                                     | Decline a single advertising services (<abbr title="merchant category code">MCC</abbr> 7311) transaction that exceeds \$10,000                                              | Immediate   | \$10,000 <abbr title="United States dollars">USD</abbr> |
| Ad Services Velocity                                                  | Decline more than 40 advertising services (<abbr title="merchant category code">MCC</abbr> 7311) transactions within a 24-hour period                                       | 24 Hours    | 40 Transactions                                         |
| Adult Content Limit                                                   | Decline a single adult content (<abbr title="merchant category code">MCC</abbr> 5967) transaction that exceeds \$200                                                        | Immediate   | \$200 <abbr title="United States dollars">USD</abbr>    |
| Adult Content Velocity                                                | Decline more than 10 adult content (<abbr title="merchant category code">MCC</abbr> 5967) transactions within a 24-hour period                                              | 24 Hours    | 10 Transactions                                         |
| <abbr title="card verification value">CVV</abbr> Security             | Block a transaction after 4 incorrect card verification value attempts within a 24-hour period                                                                              | 24 Hours    | 4 Transactions                                          |
| <abbr title="automated teller machine">ATM</abbr> Withdrawal Limit    | Block an automated teller machine withdrawal (<abbr title="merchant category code">MCC</abbr> 6011) transaction that exceeds \$250                                          | Immediate   | \$250 <abbr title="United States dollars">USD</abbr>    |
| <abbr title="automated teller machine">ATM</abbr> Withdrawal Velocity | Block an automated teller machine withdrawal (<abbr title="merchant category code">MCC</abbr> 6011) after someone attempts more than 3 transactions within a 24-hour period | 24 Hours    | 3 Transactions                                          |
| High Velocity – EA Sports FC                                          | Decline when more than 5 transactions with the same card at Google EA Sports FC occur within a 24-hour period                                                               | 24 Hours    | 5 Transactions                                          |
| High Velocity – Discord                                               | Decline when more than 10 transactions with the same card at Discord merchants occur within a 7-day period                                                                  | 7 Days      | 10 Transactions                                         |
| High Velocity – Free Fire MAX                                         | Decline when more than 10 transactions with the same card at Google Free Fire MAX occur within a 24-hour period                                                             | 24 Hours    | 10 Transactions                                         |

The table shows default thresholds. Whop may update them over time as risk rules change.

Alongside these rules, a fraud risk engine scores transactions. Whop declines high-risk authorizations with `transaction_declined_by_risk_rules`.

## Blocked categories and merchants

Whop Cards block certain merchant category codes and specific merchants by default. See [Blocked categories & merchants](/whop-finance/blocked-categories-and-merchants) for the full lists.

## Next steps

<CardGroup cols={2}>
  <Card title="Blocked categories & merchants" icon="shield-halved" href="/whop-finance/blocked-categories-and-merchants">
    See the merchant categories and merchants that Whop Cards block by default
  </Card>

  <Card title="Whop Cards" icon="credit-card" href="/whop-finance/cards">
    Spend your balance instantly and earn cashback on select merchants
  </Card>
</CardGroup>
