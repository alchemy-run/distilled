> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Company

> A company is a seller on Whop. Companies own products, manage members, and receive payouts.

<ResponseExample>
  ```json Example theme={null}
  {
  	"affiliate_instructions": "Share your unique link on social media to earn 20% commission.",
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"description": "Learn the fundamentals of data analytics with hands-on projects.",
  	"featured_affiliate_product": {
  		"id": "prod_xxxxxxxxxxxxx",
  		"name": "<string>"
  	},
  	"id": "biz_xxxxxxxxxxxxxx",
  	"logo": {
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"member_count": 42,
  	"metadata": {},
  	"owner_user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	},
  	"published_reviews_count": 42,
  	"route": "pickaxe",
  	"send_customer_emails": true,
  	"social_links": [
  		{
  			"id": "soci_xxxxxxxxxxxxx",
  			"url": "https://x.com/whop",
  			"website": "x"
  		}
  	],
  	"target_audience": "<string>",
  	"title": "Pickaxe",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"verified": true
  }
  ```
</ResponseExample>

<ResponseField name="affiliate_instructions" type="string | null" required>
  Guidelines and instructions provided to affiliates explaining how to promote this company's products.

  Example: `Share your unique link on social media to earn 20% commis…`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the company was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="description" type="string | null" required>
  A promotional pitch written by the company creator, displayed to potential customers on the store page.

  Example: `Learn the fundamentals of data analytics with hands-on pr…`
</ResponseField>

<ResponseField name="featured_affiliate_product" type="object | null" required>
  The product featured for affiliates to promote on this company's affiliate page. Null if none is configured.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the product.

      Example: `prod_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string" required>
      The display name of the product shown to customers. Maximum 50 characters.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the company.

  Example: `biz_xxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="logo" type="object | null" required>
  The company's logo.

  <Expandable title="child attributes">
    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="member_count" type="integer" required>
  The total number of users who currently hold active memberships across all of this company's products.

  Example: `42`
</ResponseField>

<ResponseField name="metadata" type="object | null" required>
  A key-value JSON object of custom metadata for this company, managed by the
  platform that created the account.
</ResponseField>

<ResponseField name="owner_user" type="object" required>
  The user who owns and has full administrative control over this company.

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

<ResponseField name="published_reviews_count" type="integer" required>
  The total number of published customer reviews across all products for this company.

  Example: `42`
</ResponseField>

<ResponseField name="route" type="string" required>
  URL slug for the account's store page, e.g. `pickaxe` in whop.com/pickaxe.

  Example: `pickaxe`
</ResponseField>

<ResponseField name="send_customer_emails" type="boolean" required>
  Whether Whop sends transactional emails (receipts, updates) to customers on
  behalf of this company.
</ResponseField>

<ResponseField name="social_links" type="array<object>" required>
  The list of social media accounts and external links associated with this company.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the social link.

      Example: `soci_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="url" type="string" required>
      The URL of the social media profile or external link.

      Example: `https://x.com/whop`
    </ResponseField>

    <ResponseField name="website" type="SocialLinkWebsites" required>
      The website

      Available options: `x`, `instagram`, `facebook`, `tiktok`, `youtube`, `linkedin`, `twitch`, `website`, `custom`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="target_audience" type="string | null" required>
  The target audience for the company. Null if not set.
</ResponseField>

<ResponseField name="title" type="string" required>
  The display name of the company shown to customers.

  Example: `Pickaxe`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the company was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="verified" type="boolean" required>
  Whether this company has been verified by Whop's trust and safety team.
</ResponseField>
