---
title: List custom pages
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Custom Pages](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/custom_pages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List custom pages

GET/accounts/{account\_id}/access/custom\_pages

List custom pages

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

`Access: Custom Pages Write``Access: Custom Pages Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number of results.

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum1000

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.custom_pages%20%3E%20(model)%20custom_page_without_html%20%3E%20(schema)">CustomPageWithoutHTML</a> { name, type, contract\_version, 2 more }

</summary>

name: string

Custom page name.

<a href="#">Link to this property</a>

<details>

<summary>

type: "identity\_denied"or "forbidden"or "login"or "interstitial"

Custom page type.

</summary>

One of the following:

"identity\_denied"

<a href="#">Link to this property</a>

"forbidden"

<a href="#">Link to this property</a>

"login"

<a href="#">Link to this property</a>

"interstitial"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

contract\_version: optional number

Contract version of the page’s Liquid template. Present (&gt;= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.

<a href="#">Link to this property</a>

uid: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

warnings: optional array of object {message, tier, ref }

Advisory validation findings returned when creating or updating a template. Omitted when empty.

</summary>

message: string

Human-readable description of the finding.

<a href="#">Link to this property</a>

tier: string

The validation tier that produced the finding (e.g. html, liquid).

<a href="#">Link to this property</a>

ref: optional string

Optional pointer to the part of the template the finding refers to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List custom pages

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/custom_pages \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "name": "name",
      "type": "identity_denied",
      "app_count": 0,
      "contract_version": 0,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "warnings": [
        {
          "message": "message",
          "tier": "tier",
          "ref": "ref"
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "name": "name",
      "type": "identity_denied",
      "app_count": 0,
      "contract_version": 0,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "warnings": [
        {
          "message": "message",
          "tier": "tier",
          "ref": "ref"
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```