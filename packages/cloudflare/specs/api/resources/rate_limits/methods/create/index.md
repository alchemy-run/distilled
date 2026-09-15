---
title: Create a rate limit
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rate Limits](https://developers.cloudflare.com/api/resources/rate_limits)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a rate limit

Deprecated: Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.

POST/zones/{zone\_id}/rate\_limits

**Deprecated**: This endpoint returns 410 Gone. Please use the Rulesets API instead.

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

`Firewall Services Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

action: object {mode, response, timeout }

The action to perform when the threshold of matched traffic within the configured period is exceeded.

</summary>

<details>

<summary>

mode: optional "simulate"or "ban"or "challenge"or 2 more

The action to perform.

</summary>

One of the following:

"simulate"

<a href="#">Link to this property</a>

"ban"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

"js\_challenge"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {body, content\_type }

A custom content type and reponse to return when the threshold is exceeded. The custom response configured in this object will override the custom error for the zone. This object is optional. Notes: If you omit this object, Cloudflare will use the default HTML error page. If “mode” is “challenge”, “managed\_challenge”, or “js\_challenge”, Cloudflare will use the zone challenge pages and you should not provide the “response” object.

</summary>

body: optional string

The response body to return. The value must conform to the configured content type.

maxLength10240

<a href="#">Link to this property</a>

content\_type: optional string

The content type of the body. Must be one of the following: <code>text/plain</code>, <code>text/xml</code>, or <code>application/json</code>.

maxLength50

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timeout: optional number

The time in seconds during which Cloudflare will perform the mitigation action. Must be an integer value greater than or equal to the period. Notes: If “mode” is “challenge”, “managed\_challenge”, or “js\_challenge”, Cloudflare will use the zone’s Challenge Passage time and you should not provide this value.

maximum86400

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20action%20%3E%20(schema)>)

<details>

<summary>

match: object {headers, request, response }

Determines which traffic the rate limit counts towards the threshold.

</summary>

<details>

<summary>

headers: optional array of object {name, op, value }

</summary>

name: optional string

The name of the response header to match.

<a href="#">Link to this property</a>

<details>

<summary>

op: optional "eq"or "ne"

The operator used when matching: <code>eq</code> means “equal” and <code>ne</code> means “not equal”.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"ne"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

The value of the response header, which must match exactly.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {methods, schemes, url }

</summary>

<details>

<summary>

methods: optional array of "GET"or "POST"or "PUT"or 4 more

The HTTP methods to match. You can specify a subset (for example, <code>['POST','PUT']</code>) or all methods (<code>['_ALL_']</code>). This field is optional when creating a rate limit.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"POST"

<a href="#">Link to this property</a>

"PUT"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

"PATCH"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

"\_ALL\_"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

schemes: optional array of string

The HTTP schemes to match. You can specify one scheme (<code>['HTTPS']</code>), both schemes (<code>['HTTP','HTTPS']</code>), or all schemes (<code>['_ALL_']</code>). This field is optional.

<a href="#">Link to this property</a>

url: optional string

The URL pattern to match, composed of a host and a path such as <code>example.org/path*</code>. Normalization is applied before the pattern is matched. <code>*</code> wildcards are expanded to match applicable traffic. Query strings are not matched. Set the value to <code>*</code> to match all traffic to your zone.

maxLength1024

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {origin\_traffic }

</summary>

origin\_traffic: optional boolean

When true, only the uncached traffic served from your origin servers will count towards rate limiting. In this case, any cached traffic served by Cloudflare will not count towards rate limiting. This field is optional. Notes: This field is deprecated. Instead, use response headers and set “origin\_traffic” to “false” to avoid legacy behaviour interacting with the “response\_headers” property.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20match%20%3E%20(schema)>)

period: number

The time in seconds (an integer value) to count matching traffic. If the count exceeds the configured threshold within this period, Cloudflare will perform the configured action.

maximum86400

minimum10

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20period%20%3E%20(schema)>)

threshold: number

The threshold that will trigger the configured mitigation action. Configure this value along with the `period` property to establish a threshold per period.

minimum1

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20threshold%20%3E%20(schema)>)

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

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/rate_limits#(resource)%20rate_limits%20%3E%20(model)%20rate_limit%20%3E%20(schema)">RateLimit</a> { id, action, bypass, 5 more }

</summary>

id: optional string

The unique identifier of the rate limit.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: optional object {mode, response, timeout }

The action to perform when the threshold of matched traffic within the configured period is exceeded.

</summary>

<details>

<summary>

mode: optional "simulate"or "ban"or "challenge"or 2 more

The action to perform.

</summary>

One of the following:

"simulate"

<a href="#">Link to this property</a>

"ban"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

"js\_challenge"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {body, content\_type }

A custom content type and reponse to return when the threshold is exceeded. The custom response configured in this object will override the custom error for the zone. This object is optional. Notes: If you omit this object, Cloudflare will use the default HTML error page. If “mode” is “challenge”, “managed\_challenge”, or “js\_challenge”, Cloudflare will use the zone challenge pages and you should not provide the “response” object.

</summary>

body: optional string

The response body to return. The value must conform to the configured content type.

maxLength10240

<a href="#">Link to this property</a>

content\_type: optional string

The content type of the body. Must be one of the following: <code>text/plain</code>, <code>text/xml</code>, or <code>application/json</code>.

maxLength50

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timeout: optional number

The time in seconds during which Cloudflare will perform the mitigation action. Must be an integer value greater than or equal to the period. Notes: If “mode” is “challenge”, “managed\_challenge”, or “js\_challenge”, Cloudflare will use the zone’s Challenge Passage time and you should not provide this value.

maximum86400

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bypass: optional array of object {name, value }

Criteria specifying when the current rate limit should be bypassed. You can specify that the rate limit should not apply to one or more URLs.

</summary>

name: optional "url"

<a href="#">Link to this property</a>

value: optional string

The URL to bypass.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

An informative summary of the rule. This value is sanitized and any tags will be removed.

maxLength1024

<a href="#">Link to this property</a>

disabled: optional boolean

When true, indicates that the rate limit is currently disabled.

<a href="#">Link to this property</a>

<details>

<summary>

match: optional object {headers, request, response }

Determines which traffic the rate limit counts towards the threshold.

</summary>

<details>

<summary>

headers: optional array of object {name, op, value }

</summary>

name: optional string

The name of the response header to match.

<a href="#">Link to this property</a>

<details>

<summary>

op: optional "eq"or "ne"

The operator used when matching: <code>eq</code> means “equal” and <code>ne</code> means “not equal”.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"ne"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

The value of the response header, which must match exactly.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {methods, schemes, url }

</summary>

<details>

<summary>

methods: optional array of "GET"or "POST"or "PUT"or 4 more

The HTTP methods to match. You can specify a subset (for example, <code>['POST','PUT']</code>) or all methods (<code>['_ALL_']</code>). This field is optional when creating a rate limit.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"POST"

<a href="#">Link to this property</a>

"PUT"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

"PATCH"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

"\_ALL\_"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

schemes: optional array of string

The HTTP schemes to match. You can specify one scheme (<code>['HTTPS']</code>), both schemes (<code>['HTTP','HTTPS']</code>), or all schemes (<code>['_ALL_']</code>). This field is optional.

<a href="#">Link to this property</a>

url: optional string

The URL pattern to match, composed of a host and a path such as <code>example.org/path*</code>. Normalization is applied before the pattern is matched. <code>*</code> wildcards are expanded to match applicable traffic. Query strings are not matched. Set the value to <code>*</code> to match all traffic to your zone.

maxLength1024

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {origin\_traffic }

</summary>

origin\_traffic: optional boolean

When true, only the uncached traffic served from your origin servers will count towards rate limiting. In this case, any cached traffic served by Cloudflare will not count towards rate limiting. This field is optional. Notes: This field is deprecated. Instead, use response headers and set “origin\_traffic” to “false” to avoid legacy behaviour interacting with the “response\_headers” property.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

period: optional number

The time in seconds (an integer value) to count matching traffic. If the count exceeds the configured threshold within this period, Cloudflare will perform the configured action.

maximum86400

minimum10

<a href="#">Link to this property</a>

threshold: optional number

The threshold that will trigger the configured mitigation action. Configure this value along with the <code>period</code> property to establish a threshold per period.

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20rate_limits%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create a rate limit

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rate_limits \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": {},
          "match": {},
          "period": 900,
          "threshold": 60
        }'
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "action": {
      "mode": "challenge",
      "response": {
        "body": "<error>This request has been rate-limited.</error>",
        "content_type": "text/xml"
      },
      "timeout": 86400
    },
    "bypass": [
      {
        "name": "url",
        "value": "api.example.com/*"
      }
    ],
    "description": "Prevent multiple login failures to mitigate brute force attacks",
    "disabled": false,
    "match": {
      "headers": [
        {
          "name": "Cf-Cache-Status",
          "op": "ne",
          "value": "HIT"
        }
      ],
      "request": {
        "methods": [
          "GET",
          "POST"
        ],
        "schemes": [
          "HTTP",
          "HTTPS"
        ],
        "url": "*.example.org/path*"
      },
      "response": {
        "origin_traffic": true
      }
    },
    "period": 900,
    "threshold": 60
  },
  "success": true
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "action": {
      "mode": "challenge",
      "response": {
        "body": "<error>This request has been rate-limited.</error>",
        "content_type": "text/xml"
      },
      "timeout": 86400
    },
    "bypass": [
      {
        "name": "url",
        "value": "api.example.com/*"
      }
    ],
    "description": "Prevent multiple login failures to mitigate brute force attacks",
    "disabled": false,
    "match": {
      "headers": [
        {
          "name": "Cf-Cache-Status",
          "op": "ne",
          "value": "HIT"
        }
      ],
      "request": {
        "methods": [
          "GET",
          "POST"
        ],
        "schemes": [
          "HTTP",
          "HTTPS"
        ],
        "url": "*.example.org/path*"
      },
      "response": {
        "origin_traffic": true
      }
    },
    "period": 900,
    "threshold": 60
  },
  "success": true
}
```