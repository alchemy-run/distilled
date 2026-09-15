---
title: Search Workers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Search Workers

GET/accounts/{account\_id}/workers/scripts-search

Search for Workers in an account.

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

`Workers Tail Read``Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional string

Worker ID (also called tag) to search for. Only exact matches are returned.

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

name: optional string

Worker name to search for. Both exact and partial matches are returned.

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

order\_by: optional "created\_on"or "modified\_on"or "name"

Property to sort results by. Results are sorted in ascending order.

</summary>

One of the following:

"created\_on"

<a href="#">Link to this property</a>

"modified\_on"

<a href="#">Link to this property</a>

"name"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

page: optional number

Current page.

minimum1

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Items per page.

maximum100

minimum1

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, created\_on, modified\_on, 4 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the script was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

When the script was last modified.

formatdate-time

<a href="#">Link to this property</a>

script\_name: string

Name of the script, used in URLs and route configuration.

<a href="#">Link to this property</a>

environment\_is\_default: optional boolean

Whether the environment is the default environment.

<a href="#">Link to this property</a>

environment\_name: optional string

Name of the environment.

<a href="#">Link to this property</a>

service\_name: optional string

Name of the service.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workers.scripts%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Search Workers

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts-search \
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2017-01-01T00:00:00Z",
      "modified_on": "2017-01-01T00:00:00Z",
      "script_name": "this-is_my_script-01",
      "environment_is_default": true,
      "environment_name": "production",
      "service_name": "my-service"
    }
  ],
  "success": true,
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2017-01-01T00:00:00Z",
      "modified_on": "2017-01-01T00:00:00Z",
      "script_name": "this-is_my_script-01",
      "environment_is_default": true,
      "environment_name": "production",
      "service_name": "my-service"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```