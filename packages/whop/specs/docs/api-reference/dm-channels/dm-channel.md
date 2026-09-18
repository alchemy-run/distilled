> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Dm Channel

> A messaging channel that can be a one-on-one DM, group chat, company support conversation, or platform-level direct message.

<ResponseExample>
  ```json Example theme={null}
  {
  	"created_at": "123.45",
  	"id": "<string>",
  	"last_message_at": "2023-12-01T05:00:00.401Z",
  	"name": "Project Alpha Team"
  }
  ```
</ResponseExample>

<ResponseField name="created_at" type="string" required>
  The time the entity was created (in milliseconds since Unix epoch)

  Example: `123.45`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the entity
</ResponseField>

<ResponseField name="last_message_at" type="string<date-time> | null" required>
  The timestamp when the most recent message was sent in this channel. Null if no messages have been sent.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="name" type="string | null" required>
  A custom display name assigned to this channel by the user. Null if no custom name has been set.

  Example: `Project Alpha Team`
</ResponseField>
