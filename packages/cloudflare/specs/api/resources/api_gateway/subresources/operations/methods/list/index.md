---
title: List web and API operations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List web and API operations

GET/zones/{zone\_id}/api\_gateway/operations

Lists web and API operations tracked for the zone, including each operation’s method, path, and feature configuration.

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

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

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

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

endpoint: optional string

Filter results to only include endpoints containing this pattern.

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20endpoint%20%3E%20(schema)>)

<details>

<summary>

feature: optional array of "thresholds"or "parameter\_schemas"or "schema\_info"or "confidence\_intervals"

Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the specific meaning.

</summary>

One of the following:

"thresholds"

<a href="#">Link to this property</a>

"parameter\_schemas"

<a href="#">Link to this property</a>

"schema\_info"

<a href="#">Link to this property</a>

"confidence\_intervals"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20feature%20%3E%20(schema)>)

host: optional array of string

Filter results to only include the specified hosts.

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20host%20%3E%20(schema)>)

method: optional array of string

Filter results to only include the specified HTTP methods.

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20method%20%3E%20(schema)>)

<details>

<summary>

order: optional "method"or "host"or "endpoint"or "thresholds.$key"

Field to order by. When requesting a feature, the feature keys are available for ordering as well, e.g., <code>thresholds.suggested_threshold</code>.

</summary>

One of the following:

"method"

<a href="#">Link to this property</a>

"host"

<a href="#">Link to this property</a>

"endpoint"

<a href="#">Link to this property</a>

"thresholds.$key"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Maximum number of results per page.

maximum50

minimum5

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {endpoint, host, last\_updated, 3 more }

</summary>

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

operation\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

<details>

<summary>

features: optional object {thresholds } or object {parameter\_schemas } or object {api\_routing } or 2 more

</summary>

One of the following:

<details>

<summary>

APIShieldOperationFeatureThresholds object {thresholds }

</summary>

<details>

<summary>

thresholds: optional object {auth\_id\_tokens, data\_points, last\_updated, 6 more }

</summary>

auth\_id\_tokens: optional number

The total number of auth-ids seen across this calculation.

<a href="#">Link to this property</a>

data\_points: optional number

The number of data points used for the threshold suggestion calculation.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

p50: optional number

The p50 quantile of requests (in period\_seconds).

<a href="#">Link to this property</a>

p90: optional number

The p90 quantile of requests (in period\_seconds).

<a href="#">Link to this property</a>

p99: optional number

The p99 quantile of requests (in period\_seconds).

<a href="#">Link to this property</a>

period\_seconds: optional number

The period over which this threshold is suggested.

<a href="#">Link to this property</a>

requests: optional number

The estimated number of requests covered by these calculations.

<a href="#">Link to this property</a>

suggested\_threshold: optional number

The suggested threshold in requests done by the same auth\_id or period\_seconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldOperationFeatureParameterSchemas object {parameter\_schemas }

</summary>

<details>

<summary>

parameter\_schemas: object {last\_updated, parameter\_schemas }

</summary>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

parameter\_schemas: optional object {parameters, responses }

An operation schema object containing a response.

</summary>

parameters: optional array of unknown

An array containing the learned parameter schemas.

<a href="#">Link to this property</a>

responses: optional unknown

An empty response object. This field is required to yield a valid operation schema.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldOperationFeatureAPIRouting object {api\_routing }

</summary>

<details>

<summary>

api\_routing: optional object {last\_updated, route }

API Routing settings on endpoint.

</summary>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

route: optional string

Target route.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldOperationFeatureConfidenceIntervals object {confidence\_intervals }

</summary>

<details>

<summary>

confidence\_intervals: optional object {last\_updated, suggested\_threshold }

</summary>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

suggested\_threshold: optional object {confidence\_intervals, mean }

</summary>

<details>

<summary>

confidence\_intervals: optional object {p90, p95, p99 }

</summary>

<details>

<summary>

p90: optional object {lower, upper }

Upper and lower bound for percentile estimate

</summary>

lower: optional number

Lower bound for percentile estimate

<a href="#">Link to this property</a>

upper: optional number

Upper bound for percentile estimate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

p95: optional object {lower, upper }

Upper and lower bound for percentile estimate

</summary>

lower: optional number

Lower bound for percentile estimate

<a href="#">Link to this property</a>

upper: optional number

Upper bound for percentile estimate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

p99: optional object {lower, upper }

Upper and lower bound for percentile estimate

</summary>

lower: optional number

Lower bound for percentile estimate

<a href="#">Link to this property</a>

upper: optional number

Upper bound for percentile estimate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mean: optional number

Suggested threshold.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldOperationFeatureSchemaInfo object {schema\_info }

</summary>

<details>

<summary>

schema\_info: optional object {active\_schema, mitigation\_action }

</summary>

<details>

<summary>

active\_schema: optional object {id, created\_at, name }

Schema active on endpoint.

</summary>

id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Schema file name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mitigation\_action: optional "none"or "log"or "block"

Action taken on requests failing validation.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20api_gateway.operations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List web and API operations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations \
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
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "features": {
        "api_routing": {
          "last_updated": "2014-01-01T05:20:00.12345Z",
          "route": "https://api.example.com/api/service"
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
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "features": {
        "api_routing": {
          "last_updated": "2014-01-01T05:20:00.12345Z",
          "route": "https://api.example.com/api/service"
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