---
title: Get details and aggregate metrics for an http test
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[HTTP Tests](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/http_tests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get details and aggregate metrics for an http test

GET/accounts/{account\_id}/dex/http-tests/{test\_id}

Get test details and aggregate performance metrics for an http test for a given time period between 1 hour and 7 days.

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

`Cloudflare DEX Write``Cloudflare DEX Read``Zero Trust Report``Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

test\_id: string

API Resource UUID tag.

maxLength36

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20test_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

from: string

Start time for aggregate metrics in ISO ms.

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

<details>

<summary>

interval: "minute"or "hour"

Time interval for aggregate time slots.

</summary>

One of the following:

"minute"

<a href="#">Link to this property</a>

"hour"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20interval%20%3E%20(schema)>)

to: string

End time for aggregate metrics in ISO ms.

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

colo: optional string

Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20colo%20%3E%20(schema)>)

deviceId: optional array of string

Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20deviceId%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests%20%3E%20(model)%20http_details%20%3E%20(schema)">HTTPDetails</a> { host, httpStats, httpStatsByColo, 6 more }

</summary>

host: optional string

The url of the HTTP synthetic application test.

<a href="#">Link to this property</a>

<details>

<summary>

httpStats: optional object {availabilityPct, dnsResponseTimeMs, httpStatusCode, 3 more }

</summary>

<details>

<summary>

availabilityPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dnsResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

httpStatusCode: array of object {status200, status300, status400, 2 more }

</summary>

status200: number

<a href="#">Link to this property</a>

status300: number

<a href="#">Link to this property</a>

status400: number

<a href="#">Link to this property</a>

status500: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resourceFetchTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

serverResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uniqueDevicesTotal: number

Count of unique devices that have run this test in the given time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

httpStatsByColo: optional array of object {availabilityPct, colo, dnsResponseTimeMs, 4 more }

</summary>

<details>

<summary>

availabilityPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

colo: string

<a href="#">Link to this property</a>

<details>

<summary>

dnsResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

httpStatusCode: array of object {status200, status300, status400, 2 more }

</summary>

status200: number

<a href="#">Link to this property</a>

status300: number

<a href="#">Link to this property</a>

status400: number

<a href="#">Link to this property</a>

status500: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resourceFetchTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

serverResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uniqueDevicesTotal: number

Count of unique devices that have run this test in the given time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

The interval at which the HTTP synthetic application test is set to run.

<a href="#">Link to this property</a>

kind: optional "http"

<a href="#">Link to this property</a>

method: optional string

The HTTP method to use when running the test.

<a href="#">Link to this property</a>

name: optional string

The name of the HTTP synthetic application test.

<a href="#">Link to this property</a>

<details>

<summary>

target\_policies: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20digital_experience_monitor%20%3E%20(schema)">DigitalExperienceMonitor</a> { id, default, name }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

default: boolean

Whether the policy is the default for the account.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

targeted: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get details and aggregate metrics for an http test

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/http-tests/$TEST_ID \
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
  "result": {
    "host": "http://example.com",
    "httpStats": {
      "availabilityPct": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "dnsResponseTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "httpStatusCode": [
        {
          "status200": 0,
          "status300": 0,
          "status400": 0,
          "status500": 0,
          "timestamp": "2023-07-16 15:00:00+00"
        }
      ],
      "resourceFetchTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "serverResponseTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "uniqueDevicesTotal": 57
    },
    "httpStatsByColo": [
      {
        "availabilityPct": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "colo": "DFW",
        "dnsResponseTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "httpStatusCode": [
          {
            "status200": 0,
            "status300": 0,
            "status400": 0,
            "status500": 0,
            "timestamp": "2023-07-16 15:00:00+00"
          }
        ],
        "resourceFetchTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "serverResponseTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "uniqueDevicesTotal": 57
      }
    ],
    "interval": "0h5m0s",
    "kind": "http",
    "method": "GET",
    "name": "Atlassian Sign In Page",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true
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
    "host": "http://example.com",
    "httpStats": {
      "availabilityPct": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "dnsResponseTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "httpStatusCode": [
        {
          "status200": 0,
          "status300": 0,
          "status400": 0,
          "status500": 0,
          "timestamp": "2023-07-16 15:00:00+00"
        }
      ],
      "resourceFetchTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "serverResponseTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "uniqueDevicesTotal": 57
    },
    "httpStatsByColo": [
      {
        "availabilityPct": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "colo": "DFW",
        "dnsResponseTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "httpStatusCode": [
          {
            "status200": 0,
            "status300": 0,
            "status400": 0,
            "status500": 0,
            "timestamp": "2023-07-16 15:00:00+00"
          }
        ],
        "resourceFetchTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "serverResponseTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "uniqueDevicesTotal": 57
      }
    ],
    "interval": "0h5m0s",
    "kind": "http",
    "method": "GET",
    "name": "Atlassian Sign In Page",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true
  }
}
```