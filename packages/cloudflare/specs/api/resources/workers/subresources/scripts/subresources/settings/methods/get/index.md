---
title: Get Script Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

[Settings](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Script Settings

GET/accounts/{account\_id}/workers/scripts/{script\_name}/script-settings

Get script-level settings when using [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions). Includes Logpush and Tail Consumers.

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

[Link to this property](#)%20workers.scripts.settings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

script\_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)%20workers.scripts.settings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers.scripts.settings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers.scripts.settings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers.scripts%20%3E%20(model)%20script_setting%20%3E%20(schema)">ScriptSetting</a> { logpush, observability, tags, tail\_consumers }

</summary>

logpush: optional boolean

Whether Logpush is turned on for the Worker.

<a href="#">Link to this property</a>

<details>

<summary>

observability: optional object {enabled, head\_sampling\_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: boolean

Whether observability is enabled for the Worker.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

<a href="#">Link to this property</a>

<details>

<summary>

logs: optional object {enabled, invocation\_logs, destinations, 2 more }

Log settings for the Worker.

</summary>

enabled: boolean

Whether logs are enabled for the Worker.

<a href="#">Link to this property</a>

invocation\_logs: boolean

Whether <a href="https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs">invocation logs</a> are enabled for the Worker.

<a href="#">Link to this property</a>

destinations: optional array of string

A list of destinations where logs will be exported to.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

<a href="#">Link to this property</a>

persist: optional boolean

Whether log persistence is enabled for the Worker.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

redact\_query\_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

<a href="#">Link to this property</a>

<details>

<summary>

traces: optional object {destinations, enabled, head\_sampling\_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether traces are enabled for the Worker.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

<a href="#">Link to this property</a>

persist: optional boolean

Whether trace persistence is enabled for the Worker.

<a href="#">Link to this property</a>

<details>

<summary>

propagation\_policy: optional "authenticated"or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

<a href="#">Link to this property</a>

"accept"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of string

Tags associated with the Worker.

<a href="#">Link to this property</a>

<details>

<summary>

tail\_consumers: optional array of <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers.scripts.tail%20%3E%20(model)%20consumer_script%20%3E%20(schema)">ConsumerScript</a> { service, environment, namespace }

List of Workers that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

<a href="#">Link to this property</a>

environment: optional string

Optional environment if the Worker utilizes one.

<a href="#">Link to this property</a>

namespace: optional string

Optional dispatch namespace the script belongs to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.settings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers.scripts.settings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Script Settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/script-settings \
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
  "result": {
    "logpush": false,
    "observability": {
      "enabled": true,
      "head_sampling_rate": 0.1,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "destinations": [
          "cloudflare"
        ],
        "head_sampling_rate": 0.1,
        "persist": true
      },
      "redact_query_string": false,
      "traces": {
        "destinations": [
          "cloudflare"
        ],
        "enabled": true,
        "head_sampling_rate": 0.1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "service": "my-log-consumer",
        "environment": "production",
        "namespace": "my-namespace"
      }
    ]
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
    "logpush": false,
    "observability": {
      "enabled": true,
      "head_sampling_rate": 0.1,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "destinations": [
          "cloudflare"
        ],
        "head_sampling_rate": 0.1,
        "persist": true
      },
      "redact_query_string": false,
      "traces": {
        "destinations": [
          "cloudflare"
        ],
        "enabled": true,
        "head_sampling_rate": 0.1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "service": "my-log-consumer",
        "environment": "production",
        "namespace": "my-namespace"
      }
    ]
  },
  "success": true
}
```