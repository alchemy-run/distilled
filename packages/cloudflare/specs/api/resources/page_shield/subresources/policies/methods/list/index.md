---
title: List content security rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

[Policies](https://developers.cloudflare.com/api/resources/page_shield/subresources/policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List content security rules

GET/zones/{zone\_id}/page\_shield/policies

Lists content security rules configured for the zone.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Page Shield``Domain Page Shield Read``Domain Page Shield``Page Shield Read``Zone Settings Write``Zone Settings Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, action, description, 3 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: "allow"or "log"or "add\_reporting\_directives"

The action to take if the expression matches

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"add\_reporting\_directives"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A description for the policy

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled

<a href="#">Link to this property</a>

expression: string

The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

<a href="#">Link to this property</a>

value: string

The policy which will be applied

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, per\_page, 2 more }

</summary>

count: number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: number

Total results available without any search parameters

<a href="#">Link to this property</a>

total\_pages: number

Total number of pages

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: true

Whether the API call was successful

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield.policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### List content security rules

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "action": "allow",
      "description": "Checkout page CSP policy",
      "enabled": true,
      "expression": "ends_with(http.request.uri.path, \"/checkout\")",
      "value": "script-src 'none';"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  },
  "success": true,
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
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "action": "allow",
      "description": "Checkout page CSP policy",
      "enabled": true,
      "expression": "ends_with(http.request.uri.path, \"/checkout\")",
      "value": "script-src 'none';"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  },
  "success": true,
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
  ]
}
```