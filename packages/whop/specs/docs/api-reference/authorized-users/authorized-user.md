> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authorized User

> A user who belongs to a company's team with access determined by their assigned role.

<ResponseExample>
  ```json Example theme={null}
  {
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"title": "Pickaxe"
  	},
  	"id": "ausr_xxxxxxxxxxxxx",
  	"role": "owner",
  	"user": {
  		"email": "john.doe@example.com",
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="company" type="object" required>
  The company this authorized user has access to.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the company shown to customers.

      Example: `Pickaxe`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the authorized user.

  Example: `ausr_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="role" type="AuthorizedUserRoles" required>
  The permission role assigned to this authorized user within the company.

  Available options: `owner`, `admin`, `sales_manager`, `moderator`, `advertiser`, `app_manager`, `support`, `manager`, `workforce`, `custom`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user account linked to this authorized user record.

  <Expandable title="child attributes">
    <ResponseField name="email" type="string | null" required>
      The user's email address. Requires the member:email:read permission to access. Null if not authorized.

      Example: `john.doe@example.com`
    </ResponseField>

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
