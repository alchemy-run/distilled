---
title: List account audit log product categories (Version 2)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Logs](https://developers.cloudflare.com/api/resources/accounts/subresources/logs)

[Audit](https://developers.cloudflare.com/api/resources/accounts/subresources/logs/subresources/audit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List account audit log product categories (Version 2)

GET/accounts/{account\_id}/logs/audit/product\_categories

Lists the available audit log product categories and the resource products each one expands to. Use these values with the product\_category filter on the account audit logs endpoint.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Account Settings Write``Account Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

The unique id that identifies the account.

[Link to this property](#)%20accounts.logs.audit%20%3E%20(method)%20product_categories%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.logs.audit%20%3E%20(method)%20product_categories%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

result: optional array of object {label, products, value }

</summary>

label: optional string

A human-readable label for the product category.

<a href="#">Link to this property</a>

<details>

<summary>

products: optional array of object {label, value }

The resource products that the product category expands to.

</summary>

label: optional string

A human-readable label for the product.

<a href="#">Link to this property</a>

value: optional string

The resource\_product value that the product category expands to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

The product category identifier used with the product\_category filter.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.logs.audit%20%3E%20(method)%20product_categories%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: optional true

Indicates whether the API call was successful

[Link to this property](#)%20accounts.logs.audit%20%3E%20(method)%20product_categories%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List account audit log product categories (Version 2)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/audit/product_categories \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "label": "Zero Trust",
      "products": [
        {
          "label": "Gateway",
          "value": "gateway"
        }
      ],
      "value": "zerotrust"
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "label": "Zero Trust",
      "products": [
        {
          "label": "Gateway",
          "value": "gateway"
        }
      ],
      "value": "zerotrust"
    }
  ],
  "success": true
}
```