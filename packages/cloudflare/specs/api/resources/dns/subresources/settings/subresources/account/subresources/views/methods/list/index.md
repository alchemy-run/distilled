---
title: List Internal DNS Views
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings)

[Account](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account)

[Views](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Internal DNS Views

GET/accounts/{account\_id}/dns\_settings/views

List DNS Internal Views for an Account

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

`DNS View Write``DNS View Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order DNS views in.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

<details>

<summary>

match: optional "any"or "all"

Whether to match all search requirements or at least one (any). If set to <code>all</code>, acts like a logical AND between filters. If set to <code>any</code>, acts like a logical OR instead.

</summary>

One of the following:

"any"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20match%20%3E%20(schema)>)

<details>

<summary>

name: optional object {contains, endswith, exact, startswith }

</summary>

contains: optional string

Substring of the DNS view name.

<a href="#">Link to this property</a>

endswith: optional string

Suffix of the DNS view name.

<a href="#">Link to this property</a>

exact: optional string

Exact value of the DNS view name.

<a href="#">Link to this property</a>

startswith: optional string

Prefix of the DNS view name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

order: optional "name"or "created\_on"or "modified\_on"

Field to order DNS views by.

</summary>

One of the following:

"name"

<a href="#">Link to this property</a>

"created\_on"

<a href="#">Link to this property</a>

"modified\_on"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of DNS views per page.

maximum5000000

minimum1

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

zone\_id: optional string

A zone ID that exists in the zones list for the view.

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

zone\_name: optional string

A zone name that exists in the zones list for the view.

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_name%20%3E%20(schema)>)

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

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Internal DNS Views

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_time": "2014-01-01T05:20:00.12345Z",
      "modified_time": "2014-01-01T05:20:00.12345Z",
      "name": "my view",
      "zones": [
        "372e67954025e0ba6aaa6d586b9e0b59"
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_time": "2014-01-01T05:20:00.12345Z",
      "modified_time": "2014-01-01T05:20:00.12345Z",
      "name": "my view",
      "zones": [
        "372e67954025e0ba6aaa6d586b9e0b59"
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