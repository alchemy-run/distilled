> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Review

> A user-submitted review of a company, including a star rating and optional text feedback.

<ResponseExample>
  ```json Example theme={null}
  {
  	"attachments": [
  		{
  			"content_type": "image/jpeg",
  			"filename": "document.pdf",
  			"id": "<string>",
  			"url": "https://media.whop.com/abc123/optimized.jpg"
  		}
  	],
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"route": "pickaxe",
  		"title": "Pickaxe"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"description": "Great product, really helped me grow my audience.",
  	"id": "rev_xxxxxxxxxxxxxx",
  	"joined_at": "2023-12-01T05:00:00.401Z",
  	"paid_for_product": true,
  	"product": {
  		"id": "prod_xxxxxxxxxxxxx",
  		"title": "Pickaxe Analytics"
  	},
  	"published_at": "2023-12-01T05:00:00.401Z",
  	"stars": 42,
  	"status": "pending",
  	"title": "Amazing community and tools",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="attachments" type="array<object>" required>
  A list of files and media attached to the review.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="filename" type="string | null" required>
      The original filename of the uploaded attachment, including its file extension.

      Example: `document.pdf`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="company" type="object" required>
  The company that this review was written for.

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
  The datetime the review was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="description" type="string | null" required>
  The body text of the review containing the user's detailed feedback. Returns an empty string if no description was provided.

  Example: `Great product, really helped me grow my audience.`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the review.

  Example: `rev_xxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="joined_at" type="string<date-time> | null" required>
  The timestamp of when the reviewer first joined the product. Null if unknown.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="paid_for_product" type="boolean | null" required>
  Whether the reviewer paid for the product. Null if the payment status is
  unknown.
</ResponseField>

<ResponseField name="product" type="object" required>
  The product that this review was written for.

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

<ResponseField name="published_at" type="string<date-time> | null" required>
  The timestamp of when the review was published. Null if the review has not been published yet.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="stars" type="integer" required>
  The star rating given by the reviewer, from 1 to 5.

  Example: `42`
</ResponseField>

<ResponseField name="status" type="ReviewStatus" required>
  The current moderation status of the review.

  Available options: `pending`, `published`, `removed`
</ResponseField>

<ResponseField name="title" type="string | null" required>
  A short summary title for the review. Null if the reviewer did not provide one.

  Example: `Amazing community and tools`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the review was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user account of the person who wrote this review.

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
