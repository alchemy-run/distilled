> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cards

Cards represent Whop-issued virtual payment cards that spend from an account or user balance. Cards can be assigned to cardholders and configured with spending limits for controlled spending.

Use the Cards API to issue cards, list cards for an account or user, and retrieve active card details such as the card number and CVC.

## Endpoints

| Endpoint                                                                         | Request                                                                    |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [List Card Transactions](/api-reference/beta/cards/list-card-transactions)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/card_transactions`      |
| [Retrieve Card Transaction](/api-reference/beta/cards/retrieve-card-transaction) | <Badge color="blue" size="sm" stroke>GET</Badge> `/card_transactions/{id}` |
| [List Cards](/api-reference/beta/cards/list-cards)                               | <Badge color="blue" size="sm" stroke>GET</Badge> `/cards`                  |
| [Create Card](/api-reference/beta/cards/create-card)                             | <Badge color="green" size="sm" stroke>POST</Badge> `/cards`                |
| [Retrieve Card](/api-reference/beta/cards/retrieve-card)                         | <Badge color="blue" size="sm" stroke>GET</Badge> `/cards/{id}`             |
| [Update Card](/api-reference/beta/cards/update-card)                             | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/cards/{id}`         |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Card ID, prefixed `icrd_`.
    </ResponseField>

    <ResponseField name="billing" type="object | null" required>
      The billing address.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="city" type="string | null" required>
          Billing city.
        </ResponseField>

        <ResponseField name="country_code" type="string | null" required>
          Billing country code.
        </ResponseField>

        <ResponseField name="line1" type="string | null" required>
          Street address line 1.
        </ResponseField>

        <ResponseField name="line2" type="string | null" required>
          Street address line 2.
        </ResponseField>

        <ResponseField name="postal_code" type="string | null" required>
          Billing postal code.
        </ResponseField>

        <ResponseField name="region" type="string | null" required>
          Billing region or state.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="canceled_at" type="string | null" required>
      When the card was canceled.
    </ResponseField>

    <ResponseField name="created_at" type="string | null" required>
      When the card was created.
    </ResponseField>

    <ResponseField name="expiration_month" type="string | null" required>
      Card expiration month.
    </ResponseField>

    <ResponseField name="expiration_year" type="string | null" required>
      Card expiration year.
    </ResponseField>

    <ResponseField name="last4" type="string | null" required>
      Last four digits of the card number. `null` for pending invitation cards.
    </ResponseField>

    <ResponseField name="limit" type="object | null" required>
      The spending limit configuration.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="amount" type="number" required>
          The limit amount in dollars.
        </ResponseField>

        <ResponseField name="frequency" type="string" required>
          The window the limit amount applies to. `per_transaction` caps each individual authorization and is what a limit set with `transaction_limit` reports.

          Available options: `daily`, `weekly`, `monthly`, `one_time`, `per_transaction`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      Card display name.
    </ResponseField>

    <ResponseField name="object" type="string" required />

    <ResponseField name="secrets" type="object | null">
      Sensitive card details. Present only on `GET /cards/:id` for active cards; `null` when the card is inactive or details cannot be retrieved.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="card_number" type="string" required>
          Full card number.
        </ResponseField>

        <ResponseField name="cvc" type="string" required>
          Card verification code.
        </ResponseField>

        <ResponseField name="name_on_card" type="string | null" required>
          Cardholder name printed on the card.
        </ResponseField>

        <ResponseField name="pin" type="string | null" required>
          The card PIN. Only returned when the request is authenticated as the user the card is assigned to; `null` for all other callers, including account API keys.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="spent_last_month" type="integer | null" required>
      Total spend in the last 30 days, in cents.
    </ResponseField>

    <ResponseField name="status" type="string | null" required>
      The card status. `denied` means the issuer declined the cardholder, so the card will never be issued.

      Available options: `active`, `frozen`, `canceled`, `invited`, `denied`
    </ResponseField>

    <ResponseField name="type" type="string | null" required>
      The card type.

      Available options: `virtual`, `physical`
    </ResponseField>

    <ResponseField name="user_id" type="string | null" required>
      Cardholder user ID, prefixed `user_`, when assigned.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Card theme={null}
      {
      	"id": "icrd_xxxxxxxxxxxxx",
      	"billing": {
      		"city": "New York",
      		"country_code": "US",
      		"line1": "123 Spring Street",
      		"line2": "Suite 4",
      		"postal_code": "10012",
      		"region": "NY"
      	},
      	"canceled_at": null,
      	"created_at": "2026-06-01T12:00:00Z",
      	"expiration_month": "12",
      	"expiration_year": "2029",
      	"last4": "4242",
      	"limit": {
      		"amount": 500,
      		"frequency": "daily"
      	},
      	"name": "Operations Card",
      	"object": "card",
      	"secrets": {
      		"card_number": "4242424242424242",
      		"cvc": "123",
      		"name_on_card": "Pickaxe Operations",
      		"pin": "1234"
      	},
      	"spent_last_month": 12500,
      	"status": "active",
      	"type": "virtual",
      	"user_id": "user_xxxxxxxxxxxxx"
      }
      ```
    </div>
  </Column>
</Columns>
