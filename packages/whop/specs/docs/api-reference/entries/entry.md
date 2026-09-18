> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Entry

> An entry represents a user's signup for a waitlisted plan.

<ResponseExample>
  ```json Example theme={null}
  {
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"custom_field_responses": [
  		{
  			"answer": "<string>",
  			"id": "cfrp_xxxxxxxxxxxxx",
  			"question": "<string>"
  		}
  	],
  	"id": "entry_xxxxxxxxxxxx",
  	"plan": {
  		"id": "plan_xxxxxxxxxxxxx"
  	},
  	"product": {
  		"id": "prod_xxxxxxxxxxxxx",
  		"title": "Pickaxe Analytics"
  	},
  	"status": "drafted",
  	"user": {
  		"email": "john.doe@example.com",
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="created_at" type="string<date-time> | null" required>
  The datetime the entry was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="custom_field_responses" type="array<object> | null" required>
  The list of responses collected from the user when submitting their waitlist entry.

  <Expandable title="child attributes">
    <ResponseField name="answer" type="string" required>
      The response a user gave to the specific question or field.
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the custom field response.

      Example: `cfrp_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="question" type="string" required>
      The question asked by the custom field
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the entry.

  Example: `entry_xxxxxxxxxxxx`
</ResponseField>

<ResponseField name="plan" type="object | null" required>
  The waitlisted plan that this entry is a signup for.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the plan.

      Example: `plan_xxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="product" type="object | null" required>
  The product associated with this entry's waitlisted plan. Null if the plan is not tied to a product.

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

<ResponseField name="status" type="EntryStatus" required>
  The current status of the waitlist entry (e.g., drafted, pending, approved, denied).

  Available options: `drafted`, `pending`, `approved`, `denied`, `any`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user who submitted this waitlist entry.

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
