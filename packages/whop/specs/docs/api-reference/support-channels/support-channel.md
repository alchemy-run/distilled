> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Support Channel

> A messaging channel that can be a one-on-one DM, group chat, company support conversation, or platform-level direct message.

<ResponseExample>
  ```json Example theme={null}
  {
  	"company_id": "<string>",
  	"custom_name": "Project Alpha Team",
  	"customer_user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	},
  	"id": "<string>",
  	"last_message_at": "2023-12-01T05:00:00.401Z",
  	"resolved_at": "2023-12-01T05:00:00.401Z"
  }
  ```
</ResponseExample>

<ResponseField name="company_id" type="string | null" required>
  The unique identifier of the company associated with this channel. Null if
  this is not a support or company-scoped conversation.
</ResponseField>

<ResponseField name="custom_name" type="string | null" required>
  A custom display name assigned to this channel by the user. Null if no custom name has been set.

  Example: `Project Alpha Team`
</ResponseField>

<ResponseField name="customer_user" type="object | null" required>
  The customer who initiated this support conversation. Null if this is not a support chat.

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

<ResponseField name="id" type="string" required>
  The unique identifier for the entity
</ResponseField>

<ResponseField name="last_message_at" type="string<date-time> | null" required>
  The timestamp when the most recent message was sent in this channel. Null if no messages have been sent.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="resolved_at" type="string<date-time> | null" required>
  The timestamp when the linked support ticket was marked as resolved. Null if unresolved or not a support chat.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>
