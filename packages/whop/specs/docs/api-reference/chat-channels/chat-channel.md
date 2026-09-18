> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat Channel

> A real-time chat feed attached to an experience, with configurable moderation and posting permissions.

<ResponseExample>
  ```json Example theme={null}
  {
  	"ban_media": true,
  	"ban_urls": true,
  	"banned_words": ["<string>"],
  	"experience": {
  		"id": "exp_xxxxxxxxxxxxxx",
  		"name": "Trading Signals Chat"
  	},
  	"id": "<string>",
  	"user_posts_cooldown_seconds": 42,
  	"who_can_post": "everyone",
  	"who_can_react": "everyone"
  }
  ```
</ResponseExample>

<ResponseField name="ban_media" type="boolean" required>
  Whether media uploads such as images and videos are blocked in this chat.
</ResponseField>

<ResponseField name="ban_urls" type="boolean" required>
  Whether URL links are blocked from being posted in this chat.
</ResponseField>

<ResponseField name="banned_words" type="array<string>" required>
  A list of words that are automatically filtered from messages in this chat.
</ResponseField>

<ResponseField name="experience" type="object" required>
  The experience this chat feed is attached to.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the experience.

      Example: `exp_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string" required>
      The display name of this experience shown to users in the product navigation. Maximum 255 characters.

      Example: `Trading Signals Chat`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the entity
</ResponseField>

<ResponseField name="user_posts_cooldown_seconds" type="integer | null" required>
  The minimum number of seconds a user must wait between consecutive messages. Null if no cooldown is enforced.

  Example: `42`
</ResponseField>

<ResponseField name="who_can_post" type="WhoCanPostTypes" required>
  The permission level controlling which users can send messages in this chat.

  Available options: `everyone`, `admins`
</ResponseField>

<ResponseField name="who_can_react" type="WhoCanReactTypes" required>
  The permission level controlling which users can add reactions in this chat.

  Available options: `everyone`, `no_one`
</ResponseField>
