> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Experience

> An experience is a feature or content module within a product, such as a chat, course, or custom app.

<ResponseExample>
  ```json Example theme={null}
  {
  	"app": {
  		"icon": {
  			"url": "https://media.whop.com/abc123/optimized.jpg"
  		},
  		"id": "app_xxxxxxxxxxxxxx",
  		"name": "Courses"
  	},
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"route": "pickaxe",
  		"title": "Pickaxe"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"id": "exp_xxxxxxxxxxxxxx",
  	"image": {
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"is_public": true,
  	"name": "Trading Signals Chat",
  	"order": "123.45",
  	"products": [
  		{
  			"id": "prod_xxxxxxxxxxxxx",
  			"route": "pickaxe-analytics",
  			"title": "Pickaxe Analytics"
  		}
  	]
  }
  ```
</ResponseExample>

<ResponseField name="app" type="object" required>
  The app that powers this experience, defining its interface and behavior.

  <Expandable title="child attributes">
    <ResponseField name="icon" type="object | null" required>
      The icon image for this app, displayed on the app store, product pages, checkout, and as the default icon for experiences using this app.

      <Expandable title="child attributes">
        <ResponseField name="url" type="string | null" required>
          A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

          Example: `https://media.whop.com/abc123/optimized.jpg`
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the app.

      Example: `app_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string" required>
      The display name of this app shown on the app store and in experience navigation. Maximum 30 characters.

      Example: `Courses`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="company" type="object" required>
  The company that owns this experience.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="route" type="string" required>
      URL slug for the account's store page, e.g. `pickaxe` in whop.com/pickaxe.

      Example: `pickaxe`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the company shown to customers.

      Example: `Pickaxe`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the experience was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the experience.

  Example: `exp_xxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="image" type="object | null" required>
  The custom logo image for this experience. Null if no custom logo has been uploaded.

  <Expandable title="child attributes">
    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="is_public" type="boolean" required>
  Whether this experience is publicly visible to all users, including those
  without a membership.
</ResponseField>

<ResponseField name="name" type="string" required>
  The display name of this experience shown to users in the product navigation. Maximum 255 characters.

  Example: `Trading Signals Chat`
</ResponseField>

<ResponseField name="order" type="string | null" required>
  The sort position of this experience within its section. Lower values appear first. Null if no position has been set.

  Example: `123.45`
</ResponseField>

<ResponseField name="products" type="array<object>" required>
  The list of products this experience is attached to, which determines which customers have access. Empty if the experience is only visible to authorized company team members.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the product.

      Example: `prod_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="route" type="string" required>
      URL slug in the product's public link, e.g. `pickaxe-analytics` in whop.com/company/pickaxe-analytics.

      Example: `pickaxe-analytics`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the product shown to customers on the product page and in search results.

      Example: `Pickaxe Analytics`
    </ResponseField>
  </Expandable>
</ResponseField>
