> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Product

> A product is a digital good or service sold on Whop. Products contain plans for pricing and experiences for content delivery.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/products/product), the versioned API that new
  integrations should build on. This page stays fully supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"route": "pickaxe",
  		"title": "Pickaxe"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"custom_cta": "get_access",
  	"custom_cta_url": "https://example.com/signup",
  	"custom_statement_descriptor": "PICKAXE",
  	"description": "Track your revenue, members, and growth in real time.",
  	"external_identifier": "ext_prod_12345",
  	"gallery_images": [
  		{
  			"content_type": "image/jpeg",
  			"id": "<string>",
  			"url": "https://media.whop.com/abc123/optimized.jpg"
  		}
  	],
  	"global_affiliate_percentage": 6.9,
  	"global_affiliate_status": "enabled",
  	"headline": "Real-time data analytics for creators",
  	"id": "prod_xxxxxxxxxxxxx",
  	"member_affiliate_percentage": 6.9,
  	"member_affiliate_status": "enabled",
  	"member_count": 42,
  	"metadata": {},
  	"owner_user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	},
  	"product_tax_code": {
  		"id": "ptc_xxxxxxxxxxxxxx",
  		"name": "Digital - SaaS",
  		"product_type": "physical"
  	},
  	"published_reviews_count": 42,
  	"route": "pickaxe-analytics",
  	"title": "Pickaxe Analytics",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"verified": true,
  	"visibility": "visible"
  }
  ```
</ResponseExample>

<ResponseField name="company" type="object" required>
  The company this product belongs to.

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
  The datetime the product was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="custom_cta" type="CustomCtas" required>
  Call-to-action button label shown on the product purchase page.

  Available options: `get_access`, `join`, `order_now`, `shop_now`, `call_now`, `donate_now`, `contact_us`, `sign_up`, `subscribe`, `purchase`, `get_offer`, `apply_now`, `complete_order`
</ResponseField>

<ResponseField name="custom_cta_url" type="string | null" required>
  An optional URL that the call-to-action button links to instead of the default checkout flow. Null if no custom URL is set.

  Example: `https://example.com/signup`
</ResponseField>

<ResponseField name="custom_statement_descriptor" type="string | null" required>
  Custom bank statement descriptor for product purchases. Maximum 22 characters, including required `WHOP*` prefix.

  Example: `PICKAXE`
</ResponseField>

<ResponseField name="description" type="string | null" required>
  A brief summary of what the product offers, displayed on product pages and search results.

  Example: `Track your revenue, members, and growth in real time.`
</ResponseField>

<ResponseField name="external_identifier" type="string | null" required>
  External identifier for the product. Providing it on a product creation endpoint updates the existing product with this identifier instead of creating a new one.

  Example: `ext_prod_12345`
</ResponseField>

<ResponseField name="gallery_images" type="array<object>" required>
  The gallery images for this product, ordered by position.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="global_affiliate_percentage" type="number | null" required>
  Marketplace affiliate commission percentage for this product, or `null` if program is inactive.

  Example: `6.9`
</ResponseField>

<ResponseField name="global_affiliate_status" type="GlobalAffiliateStatuses" required>
  The enrollment status of this product in the Whop marketplace global affiliate program.

  Available options: `enabled`, `disabled`
</ResponseField>

<ResponseField name="headline" type="string | null" required>
  A short marketing headline displayed prominently on the product's product page.

  Example: `Real-time data analytics for creators`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the product.

  Example: `prod_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="member_affiliate_percentage" type="number | null" required>
  Member referral commission percentage for this product, or `null` if program is inactive.

  Example: `6.9`
</ResponseField>

<ResponseField name="member_affiliate_status" type="GlobalAffiliateStatuses" required>
  The enrollment status of this product in the member affiliate program.

  Available options: `enabled`, `disabled`
</ResponseField>

<ResponseField name="member_count" type="integer" required>
  Active memberships for this product. Returns `0` if the account has disabled public member counts.

  Example: `42`
</ResponseField>

<ResponseField name="metadata" type="object | null" required>
  Custom key-value pairs stored on the product and included in payment and
  membership webhook payloads. Max 50 keys, 100 characters per key, 500
  characters per string value.
</ResponseField>

<ResponseField name="owner_user" type="object" required>
  The user who owns the company that sells this product.

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

<ResponseField name="product_tax_code" type="object | null" required>
  The tax classification code applied to purchases of this product for sales tax calculation. Null if no tax code is assigned.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the product tax code.

      Example: `ptc_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string" required>
      Human-readable name of this tax classification, such as 'Digital - SaaS'.

      Example: `Digital - SaaS`
    </ResponseField>

    <ResponseField name="product_type" type="ProductTaxCodeProductTypes" required>
      Broad product category this tax code covers, such as physical goods or digital services.

      Available options: `physical`, `digital`, `services`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="published_reviews_count" type="integer" required>
  The total number of published customer reviews for this product's company.

  Example: `42`
</ResponseField>

<ResponseField name="route" type="string" required>
  URL slug in the product's public link, e.g. `pickaxe-analytics` in whop.com/company/pickaxe-analytics.

  Example: `pickaxe-analytics`
</ResponseField>

<ResponseField name="title" type="string" required>
  The display name of the product shown to customers on the product page and in search results.

  Example: `Pickaxe Analytics`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the product was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="verified" type="boolean" required>
  Whether this company has been verified by Whop's trust and safety team.
</ResponseField>

<ResponseField name="visibility" type="Visibility" required>
  Controls whether the product is visible to customers. When set to 'hidden', the product is only accessible via direct link.

  Available options: `visible`, `hidden`, `archived`, `quick_link`
</ResponseField>
