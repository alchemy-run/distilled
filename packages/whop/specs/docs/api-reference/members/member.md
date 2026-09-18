> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Member

> A member represents a user's relationship with a company on Whop, including their access level, status, and spending history.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/members/member), the versioned API that new
  integrations should build on. This page stays fully supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"access_level": "no_access",
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"route": "<string>",
  		"title": "<string>"
  	},
  	"company_token_balance": 6.9,
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"id": "<string>",
  	"joined_at": "2023-12-01T05:00:00.401Z",
  	"most_recent_action": "canceling",
  	"most_recent_action_at": "2023-12-01T05:00:00.401Z",
  	"phone": "<string>",
  	"status": "drafted",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"usd_total_spent": 6.9,
  	"user": {
  		"email": "<string>",
  		"id": "<string>",
  		"name": "<string>",
  		"username": "<string>"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="access_level" type="AccessLevel" required>
  The member's content access level. `admin` means their team role grants administrative content access, `customer` means they hold a valid product membership, and `no_access` means they cannot access company content.

  Available options: `no_access`, `admin`, `customer`
</ResponseField>

<ResponseField name="company" type="object" required>
  The company for the member.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="route" type="string" required>
      The slug/route of the company on the Whop site.
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The written name of the company.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="company_token_balance" type="number" required>
  The member's token balance for this company. Computed live from the ledger, not from a cache.

  Example: `6.9`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the company member was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the company member.
</ResponseField>

<ResponseField name="joined_at" type="string<date-time>" required>
  When the member joined the company

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="most_recent_action" type="MemberMostRecentActions | null" required>
  The most recent action the member has taken.

  Available options: `canceling`, `churned`, `finished_split_pay`, `paused`, `paid_subscriber`, `paid_once`, `expiring`, `joined`, `drafted`, `left`, `trialing`, `pending_entry`, `renewing`, `past_due`
</ResponseField>

<ResponseField name="most_recent_action_at" type="string<date-time> | null" required>
  The time for the most recent action, if applicable.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="phone" type="string | null" required>
  The phone number for the member, if available.
</ResponseField>

<ResponseField name="status" type="MemberStatuses" required>
  The status of the member

  Available options: `drafted`, `joined`, `left`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the company member was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="usd_total_spent" type="number" required>
  How much money this customer has spent on the company's products and plans

  Example: `6.9`
</ResponseField>

<ResponseField name="user" type="object | null" required>
  The user for this member, if any.

  <Expandable title="child attributes">
    <ResponseField name="email" type="string | null" required>
      The digital mailing address of the user.
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the company member user.
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The user's full name.
    </ResponseField>

    <ResponseField name="username" type="string" required>
      The whop username.
    </ResponseField>
  </Expandable>
</ResponseField>
