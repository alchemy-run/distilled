> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Message

> A message sent within an experience chat, direct message, or group chat.

<ResponseExample>
  ```json Example theme={null}
  {
  	"content": "Hey, are you available for a **quick call**?",
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"id": "<string>",
  	"is_edited": true,
  	"is_pinned": true,
  	"mentions": ["<string>"],
  	"mentions_everyone": true,
  	"message_type": "regular",
  	"poll": {
  		"options": [
  			{
  				"id": "<string>",
  				"text": "<string>"
  			}
  		]
  	},
  	"poll_votes": [
  		{
  			"count": 42,
  			"option_id": "<string>"
  		}
  	],
  	"reaction_counts": [
  		{
  			"count": 42,
  			"emoji": "<string>"
  		}
  	],
  	"replying_to_message_id": "<string>",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	},
  	"view_count": 42
  }
  ```
</ResponseExample>

<ResponseField name="content" type="string | null" required>
  The message content formatted as Markdown. Null if the message has no text content.

  Example: `Hey, are you available for a **quick call**?`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The timestamp when this message was originally created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required />

<ResponseField name="is_edited" type="boolean" required>
  Whether the message content has been edited after it was originally sent.
</ResponseField>

<ResponseField name="is_pinned" type="boolean" required>
  Whether this message is pinned to the top of the channel for easy access.
</ResponseField>

<ResponseField name="mentions" type="array<string>" required>
  A list of user IDs that are explicitly mentioned in this message.
</ResponseField>

<ResponseField name="mentions_everyone" type="boolean" required>
  Whether the message includes an @everyone mention that notifies all channel
  members.
</ResponseField>

<ResponseField name="message_type" type="DmsPostTypes" required>
  The classification of this message: regular, system, or automated.

  Available options: `regular`, `system`, `automated`
</ResponseField>

<ResponseField name="poll" type="object | null" required>
  A poll attached to this message. Null if the message does not contain a poll.

  <Expandable title="child attributes">
    <ResponseField name="options" type="array<object> | null" required>
      The options for the poll

      <Expandable title="child attributes">
        <ResponseField name="id" type="string" required>
          The unique identifier for the poll option.
        </ResponseField>

        <ResponseField name="text" type="string" required>
          The text of the poll option
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="poll_votes" type="array<object>" required>
  Aggregated reaction counts on this message, filtered to a specific reaction type.

  <Expandable title="child attributes">
    <ResponseField name="count" type="integer" required>
      The number of users who reacted

      Example: `42`
    </ResponseField>

    <ResponseField name="option_id" type="string | null" required>
      The reaction that was used
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="reaction_counts" type="array<object>" required>
  Aggregated reaction counts on this message, filtered to a specific reaction type.

  <Expandable title="child attributes">
    <ResponseField name="count" type="integer" required>
      The number of users who reacted

      Example: `42`
    </ResponseField>

    <ResponseField name="emoji" type="string | null" required>
      The emoji that was used in shortcode format (:heart:)
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="replying_to_message_id" type="string | null" required>
  The unique identifier of the message this post is replying to. Null if this is
  not a reply.
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The timestamp when this message was last modified.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user who authored this message.

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

<ResponseField name="view_count" type="integer | null" required>
  The number of unique views this message has received. Null if view tracking is not enabled for this channel.

  Example: `42`
</ResponseField>
