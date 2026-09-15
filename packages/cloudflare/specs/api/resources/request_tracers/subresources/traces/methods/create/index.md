---
title: Request Trace
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rules Trace](https://developers.cloudflare.com/api/resources/request_tracers)

[Traces](https://developers.cloudflare.com/api/resources/request_tracers/subresources/traces)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Request Trace

POST/accounts/{account\_id}/request-tracer/trace

Traces a simulated HTTP request through Cloudflare’s edge to analyze how rules, settings, and configurations would process the request. Useful for debugging firewall rules, page rules, and other request transformations without sending actual traffic. Supports custom headers, cookies, body content, and geolocation context.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Allow Request Tracer Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

method: string

HTTP Method of tracing request

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20method%20%3E%20(schema)>)

url: string

URL to which perform tracing request

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

<details>

<summary>

body: optional object {base64, json, plain\_text }

</summary>

base64: optional string

Base64 encoded request body

<a href="#">Link to this property</a>

json: optional unknown

Arbitrary json as request body

<a href="#">Link to this property</a>

plain\_text: optional string

Request body as plain text

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

<details>

<summary>

context: optional object {bot\_score, geoloc, skip\_challenge, threat\_score }

Additional request parameters

</summary>

bot\_score: optional number

Bot score used for evaluating tracing request processing

<a href="#">Link to this property</a>

<details>

<summary>

geoloc: optional object {city, continent, is\_eu\_country, 7 more }

Geodata for tracing request

</summary>

city: optional string

<a href="#">Link to this property</a>

continent: optional string

<a href="#">Link to this property</a>

is\_eu\_country: optional boolean

<a href="#">Link to this property</a>

iso\_code: optional string

<a href="#">Link to this property</a>

latitude: optional number

<a href="#">Link to this property</a>

longitude: optional number

<a href="#">Link to this property</a>

postal\_code: optional string

<a href="#">Link to this property</a>

region\_code: optional string

<a href="#">Link to this property</a>

subdivision\_2\_iso\_code: optional string

<a href="#">Link to this property</a>

timezone: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

skip\_challenge: optional boolean

Whether to skip any challenges for tracing request (e.g.: captcha)

<a href="#">Link to this property</a>

threat\_score: optional number

Threat score used for evaluating tracing request processing

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20context%20%3E%20(schema)>)

cookies: optional map\[string]

Cookies added to tracing request

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20cookies%20%3E%20(schema)>)

headers: optional map\[string]

Headers added to tracing request

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20headers%20%3E%20(schema)>)

protocol: optional string

HTTP Protocol of tracing request

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20protocol%20%3E%20(schema)>)

skip\_response: optional boolean

Skip sending the request to the Origin server after all rules evaluation

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20skip_response%20%3E%20(schema)>)

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

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {status\_code, trace }

Trace result with an origin status code

</summary>

status\_code: optional number

HTTP Status code of zone response

<a href="#">Link to this property</a>

trace: optional <a href="https://developers.cloudflare.com/api/resources/request_tracers#(resource)%20request_tracers.traces%20%3E%20(model)%20trace%20%3E%20(schema)">Trace</a>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20request_tracers.traces%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Request Trace

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/request-tracer/trace \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "method": "PUT",
          "url": "https://some.zone/some_path",
          "cookies": {
            "cookie_name_1": "cookie_value_1",
            "cookie_name_2": "cookie_value_2"
          },
          "headers": {
            "header_name_1": "header_value_1",
            "header_name_2": "header_value_2"
          },
          "protocol": "HTTP/1.1"
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
  "success": true,
  "result": {
    "status_code": 0,
    "trace": [
      {
        "action": "execute",
        "action_parameters": {
          "id": "4814384a9e5d4991b9815dcfc25d2f1f"
        },
        "description": "some rule",
        "expression": "ip.src ne 1.1.1.1",
        "kind": "zone",
        "matched": true,
        "name": "some ruleset name",
        "step_name": "rule_id01",
        "type": "rule"
      }
    ]
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
  "result": {
    "status_code": 0,
    "trace": [
      {
        "action": "execute",
        "action_parameters": {
          "id": "4814384a9e5d4991b9815dcfc25d2f1f"
        },
        "description": "some rule",
        "expression": "ip.src ne 1.1.1.1",
        "kind": "zone",
        "matched": true,
        "name": "some ruleset name",
        "step_name": "rule_id01",
        "type": "rule"
      }
    ]
  }
}
```