---
title: List DEX test analytics
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Tests](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/tests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List DEX test analytics

GET/accounts/{account\_id}/dex/tests/overview

List DEX tests with overview metrics.

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

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

colo: optional string

Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20colo%20%3E%20(schema)>)

deviceId: optional array of string

Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20deviceId%20%3E%20(schema)>)

<details>

<summary>

kind: optional "http"or "traceroute"

Filter by test type.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"traceroute"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20kind%20%3E%20(schema)>)

page: optional number

Page number of paginated results

minimum1

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of items per page

maximum50

minimum1

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

registration\_id: optional string

Optionally filter results to a specific device registration. Must be used in combination with a single deviceId.

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20registration_id%20%3E%20(schema)>)

testName: optional string

Optionally filter results by test name.

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20testName%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20tests%20%3E%20(schema)">Tests</a> { overviewMetrics, tests }

</summary>

<details>

<summary>

overviewMetrics: object {testsTotal, avgHttpAvailabilityPct, avgTracerouteAvailabilityPct }

</summary>

testsTotal: number

number of tests.

<a href="#">Link to this property</a>

avgHttpAvailabilityPct: optional number

percentage availability for all HTTP test results in response.

formatfloat

<a href="#">Link to this property</a>

avgTracerouteAvailabilityPct: optional number

percentage availability for all traceroutes results in response.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tests: array of object {id, created, description, 13 more }

array of test results objects.

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created: string

date the test was created.

<a href="#">Link to this property</a>

description: string

the test description defined during configuration

<a href="#">Link to this property</a>

enabled: boolean

if true, then the test will run on targeted devices. Else, the test will not run.

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

interval: string

The interval at which the synthetic application test is set to run.

<a href="#">Link to this property</a>

<details>

<summary>

kind: "http"or "traceroute"

test type, http or traceroute

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"traceroute"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

name given to this test

<a href="#">Link to this property</a>

updated: string

<a href="#">Link to this property</a>

<details>

<summary>

httpResults: optional object {resourceFetchTime }

</summary>

<details>

<summary>

resourceFetchTime: object {history, avgMs, overTime }

</summary>

<details>

<summary>

history: array of object {timePeriod, avgMs, deltaPct }

</summary>

<details>

<summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

deltaPct: optional number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

overTime: optional object {timePeriod, values }

</summary>

<details>

<summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

values: array of object {avgMs, timestamp }

</summary>

avgMs: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

httpResultsByColo: optional array of object {colo, resourceFetchTime }

</summary>

colo: string

Cloudflare colo

<a href="#">Link to this property</a>

<details>

<summary>

resourceFetchTime: object {history, avgMs, overTime }

</summary>

<details>

<summary>

history: array of object {timePeriod, avgMs, deltaPct }

</summary>

<details>

<summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

deltaPct: optional number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

overTime: optional object {timePeriod, values }

</summary>

<details>

<summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

values: array of object {avgMs, timestamp }

</summary>

avgMs: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

method: optional string

for HTTP, the method to use when running the test

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

<details>

<summary>

tracerouteResults: optional object {roundTripTime }

</summary>

<details>

<summary>

roundTripTime: object {history, avgMs, overTime }

</summary>

<details>

<summary>

history: array of object {timePeriod, avgMs, deltaPct }

</summary>

<details>

<summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

deltaPct: optional number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

overTime: optional object {timePeriod, values }

</summary>

<details>

<summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

values: array of object {avgMs, timestamp }

</summary>

avgMs: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tracerouteResultsByColo: optional array of object {colo, roundTripTime }

</summary>

colo: string

Cloudflare colo

<a href="#">Link to this property</a>

<details>

<summary>

roundTripTime: object {history, avgMs, overTime }

</summary>

<details>

<summary>

history: array of object {timePeriod, avgMs, deltaPct }

</summary>

<details>

<summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

deltaPct: optional number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avgMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

overTime: optional object {timePeriod, values }

</summary>

<details>

<summary>

timePeriod: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.tests%20%3E%20(model)%20aggregate_time_period%20%3E%20(schema)">AggregateTimePeriod</a> { units, value }

</summary>

<details>

<summary>

units: "hours"or "days"or "testRuns"

</summary>

One of the following:

"hours"

<a href="#">Link to this property</a>

"days"

<a href="#">Link to this property</a>

"testRuns"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

values: array of object {avgMs, timestamp }

</summary>

avgMs: number

<a href="#">Link to this property</a>

timestamp: string

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.tests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List DEX test analytics

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/tests/overview \
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
    "overviewMetrics": {
      "testsTotal": 0,
      "avgHttpAvailabilityPct": 0,
      "avgTracerouteAvailabilityPct": 0
    },
    "tests": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "created": "created",
        "description": "description",
        "enabled": true,
        "host": "host",
        "interval": "interval",
        "kind": "http",
        "name": "name",
        "updated": "updated",
        "httpResults": {
          "resourceFetchTime": {
            "history": [
              {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "avgMs": 0,
                "deltaPct": 0
              }
            ],
            "avgMs": 0,
            "overTime": {
              "timePeriod": {
                "units": "hours",
                "value": 0
              },
              "values": [
                {
                  "avgMs": 0,
                  "timestamp": "timestamp"
                }
              ]
            }
          }
        },
        "httpResultsByColo": [
          {
            "colo": "SJC",
            "resourceFetchTime": {
              "history": [
                {
                  "timePeriod": {
                    "units": "hours",
                    "value": 0
                  },
                  "avgMs": 0,
                  "deltaPct": 0
                }
              ],
              "avgMs": 0,
              "overTime": {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "values": [
                  {
                    "avgMs": 0,
                    "timestamp": "timestamp"
                  }
                ]
              }
            }
          }
        ],
        "method": "method",
        "target_policies": [
          {
            "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
            "default": true,
            "name": "name"
          }
        ],
        "targeted": true,
        "tracerouteResults": {
          "roundTripTime": {
            "history": [
              {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "avgMs": 0,
                "deltaPct": 0
              }
            ],
            "avgMs": 0,
            "overTime": {
              "timePeriod": {
                "units": "hours",
                "value": 0
              },
              "values": [
                {
                  "avgMs": 0,
                  "timestamp": "timestamp"
                }
              ]
            }
          }
        },
        "tracerouteResultsByColo": [
          {
            "colo": "SJC",
            "roundTripTime": {
              "history": [
                {
                  "timePeriod": {
                    "units": "hours",
                    "value": 0
                  },
                  "avgMs": 0,
                  "deltaPct": 0
                }
              ],
              "avgMs": 0,
              "overTime": {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "values": [
                  {
                    "avgMs": 0,
                    "timestamp": "timestamp"
                  }
                ]
              }
            }
          }
        ]
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
    "overviewMetrics": {
      "testsTotal": 0,
      "avgHttpAvailabilityPct": 0,
      "avgTracerouteAvailabilityPct": 0
    },
    "tests": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "created": "created",
        "description": "description",
        "enabled": true,
        "host": "host",
        "interval": "interval",
        "kind": "http",
        "name": "name",
        "updated": "updated",
        "httpResults": {
          "resourceFetchTime": {
            "history": [
              {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "avgMs": 0,
                "deltaPct": 0
              }
            ],
            "avgMs": 0,
            "overTime": {
              "timePeriod": {
                "units": "hours",
                "value": 0
              },
              "values": [
                {
                  "avgMs": 0,
                  "timestamp": "timestamp"
                }
              ]
            }
          }
        },
        "httpResultsByColo": [
          {
            "colo": "SJC",
            "resourceFetchTime": {
              "history": [
                {
                  "timePeriod": {
                    "units": "hours",
                    "value": 0
                  },
                  "avgMs": 0,
                  "deltaPct": 0
                }
              ],
              "avgMs": 0,
              "overTime": {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "values": [
                  {
                    "avgMs": 0,
                    "timestamp": "timestamp"
                  }
                ]
              }
            }
          }
        ],
        "method": "method",
        "target_policies": [
          {
            "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
            "default": true,
            "name": "name"
          }
        ],
        "targeted": true,
        "tracerouteResults": {
          "roundTripTime": {
            "history": [
              {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "avgMs": 0,
                "deltaPct": 0
              }
            ],
            "avgMs": 0,
            "overTime": {
              "timePeriod": {
                "units": "hours",
                "value": 0
              },
              "values": [
                {
                  "avgMs": 0,
                  "timestamp": "timestamp"
                }
              ]
            }
          }
        },
        "tracerouteResultsByColo": [
          {
            "colo": "SJC",
            "roundTripTime": {
              "history": [
                {
                  "timePeriod": {
                    "units": "hours",
                    "value": 0
                  },
                  "avgMs": 0,
                  "deltaPct": 0
                }
              ],
              "avgMs": 0,
              "overTime": {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "values": [
                  {
                    "avgMs": 0,
                    "timestamp": "timestamp"
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```