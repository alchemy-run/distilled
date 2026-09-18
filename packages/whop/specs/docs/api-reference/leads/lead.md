> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Lead

> A prospective customer who has expressed interest in a company or product but has not yet purchased.

<ResponseExample>
  ```json Example theme={null}
  {
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"id": "lead_xxxxxxxxxxxxx",
  	"member": {
  		"id": "<string>"
  	},
  	"metadata": {},
  	"product": {
  		"id": "prod_xxxxxxxxxxxxx",
  		"title": "Pickaxe Analytics"
  	},
  	"referrer": "https://twitter.com/whabormarket",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"user": {
  		"email": "john.doe@example.com",
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the lead was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the lead.

  Example: `lead_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="member" type="object | null" required>
  The company member record if this lead has converted into a paying customer. Null if the lead has not converted.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company member.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="metadata" type="object | null" required>
  Custom key-value pairs attached to this lead. Null if no metadata was
  provided.
</ResponseField>

<ResponseField name="product" type="object | null" required>
  The product the lead expressed interest in. Null if the lead is not associated with a specific product.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the product.

      Example: `prod_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the product shown to customers on the product page and in search results.

      Example: `Pickaxe Analytics`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="referrer" type="string | null" required>
  The URL of the page that referred this lead to the company. Null if no referrer was captured.

  Example: `https://twitter.com/whabormarket`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the lead was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user account associated with this lead.

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
