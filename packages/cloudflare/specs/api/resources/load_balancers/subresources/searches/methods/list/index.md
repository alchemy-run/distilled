---
title: Search Resources
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

[Searches](https://developers.cloudflare.com/api/resources/load_balancers/subresources/searches)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Search Resources

GET/accounts/{account\_id}/load\_balancers/search

Search for Load Balancing resources.

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

`Load Balancing: Monitors and Pools Write``Load Balancing: Monitors and Pools Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

minimum1

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum1000

minimum1

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

query: optional string

Search query term.

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20query%20%3E%20(schema)>)

<details>

<summary>

references: optional ""or "\*"or "referral"or "referrer"

The type of references to include. ”\*” to include both referral and referrer references. "" to not include any reference information.

</summary>

One of the following:

""

<a href="#">Link to this property</a>

"\*"

<a href="#">Link to this property</a>

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20references%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {resources }

</summary>

<details>

<summary>

resources: optional array of object {reference\_type, references, resource\_id, 2 more }

A list of resources matching the search query.

</summary>

<details>

<summary>

reference\_type: optional "referral"or "referrer"

When listed as a reference, the type (direction) of the reference.

</summary>

One of the following:

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

references: optional array of unknown

A list of references to (referrer) or from (referral) this resource.

<a href="#">Link to this property</a>

resource\_id: optional string

<a href="#">Link to this property</a>

resource\_name: optional string

The human-identifiable name of the resource.

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: optional "load\_balancer"or "monitor"or "pool"

The type of the resource.

</summary>

One of the following:

"load\_balancer"

<a href="#">Link to this property</a>

"monitor"

<a href="#">Link to this property</a>

"pool"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results on the current page.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

Total number of pages available.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.searches%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Search Resources

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/search \
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
  "result": {
    "resources": [
      {
        "reference_type": "referral",
        "references": [
          {
            "reference_type": "referrer",
            "resource_id": "699d98642c564d2e855e9661899b7252",
            "resource_name": "www.example.com",
            "resource_type": "load_balancer"
          },
          {
            "reference_type": "referral",
            "resource_id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
            "resource_name": "Login page monitor",
            "resource_type": "monitor"
          }
        ],
        "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
        "resource_name": "primary-dc-1",
        "resource_type": "pool"
      }
    ]
  },
  "success": true,
  "result_info": {
    "count": 20,
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
  "result": {
    "resources": [
      {
        "reference_type": "referral",
        "references": [
          {
            "reference_type": "referrer",
            "resource_id": "699d98642c564d2e855e9661899b7252",
            "resource_name": "www.example.com",
            "resource_type": "load_balancer"
          },
          {
            "reference_type": "referral",
            "resource_id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
            "resource_name": "Login page monitor",
            "resource_type": "monitor"
          }
        ],
        "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
        "resource_name": "primary-dc-1",
        "resource_type": "pool"
      }
    ]
  },
  "success": true,
  "result_info": {
    "count": 20,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```