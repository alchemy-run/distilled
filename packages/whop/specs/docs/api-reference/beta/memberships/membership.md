> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Membership

A Membership is a customer's purchase of a plan: the subscription or one-time grant that gives them access to a product. It tracks billing state (`active`, `trialing`, `past_due`, and so on), the current period, pending cancellations, custom metadata, and the software license key when the product includes licensing.

Use the Memberships API to list an account's memberships or the caller's own, retrieve one by ID or license key, invite a recipient to join through a free plan, and manage the lifecycle: cancel immediately or at period end, reverse a scheduled period-end cancellation, pause and resume payment collection, extend with free days, generate a transfer link, and update metadata.

<Note>
  Replaces the Legacy [Memberships](/api-reference/memberships/membership)
  resource. Existing Legacy integrations keep working; see [API
  versions](/developer/api/versioning) for the stability contract.
</Note>

## Endpoints

| Endpoint                                                                         | Request                                                                         |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [List Memberships](/api-reference/beta/memberships/list-memberships)             | <Badge color="blue" size="sm" stroke>GET</Badge> `/memberships`                 |
| [Retrieve Membership](/api-reference/beta/memberships/retrieve-membership)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/memberships/{id}`            |
| [Update Membership](/api-reference/beta/memberships/update-membership)           | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/memberships/{id}`        |
| [Cancel Membership](/api-reference/beta/memberships/cancel-membership)           | <Badge color="green" size="sm" stroke>POST</Badge> `/memberships/{id}/cancel`   |
| [Extend Membership](/api-reference/beta/memberships/extend-membership)           | <Badge color="green" size="sm" stroke>POST</Badge> `/memberships/{id}/extend`   |
| [Pause Membership](/api-reference/beta/memberships/pause-membership)             | <Badge color="green" size="sm" stroke>POST</Badge> `/memberships/{id}/pause`    |
| [Resume Membership](/api-reference/beta/memberships/resume-membership)           | <Badge color="green" size="sm" stroke>POST</Badge> `/memberships/{id}/resume`   |
| [Transfer Membership](/api-reference/beta/memberships/transfer-membership)       | <Badge color="green" size="sm" stroke>POST</Badge> `/memberships/{id}/transfer` |
| [Invite to a Membership](/api-reference/beta/memberships/invite-to-a-membership) | <Badge color="green" size="sm" stroke>POST</Badge> `/memberships/invite`        |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Membership ID, prefixed `mem_`.
    </ResponseField>

    <ResponseField name="account" type="object" required>
      The account (seller) this membership belongs to.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Account ID, prefixed `biz_`.
        </ResponseField>

        <ResponseField name="logo_url" type="string | null" required>
          Account logo image URL.
        </ResponseField>

        <ResponseField name="route" type="string" required>
          Account public route identifier — the `whop.com/\{route}` storefront path.
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Account display name.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="cancel_at_period_end" type="boolean" required>
      Whether the membership is set to cancel when the current billing period ends.
      Only meaningful for recurring plans.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the membership was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="current_period_end" type="string | null" required>
      When the current billing period renews, or when a non-renewing membership
      expires, as an ISO 8601 timestamp. `null` for one-time purchases with no
      expiration.
    </ResponseField>

    <ResponseField name="license_key" type="string | null" required>
      The software license key for this membership. Only present when the product
      includes a software licensing experience.
    </ResponseField>

    <ResponseField name="member" type="object | null" required>
      The caller's member row on the account. Present only when the membership belongs to the caller; `null` on seller-side reads.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="access_level" type="string" required>
          What the member can reach on the account: `customer` for paying members, `admin` for team members, `no_access` once every grant has lapsed.

          Available options: `no_access`, `admin`, `customer`
        </ResponseField>

        <ResponseField name="last_accessed_at" type="string | null" required>
          When the member last opened the account's content, as an ISO 8601 timestamp.
          `null` if they never have.
        </ResponseField>

        <ResponseField name="position" type="number | null" required>
          The member's sort position in the buyer's own account list. `null` until they arrange it.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="metadata" type="object" required>
      Custom key-value pairs stored on the membership, commonly used for software
      licensing.
    </ResponseField>

    <ResponseField name="plan_id" type="string" required>
      The plan the buyer purchased, prefixed `plan_`.
    </ResponseField>

    <ResponseField name="product_id" type="string" required>
      The product this membership grants access to, prefixed `prod_`.
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Billing state of the membership. `active`/`trialing` memberships grant access; `past_due` is the grace period after a failed payment; `completed` one-time purchases keep access; `canceled`/`expired` do not.

      Available options: `trialing`, `active`, `past_due`, `completed`, `canceled`, `expired`, `unresolved`
    </ResponseField>

    <ResponseField name="user_id" type="string | null" required>
      The buyer, prefixed `user_`. `null` when the buyer is another business or the
      membership is unclaimed.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Membership theme={null}
      {
      	"id": "mem_xxxxxxxxxxxxxx",
      	"status": "active",
      	"user_id": "user_xxxxxxxxxxxxx",
      	"product_id": "prod_xxxxxxxxxxxxx",
      	"plan_id": "plan_xxxxxxxxxxxxx",
      	"license_key": "A1B2C3-D4E5F6-G7H8I9",
      	"cancel_at_period_end": false,
      	"current_period_end": "2026-08-01T00:00:00.000Z",
      	"metadata": {
      		"external_customer_id": "cus_123"
      	},
      	"created_at": "2026-07-01T00:00:00.000Z",
      	"member": {
      		"access_level": "customer",
      		"last_accessed_at": "2026-07-20T15:30:00.000Z",
      		"position": 1
      	},
      	"account": {
      		"id": "biz_xxxxxxxxxxxxxx",
      		"title": "Pickaxe",
      		"route": "pickaxe",
      		"logo_url": "https://cdn.whop.com/account.png"
      	}
      }
      ```
    </div>
  </Column>
</Columns>
