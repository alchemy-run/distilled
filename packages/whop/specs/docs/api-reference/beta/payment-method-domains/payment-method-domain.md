> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payment Method Domain

A Payment Method Domain registers a hostname with a wallet provider so its payment methods can appear at a checkout served from that domain. The domain proves ownership by hosting the provider's association file — for Apple Pay, at `/.well-known/apple-developer-merchantid-domain-association` — and `status` reports whether verification has completed.

Use the Payment Method Domains API to register domains for your account or its connected accounts, retry verification once the association file is hosted, and remove domains that should no longer serve wallet payments. A domain a platform shares with its connected accounts at checkout is listed on the platform's account, not on each connected account.

## Endpoints

| Endpoint                                                                                                    | Request                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [List Payment Method Domains](/api-reference/beta/payment-method-domains/list-payment-method-domains)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/payment_method_domains`               |
| [Create Payment Method Domain](/api-reference/beta/payment-method-domains/create-payment-method-domain)     | <Badge color="green" size="sm" stroke>POST</Badge> `/payment_method_domains`             |
| [Retrieve Payment Method Domain](/api-reference/beta/payment-method-domains/retrieve-payment-method-domain) | <Badge color="blue" size="sm" stroke>GET</Badge> `/payment_method_domains/{id}`          |
| [Delete Payment Method Domain](/api-reference/beta/payment-method-domains/delete-payment-method-domain)     | <Badge color="red" size="sm" stroke>DELETE</Badge> `/payment_method_domains/{id}`        |
| [Verify Payment Method Domain](/api-reference/beta/payment-method-domains/verify-payment-method-domain)     | <Badge color="green" size="sm" stroke>POST</Badge> `/payment_method_domains/{id}/verify` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Payment method domain ID, prefixed `pmd_`.
    </ResponseField>

    <ResponseField name="account_id" type="string | null" required>
      ID of the account the domain is registered for, prefixed `biz_`.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the domain was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="hostname" type="string" required>
      Hostname the checkout is served from (e.g. `checkout.example.com`).
    </ResponseField>

    <ResponseField name="provider" type="string" required>
      Wallet provider the domain is registered with.

      Available options: `apple`
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Verification status. `pending` means the provider could not fetch the domain-association file yet; only `verified` domains show wallet payment methods at checkout.

      Available options: `pending`, `verified`
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the domain was last updated, as an ISO 8601 timestamp.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json PaymentMethodDomain theme={null}
      {
      	"id": "pmd_xxxxxxxxxxxxxx",
      	"account_id": "biz_xxxxxxxxxxxxxx",
      	"hostname": "checkout.example.com",
      	"provider": "apple",
      	"status": "verified",
      	"created_at": "2026-08-01T12:00:00Z",
      	"updated_at": "2026-08-01T12:05:00Z"
      }
      ```
    </div>
  </Column>
</Columns>
