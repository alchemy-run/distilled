> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ai Chat

> An AI-powered chat conversation belonging to a user, with optional scheduled automation.

<ResponseExample>
  ```json Example theme={null}
  {
  	"blended_token_usage": "123.45",
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"id": "aich_xxxxxxxxxxxxx",
  	"last_message_at": "2023-12-01T05:00:00.401Z",
  	"message_count": 42,
  	"notification_preference": "all",
  	"title": "Weekly Revenue Analysis",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"user": {
  		"id": "user_xxxxxxxxxxxxx"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="blended_token_usage" type="string" required>
  The total number of tokens consumed across all messages in this conversation.

  Example: `123.45`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the ai chat was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the ai chat.

  Example: `aich_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="last_message_at" type="string<date-time> | null" required>
  The timestamp of the most recent message in this conversation. Null if no messages have been sent yet.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="message_count" type="integer" required>
  The total number of messages exchanged in this conversation.

  Example: `42`
</ResponseField>

<ResponseField name="notification_preference" type="AiChatNotificationPreferences" required>
  The notification preference for this AI chat. `all` delivers AI chat notifications and badges, while `none` mutes them.

  Available options: `all`, `none`
</ResponseField>

<ResponseField name="title" type="string | null" required>
  A short descriptive title for this AI chat conversation. Null if no title has been set.

  Example: `Weekly Revenue Analysis`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the ai chat was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user who owns this AI chat conversation.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the user.

      Example: `user_xxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>
