> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Dm Member

> A user's membership record in a messaging channel, including notification preferences and read state.

<ResponseExample>
  ```json Example theme={null}
  {
  	"channel_id": "<string>",
  	"id": "<string>",
  	"last_viewed_at": "123.45",
  	"notification_preference": "all",
  	"status": "requested",
  	"user_id": "<string>"
  }
  ```
</ResponseExample>

<ResponseField name="channel_id" type="string" required>
  The unique identifier of the messaging channel this membership belongs to.
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the entity
</ResponseField>

<ResponseField name="last_viewed_at" type="string | null" required>
  The timestamp when this member last viewed the channel, as a Unix timestamp in milliseconds. Null if the member has never viewed the channel.

  Example: `123.45`
</ResponseField>

<ResponseField name="notification_preference" type="DmsFeedMemberNotificationPreferences" required>
  The notification level for this channel: all, mentions, or none.

  Available options: `all`, `mentions`, `none`
</ResponseField>

<ResponseField name="status" type="DmsFeedMemberStatuses" required>
  The current state of this membership: requested, accepted, hidden, closed, or archived.

  Available options: `requested`, `accepted`, `hidden`, `closed`, `archived`
</ResponseField>

<ResponseField name="user_id" type="string" required>
  The unique identifier of the user who holds this channel membership.
</ResponseField>
