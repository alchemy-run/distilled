> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Reaction

> A single reaction left by a user on a feed post, such as a like or emoji.

<ResponseExample>
  ```json Example theme={null}
  {
  	"emoji": ":heart:",
  	"id": "reac_xxxxxxxxxxxxxxxxxxxxxx",
  	"resource_id": "<string>",
  	"user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="emoji" type="string | null" required>
  The emoji used for this reaction in shortcode format. Null if the reaction type is not emoji.

  Example: `:heart:`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the entity

  Example: `reac_xxxxxxxxxxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="resource_id" type="string" required>
  The unique identifier of the post this reaction was left on.
</ResponseField>

<ResponseField name="user" type="object" required>
  The user who left this reaction on the post.

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
