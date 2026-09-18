> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Forum

> A discussion forum where members can create posts, comment, and react, belonging to an experience.

<ResponseExample>
  ```json Example theme={null}
  {
  	"email_notification_preference": "all_admin_posts",
  	"experience": {
  		"id": "exp_xxxxxxxxxxxxxx",
  		"is_public": true,
  		"name": "Trading Signals Chat"
  	},
  	"id": "<string>",
  	"who_can_comment": "everyone",
  	"who_can_post": "everyone"
  }
  ```
</ResponseExample>

<ResponseField name="email_notification_preference" type="ForumEmailNotificationPreferences" required>
  The email notification setting that controls which posts trigger email alerts. One of: all\_admin\_posts, only\_weekly\_summary, none.

  Available options: `all_admin_posts`, `only_weekly_summary`, `none`
</ResponseField>

<ResponseField name="experience" type="object" required>
  The parent experience that this forum belongs to.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the experience.

      Example: `exp_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="is_public" type="boolean" required>
      Whether this experience is publicly visible to all users, including those
      without a membership.
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

<ResponseField name="who_can_comment" type="ForumWhoCanCommentTypes" required>
  The permission level controlling who can comment on posts. One of: everyone, admins.

  Available options: `everyone`, `admins`
</ResponseField>

<ResponseField name="who_can_post" type="ForumWhoCanPostTypes" required>
  The permission level controlling who can create new posts. One of: everyone, admins.

  Available options: `everyone`, `admins`
</ResponseField>
