---
title: Patch Monitor
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

[Monitors](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Patch Monitor

PATCH/accounts/{account\_id}/load\_balancers/monitors/{monitor\_id}

Apply changes to an existing monitor, overwriting the supplied properties.

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

`Load Balancing: Monitors and Pools Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

monitor\_id: string

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20monitor_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

allow\_insecure: optional boolean

Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20allow_insecure%20%3E%20(schema)>)

consecutive\_down: optional number

To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20consecutive_down%20%3E%20(schema)>)

consecutive\_up: optional number

To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20consecutive_up%20%3E%20(schema)>)

description: optional string

Object description.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

expected\_body: optional string

A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20expected_body%20%3E%20(schema)>)

expected\_codes: optional string

The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20expected_codes%20%3E%20(schema)>)

follow\_redirects: optional boolean

Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20follow_redirects%20%3E%20(schema)>)

header: optional map\[array of string]

The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20header%20%3E%20(schema)>)

interval: optional number

The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20interval%20%3E%20(schema)>)

method: optional string

The method to use for the health check. This defaults to ‘GET’ for HTTP/HTTPS based checks and ‘connection\_established’ for TCP based health checks.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20method%20%3E%20(schema)>)

path: optional string

The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20path%20%3E%20(schema)>)

port: optional number

The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20port%20%3E%20(schema)>)

probe\_zone: optional string

Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20probe_zone%20%3E%20(schema)>)

retries: optional number

The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20retries%20%3E%20(schema)>)

timeout: optional number

The timeout (in seconds) before marking the health check as failed.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20timeout%20%3E%20(schema)>)

<details>

<summary>

type: optional "http"or "https"or "tcp"or 3 more

The protocol to use for the health check. Currently supported protocols are ‘HTTP’,‘HTTPS’, ‘TCP’, ‘ICMP-PING’, ‘UDP-ICMP’, and ‘SMTP’.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

"tcp"

<a href="#">Link to this property</a>

"udp\_icmp"

<a href="#">Link to this property</a>

"icmp\_ping"

<a href="#">Link to this property</a>

"smtp"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers.monitors%20%3E%20(model)%20monitor%20%3E%20(schema)">Monitor</a> { id, allow\_insecure, consecutive\_down, 16 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

allow\_insecure: optional boolean

Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

consecutive\_down: optional number

To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

<a href="#">Link to this property</a>

consecutive\_up: optional number

To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

<a href="#">Link to this property</a>

created\_on: optional string

<a href="#">Link to this property</a>

description: optional string

Object description.

<a href="#">Link to this property</a>

expected\_body: optional string

A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

expected\_codes: optional string

The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

follow\_redirects: optional boolean

Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

header: optional map\[array of string]

The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

interval: optional number

The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.

<a href="#">Link to this property</a>

method: optional string

The method to use for the health check. This defaults to ‘GET’ for HTTP/HTTPS based checks and ‘connection\_established’ for TCP based health checks.

<a href="#">Link to this property</a>

modified\_on: optional string

<a href="#">Link to this property</a>

path: optional string

The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

port: optional number

The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).

<a href="#">Link to this property</a>

probe\_zone: optional string

Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

retries: optional number

The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

<a href="#">Link to this property</a>

timeout: optional number

The timeout (in seconds) before marking the health check as failed.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "http"or "https"or "tcp"or 3 more

The protocol to use for the health check. Currently supported protocols are ‘HTTP’,‘HTTPS’, ‘TCP’, ‘ICMP-PING’, ‘UDP-ICMP’, and ‘SMTP’.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

"tcp"

<a href="#">Link to this property</a>

"udp\_icmp"

<a href="#">Link to this property</a>

"icmp\_ping"

<a href="#">Link to this property</a>

"smtp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20load_balancers.monitors%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Patch Monitor

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allow_insecure": true,
          "description": "Login page monitor",
          "expected_body": "alive",
          "expected_codes": "2xx",
          "follow_redirects": true,
          "header": {
            "Host": [
              "example.com"
            ],
            "X-App-ID": [
              "abc123"
            ]
          },
          "method": "GET",
          "path": "/health",
          "probe_zone": "example.com",
          "type": "https"
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Login page monitor",
    "expected_body": "alive",
    "expected_codes": "2xx",
    "follow_redirects": true,
    "header": {
      "Host": [
        "example.com"
      ],
      "X-App-ID": [
        "abc123"
      ]
    },
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Login page monitor",
    "expected_body": "alive",
    "expected_codes": "2xx",
    "follow_redirects": true,
    "header": {
      "Host": [
        "example.com"
      ],
      "X-App-ID": [
        "abc123"
      ]
    },
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```