> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Product

A Product is a digital good or service sold on Whop. Products may contain plans for pricing and/or experiences for content delivery.

Use the Products API to search the public marketplace, list an account's products, retrieve a product, and create, update, or delete products.

<Note>
  Replaces the Legacy [Products](/api-reference/products/product) resource.
  Existing Legacy integrations keep working; see [API
  versions](/developer/api/versioning) for the stability contract.
</Note>

## Endpoints

| Endpoint                                                            | Request                                                                       |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [List Products](/api-reference/beta/products/list-products)         | <Badge color="blue" size="sm" stroke>GET</Badge> `/products`                  |
| [Create Product](/api-reference/beta/products/create-product)       | <Badge color="green" size="sm" stroke>POST</Badge> `/products`                |
| [Retrieve Product](/api-reference/beta/products/retrieve-product)   | <Badge color="blue" size="sm" stroke>GET</Badge> `/products/{id}`             |
| [Update Product](/api-reference/beta/products/update-product)       | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/products/{id}`         |
| [Delete Product](/api-reference/beta/products/delete-product)       | <Badge color="red" size="sm" stroke>DELETE</Badge> `/products/{id}`           |
| [Publish Product](/api-reference/beta/products/publish-product)     | <Badge color="green" size="sm" stroke>POST</Badge> `/products/{id}/publish`   |
| [Unpublish Product](/api-reference/beta/products/unpublish-product) | <Badge color="green" size="sm" stroke>POST</Badge> `/products/{id}/unpublish` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Product ID, prefixed `prod_`.
    </ResponseField>

    <ResponseField name="account" type="object | null" required>
      Account that sells this product.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the product was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="custom_cta" type="string | null" required>
      Call-to-action button label shown on the product purchase page.

      Available options: `get_access`, `join`, `order_now`, `shop_now`, `call_now`, `donate_now`, `contact_us`, `sign_up`, `subscribe`, `purchase`, `get_offer`, `apply_now`, `complete_order`
    </ResponseField>

    <ResponseField name="custom_cta_url" type="string | null" required>
      URL the call-to-action button links to instead of checkout.
    </ResponseField>

    <ResponseField name="custom_statement_descriptor" type="string | null" required>
      Custom text label on customer's bank statement.
    </ResponseField>

    <ResponseField name="default_plan" type="object | null" required>
      Buyable plan to show and check out with. The configured default when that plan is buyable, otherwise the first buyable plan in product-page order. `null` when none is buyable.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Plan ID, prefixed `plan_`.
        </ResponseField>

        <ResponseField name="billing_period" type="number | null" required>
          Number of days between recurring charges, such as 30 for monthly or 365 for
          annual. `null` for one-time plans.
        </ResponseField>

        <ResponseField name="expiration_days" type="number | null" required>
          Access duration in days for expiration-based plans. `null` for plans without
          an expiration.
        </ResponseField>

        <ResponseField name="initial_price" type="object" required>
          What checkout charges up front. `amount` is `"0.00"` when the first charge is free, such as a trial.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="amount" type="string" required>
              The amount in major units, as an exact decimal string — `"10.00"` is ten
              dollars. A string so no float rounds it in transit.
            </ResponseField>

            <ResponseField name="currency" type="string" required>
              Three-letter ISO 4217 currency code, lowercase.
            </ResponseField>

            <ResponseField name="decimals" type="integer" required>
              How many decimal places the amount CARRIES — the precision the charge itself
              runs at.
            </ResponseField>

            <ResponseField name="display_decimals" type="integer" required>
              How many decimal places to SHOW. Usually equal to `decimals`, and deliberately not always: COP is charged in centavos but written in whole pesos, so it is `2` and `0`. Format the number in your own locale using this.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="plan_type" type="string" required>
          Billing model for this plan: `one_time` or `renewal`.

          Available options: `renewal`, `one_time`
        </ResponseField>

        <ResponseField name="renewal_price" type="object" required>
          The recurring charge every `billing_period` days. `amount` is `"0.00"` for one-time plans.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="amount" type="string" required>
              The amount in major units, as an exact decimal string — `"10.00"` is ten
              dollars. A string so no float rounds it in transit.
            </ResponseField>

            <ResponseField name="currency" type="string" required>
              Three-letter ISO 4217 currency code, lowercase.
            </ResponseField>

            <ResponseField name="decimals" type="integer" required>
              How many decimal places the amount CARRIES — the precision the charge itself
              runs at.
            </ResponseField>

            <ResponseField name="display_decimals" type="integer" required>
              How many decimal places to SHOW. Usually equal to `decimals`, and deliberately not always: COP is charged in centavos but written in whole pesos, so it is `2` and `0`. Format the number in your own locale using this.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="title" type="string | null" required>
          Plan display name shown to customers. `null` if no title has been set.
        </ResponseField>

        <ResponseField name="unlimited_stock" type="boolean" required>
          Whether the plan has unlimited stock.
        </ResponseField>

        <ResponseField name="visibility" type="string" required>
          Where this plan can be seen. `visible` plans appear on the product page.

          Available options: `visible`, `hidden`, `archived`, `quick_link`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="description" type="string | null" required>
      Written description displayed on the product page. `null` if none is set.
    </ResponseField>

    <ResponseField name="external_identifier" type="string | null" required>
      External identifier stored on the product for your own reference.
    </ResponseField>

    <ResponseField name="gallery_images" type="object[]" required>
      Gallery images for this product, ordered by position.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Gallery image ID.
        </ResponseField>

        <ResponseField name="content_type" type="string | null" required>
          Uploaded file MIME type, such as image/jpeg.
        </ResponseField>

        <ResponseField name="url" type="string | null" required>
          Pre-optimized URL for rendering this image on the client.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="global_affiliate_percentage" type="number | null" required>
      Commission rate affiliates earn through the global affiliate program.
    </ResponseField>

    <ResponseField name="global_affiliate_status" type="string | null" required>
      Enrollment status in the global affiliate program.

      Available options: `enabled`, `disabled`
    </ResponseField>

    <ResponseField name="headline" type="string | null" required>
      Short marketing headline displayed on product page.
    </ResponseField>

    <ResponseField name="labels" type="string[]" required>
      Lowercased labels used to group products into collections. Filter the list
      endpoint by `labels` to fetch one collection.
    </ResponseField>

    <ResponseField name="marketplace_status" type="string" required>
      Listing state on the whop.com marketplace. `pending_review` means submitted and awaiting review; `live_marketplace` means approved and discoverable.

      Available options: `not_available`, `pending_review`, `live_marketplace`
    </ResponseField>

    <ResponseField name="member_affiliate_percentage" type="number | null" required>
      Commission rate members earn through the member affiliate program.
    </ResponseField>

    <ResponseField name="member_affiliate_status" type="string | null" required>
      Enrollment status in the member affiliate program.

      Available options: `enabled`, `disabled`
    </ResponseField>

    <ResponseField name="member_count" type="number" required>
      Active memberships for this product; 0 if public member counts are disabled.
    </ResponseField>

    <ResponseField name="metadata" type="object | null" required>
      Custom key-value pairs stored on the product.
    </ResponseField>

    <ResponseField name="owner_user" type="object | null" required>
      User who owns the account selling this product.
    </ResponseField>

    <ResponseField name="product_tax_code" type="object | null" required>
      Tax classification code for this product, or `null` if no tax code is set.
    </ResponseField>

    <ResponseField name="published_reviews_count" type="number" required>
      Published customer reviews for this product.
    </ResponseField>

    <ResponseField name="route" type="string" required>
      URL slug for the product's public link.
    </ResponseField>

    <ResponseField name="title" type="string" required>
      Product display name shown to customers.
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the product was last updated, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="verified" type="boolean" required>
      Whether the product has been verified by Whop.
    </ResponseField>

    <ResponseField name="visibility" type="string | null" required>
      Whether the product is publicly visible, hidden, or archived.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Product theme={null}
      {
      	"id": "prod_xxxxxxxxxxxxx",
      	"account": {
      		"id": "biz_xxxxxxxxxxxxxx",
      		"route": "pickaxe",
      		"title": "Pickaxe"
      	},
      	"created_at": "2023-12-01T05:00:00.401Z",
      	"custom_cta": "get_access",
      	"custom_cta_url": "https://example.com/signup",
      	"custom_statement_descriptor": "PICKAXE",
      	"default_plan": {
      		"id": "plan_xxxxxxxxxxxxx",
      		"billing_period": 30,
      		"expiration_days": null,
      		"initial_price": {
      			"amount": "29.00",
      			"currency": "usd",
      			"decimals": 2,
      			"display_decimals": 2
      		},
      		"plan_type": "renewal",
      		"renewal_price": {
      			"amount": "29.00",
      			"currency": "usd",
      			"decimals": 2,
      			"display_decimals": 2
      		},
      		"title": "Monthly",
      		"unlimited_stock": true,
      		"visibility": "visible"
      	},
      	"description": "Track your revenue, members, and growth in real time.",
      	"external_identifier": "ext_prod_12345",
      	"gallery_images": [
      		{
      			"id": "file_xxxxxxxxxxxxx",
      			"content_type": "image/jpeg",
      			"url": "https://media.whop.com/abc123/optimized.jpg"
      		}
      	],
      	"global_affiliate_percentage": 6.9,
      	"global_affiliate_status": "enabled",
      	"headline": "Real-time data analytics for creators",
      	"labels": ["analytics", "creator-tools"],
      	"marketplace_status": "live_marketplace",
      	"member_affiliate_percentage": 6.9,
      	"member_affiliate_status": "enabled",
      	"member_count": 42,
      	"metadata": {
      		"external_product_id": "prod_123"
      	},
      	"owner_user": {
      		"id": "user_xxxxxxxxxxxxx",
      		"name": "John Doe",
      		"username": "johndoe42"
      	},
      	"product_tax_code": {
      		"id": "ptc_xxxxxxxxxxxxxx",
      		"name": "Digital - SaaS",
      		"product_type": "digital"
      	},
      	"published_reviews_count": 12,
      	"route": "pickaxe-analytics",
      	"title": "Pickaxe Analytics",
      	"updated_at": "2023-12-01T05:00:00.401Z",
      	"verified": true,
      	"visibility": "visible"
      }
      ```
    </div>
  </Column>
</Columns>
