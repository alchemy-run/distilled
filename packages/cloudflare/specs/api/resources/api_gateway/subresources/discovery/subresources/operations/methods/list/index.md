---
title: List discovered web and API operations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Discovery](https://developers.cloudflare.com/api/resources/api_gateway/subresources/discovery)

[Operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/discovery/subresources/operations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List discovered web and API operations

GET/zones/{zone\_id}/api\_gateway/discovery/operations

Returns the latest web and API operations discovered from zone traffic.

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

`Account API Gateway``Account API Gateway Read``Domain API Gateway``Domain API Gateway Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

diff: optional boolean

When `true`, only return API Discovery results that are not saved into API Shield Endpoint Management

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20diff%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order results.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

endpoint: optional string

Filter results to only include endpoints containing this pattern.

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20endpoint%20%3E%20(schema)>)

host: optional array of string

Filter results to only include the specified hosts.

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20host%20%3E%20(schema)>)

method: optional array of string

Filter results to only include the specified HTTP methods.

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20method%20%3E%20(schema)>)

<details>

<summary>

order: optional "host"or "method"or "endpoint"or 2 more

Field to order by

</summary>

One of the following:

"host"

<a href="#">Link to this property</a>

"method"

<a href="#">Link to this property</a>

"endpoint"

<a href="#">Link to this property</a>

"traffic\_stats.requests"

<a href="#">Link to this property</a>

"traffic\_stats.last\_updated"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

<details>

<summary>

origin: optional "ML"or "SessionIdentifier"or "LabelDiscovery"

Filter results to only include discovery results sourced from a particular discovery engine

- <code>ML</code> - Discovered operations that were sourced using ML API Discovery
- <code>SessionIdentifier</code> - Discovered operations that were sourced using Session Identifier API Discovery

</summary>

One of the following:

"ML"

<a href="#">Link to this property</a>

"SessionIdentifier"

<a href="#">Link to this property</a>

"LabelDiscovery"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20origin%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Maximum number of results per page.

maximum50

minimum5

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

state: optional "review"or "saved"or "ignored"

Filter results to only include discovery results in a particular state. States are as follows

- <code>review</code> - Discovered operations that are not saved into API Shield Endpoint Management
- <code>saved</code> - Discovered operations that are already saved into API Shield Endpoint Management
- <code>ignored</code> - Discovered operations that have been marked as ignored

</summary>

One of the following:

"review"

<a href="#">Link to this property</a>

"saved"

<a href="#">Link to this property</a>

"ignored"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20state%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.discovery%20%3E%20(model)%20discovery_operation%20%3E%20(schema)">DiscoveryOperation</a> { id, endpoint, host, 5 more }

</summary>

id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

endpoint: string

The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: <a href="https://developers.cloudflare.com/rules/normalization/how-it-works/">https://developers.cloudflare.com/rules/normalization/how-it-works/</a>.

formaturi-template

maxLength4096

<a href="#">Link to this property</a>

host: string

RFC3986-compliant host.

formathostname

maxLength255

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

method: "GET"or "POST"or "HEAD"or 6 more

The HTTP method used to access the endpoint.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"POST"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

"OPTIONS"

<a href="#">Link to this property</a>

"PUT"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

"CONNECT"

<a href="#">Link to this property</a>

"PATCH"

<a href="#">Link to this property</a>

"TRACE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

origin: array of "ML"or "SessionIdentifier"or "LabelDiscovery"

API discovery engine(s) that discovered this operation

</summary>

One of the following:

"ML"

<a href="#">Link to this property</a>

"SessionIdentifier"

<a href="#">Link to this property</a>

"LabelDiscovery"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

state: "review"or "saved"or "ignored"

State of operation in API Discovery

- <code>review</code> - Operation is not saved into API Shield Endpoint Management
- <code>saved</code> - Operation is saved into API Shield Endpoint Management
- <code>ignored</code> - Operation is marked as ignored

</summary>

One of the following:

"review"

<a href="#">Link to this property</a>

"saved"

<a href="#">Link to this property</a>

"ignored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

features: optional object {traffic\_stats }

</summary>

<details>

<summary>

traffic\_stats: optional object {last\_updated, period\_seconds, requests }

</summary>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

period\_seconds: number

The period in seconds these statistics were computed over

<a href="#">Link to this property</a>

requests: number

The average number of requests seen during this period

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List discovered web and API operations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/discovery/operations \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "origin": [
        "ML"
      ],
      "state": "review",
      "features": {
        "traffic_stats": {
          "last_updated": "2014-01-01T05:20:00.12345Z",
          "period_seconds": 3600,
          "requests": 1987.06
        }
      }
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "origin": [
        "ML"
      ],
      "state": "review",
      "features": {
        "traffic_stats": {
          "last_updated": "2014-01-01T05:20:00.12345Z",
          "period_seconds": 3600,
          "requests": 1987.06
        }
      }
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