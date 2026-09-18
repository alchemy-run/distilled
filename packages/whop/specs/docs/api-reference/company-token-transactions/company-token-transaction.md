> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Company Token Transaction

> A token transaction records a credit or debit to a member's token balance within a company, including transfers between members.

<ResponseExample>
  ```json Example theme={null}
  {
  	"amount": 6.9,
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"route": "<string>",
  		"title": "<string>"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"description": "Reward for completing onboarding",
  	"id": "<string>",
  	"idempotency_key": "txn_reward_usr_123_2024",
  	"linked_transaction_id": "<string>",
  	"member": {
  		"id": "<string>"
  	},
  	"transaction_type": "add",
  	"user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="amount" type="number" required>
  The token amount for this transaction. Always a positive value regardless of transaction type.

  Example: `6.9`
</ResponseField>

<ResponseField name="company" type="object" required>
  The company whose token balance this transaction affects.

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

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the company token transaction was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="description" type="string | null" required>
  Free-text description explaining the reason for this token transaction. Null if no description was provided.

  Example: `Reward for completing onboarding`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the company token transaction.
</ResponseField>

<ResponseField name="idempotency_key" type="string | null" required>
  A unique key used to prevent duplicate transactions when retrying API requests. Null if no idempotency key was provided.

  Example: `txn_reward_usr_123_2024`
</ResponseField>

<ResponseField name="linked_transaction_id" type="string | null" required>
  The ID of the corresponding transaction on the other side of a transfer. Null
  if this is not a transfer transaction.
</ResponseField>

<ResponseField name="member" type="object" required>
  The member whose token balance was affected by this transaction.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company member.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="transaction_type" type="CompanyTokenTransactionTypes" required>
  The direction of this token transaction (add, subtract, or transfer).

  Available options: `add`, `subtract`, `transfer`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user whose token balance was affected by this transaction.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the user.

      Example: `user_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The user's display name shown on their public profile.

      Example: `John Doe`
    </ResponseField>

    <ResponseField name="username" type="string" required>
      The user's unique username shown on their public profile.

      Example: `johndoe42`
    </ResponseField>
  </Expandable>
</ResponseField>
