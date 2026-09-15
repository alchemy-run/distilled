---
title: Create Preview Health Check
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Healthchecks](https://developers.cloudflare.com/api/resources/healthchecks)

[Previews](https://developers.cloudflare.com/api/resources/healthchecks/subresources/previews)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Preview Health Check

POST/zones/{zone\_id}/healthchecks/preview

Create a new preview health check.

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

`Health Checks Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier

maxLength32

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

address: string

The hostname or IP address of the origin server to run health checks on.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20address%20%3E%20(schema)>)

name: string

A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

check\_regions: optional array of <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20check_region%20%3E%20(schema)">CheckRegion</a>

A list of regions from which to run health checks. Null means Cloudflare will pick a default region.

</summary>

One of the following:

"WNAM"

<a href="#">Link to this property</a>

"ENAM"

<a href="#">Link to this property</a>

"WEU"

<a href="#">Link to this property</a>

"EEU"

<a href="#">Link to this property</a>

"NSAM"

<a href="#">Link to this property</a>

"SSAM"

<a href="#">Link to this property</a>

"OC"

<a href="#">Link to this property</a>

"ME"

<a href="#">Link to this property</a>

"NAF"

<a href="#">Link to this property</a>

"SAF"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"SEAS"

<a href="#">Link to this property</a>

"NEAS"

<a href="#">Link to this property</a>

"ALL\_REGIONS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20check_regions%20%3E%20(schema)>)

consecutive\_fails: optional number

The number of consecutive fails required from a health check before changing the health to unhealthy.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20consecutive_fails%20%3E%20(schema)>)

consecutive\_successes: optional number

The number of consecutive successes required from a health check before changing the health to healthy.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20consecutive_successes%20%3E%20(schema)>)

description: optional string

A human-readable description of the health check.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

<details>

<summary>

http\_config: optional <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20http_configuration%20%3E%20(schema)">HTTPConfiguration</a> { allow\_insecure, expected\_body, expected\_codes, 5 more }

Parameters specific to an HTTP or HTTPS health check.

</summary>

allow\_insecure: optional boolean

Do not validate the certificate when the health check uses HTTPS.

<a href="#">Link to this property</a>

expected\_body: optional string

A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.

<a href="#">Link to this property</a>

expected\_codes: optional array of string

The expected HTTP response codes (e.g. “200”) or code ranges (e.g. “2xx” for all codes starting with 2) of the health check.

<a href="#">Link to this property</a>

follow\_redirects: optional boolean

Follow redirects if the origin returns a 3xx status code.

<a href="#">Link to this property</a>

header: optional map\[array of string]

The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden.

<a href="#">Link to this property</a>

<details>

<summary>

method: optional "GET"or "HEAD"

The HTTP method to use for the health check.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

The endpoint path to health check against.

<a href="#">Link to this property</a>

port: optional number

Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20http_config%20%3E%20(schema)>)

interval: optional number

The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase load on the origin as we check from multiple locations.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20interval%20%3E%20(schema)>)

retries: optional number

The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20retries%20%3E%20(schema)>)

suspended: optional boolean

If suspended, no health checks are sent to the origin.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20suspended%20%3E%20(schema)>)

<details>

<summary>

tcp\_config: optional <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20tcp_configuration%20%3E%20(schema)">TCPConfiguration</a> { method, port }

Parameters specific to TCP health check.

</summary>

method: optional "connection\_established"

The TCP connection method to use for the health check.

<a href="#">Link to this property</a>

port: optional number

Port number to connect to for the health check. Defaults to 80.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20tcp_config%20%3E%20(schema)>)

timeout: optional number

The timeout (in seconds) before marking the health check as failed.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20timeout%20%3E%20(schema)>)

type: optional string

The protocol to use for the health check. Currently supported protocols are ‘HTTP’, ‘HTTPS’ and ‘TCP’.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20healthcheck%20%3E%20(schema)">Healthcheck</a> { id, address, check\_regions, 15 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

address: optional string

The hostname or IP address of the origin server to run health checks on.

<a href="#">Link to this property</a>

<details>

<summary>

check\_regions: optional array of <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20check_region%20%3E%20(schema)">CheckRegion</a>

A list of regions from which to run health checks. Null means Cloudflare will pick a default region.

</summary>

One of the following:

"WNAM"

<a href="#">Link to this property</a>

"ENAM"

<a href="#">Link to this property</a>

"WEU"

<a href="#">Link to this property</a>

"EEU"

<a href="#">Link to this property</a>

"NSAM"

<a href="#">Link to this property</a>

"SSAM"

<a href="#">Link to this property</a>

"OC"

<a href="#">Link to this property</a>

"ME"

<a href="#">Link to this property</a>

"NAF"

<a href="#">Link to this property</a>

"SAF"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"SEAS"

<a href="#">Link to this property</a>

"NEAS"

<a href="#">Link to this property</a>

"ALL\_REGIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

consecutive\_fails: optional number

The number of consecutive fails required from a health check before changing the health to unhealthy.

<a href="#">Link to this property</a>

consecutive\_successes: optional number

The number of consecutive successes required from a health check before changing the health to healthy.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

A human-readable description of the health check.

<a href="#">Link to this property</a>

failure\_reason: optional string

The current failure reason if status is unhealthy.

<a href="#">Link to this property</a>

<details>

<summary>

http\_config: optional <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20http_configuration%20%3E%20(schema)">HTTPConfiguration</a> { allow\_insecure, expected\_body, expected\_codes, 5 more }

Parameters specific to an HTTP or HTTPS health check.

</summary>

allow\_insecure: optional boolean

Do not validate the certificate when the health check uses HTTPS.

<a href="#">Link to this property</a>

expected\_body: optional string

A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.

<a href="#">Link to this property</a>

expected\_codes: optional array of string

The expected HTTP response codes (e.g. “200”) or code ranges (e.g. “2xx” for all codes starting with 2) of the health check.

<a href="#">Link to this property</a>

follow\_redirects: optional boolean

Follow redirects if the origin returns a 3xx status code.

<a href="#">Link to this property</a>

header: optional map\[array of string]

The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden.

<a href="#">Link to this property</a>

<details>

<summary>

method: optional "GET"or "HEAD"

The HTTP method to use for the health check.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

The endpoint path to health check against.

<a href="#">Link to this property</a>

port: optional number

Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional number

The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase load on the origin as we check from multiple locations.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.

<a href="#">Link to this property</a>

retries: optional number

The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "healthy"or "unhealthy"or "suspended"

The current status of the origin server according to the health check.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"unhealthy"

<a href="#">Link to this property</a>

"suspended"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suspended: optional boolean

If suspended, no health checks are sent to the origin.

<a href="#">Link to this property</a>

<details>

<summary>

tcp\_config: optional <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20tcp_configuration%20%3E%20(schema)">TCPConfiguration</a> { method, port }

Parameters specific to TCP health check.

</summary>

method: optional "connection\_established"

The TCP connection method to use for the health check.

<a href="#">Link to this property</a>

port: optional number

Port number to connect to for the health check. Defaults to 80.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timeout: optional number

The timeout (in seconds) before marking the health check as failed.

<a href="#">Link to this property</a>

type: optional string

The protocol to use for the health check. Currently supported protocols are ‘HTTP’, ‘HTTPS’ and ‘TCP’.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20healthchecks.previews%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create Preview Health Check

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/healthchecks/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "address": "www.example.com",
          "name": "server-1",
          "check_regions": [
            "WEU",
            "ENAM"
          ],
          "description": "Health check for www.example.com",
          "type": "HTTPS"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "address": "www.example.com",
    "check_regions": [
      "WEU",
      "ENAM"
    ],
    "consecutive_fails": 0,
    "consecutive_successes": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Health check for www.example.com",
    "failure_reason": "",
    "http_config": {
      "allow_insecure": true,
      "expected_body": "success",
      "expected_codes": [
        "2xx",
        "302"
      ],
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
      "port": 0
    },
    "interval": 0,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "server-1",
    "retries": 0,
    "status": "healthy",
    "suspended": true,
    "tcp_config": {
      "method": "connection_established",
      "port": 0
    },
    "timeout": 0,
    "type": "HTTPS"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "address": "www.example.com",
    "check_regions": [
      "WEU",
      "ENAM"
    ],
    "consecutive_fails": 0,
    "consecutive_successes": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Health check for www.example.com",
    "failure_reason": "",
    "http_config": {
      "allow_insecure": true,
      "expected_body": "success",
      "expected_codes": [
        "2xx",
        "302"
      ],
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
      "port": 0
    },
    "interval": 0,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "server-1",
    "retries": 0,
    "status": "healthy",
    "suspended": true,
    "tcp_config": {
      "method": "connection_established",
      "port": 0
    },
    "timeout": 0,
    "type": "HTTPS"
  },
  "success": true
}
```