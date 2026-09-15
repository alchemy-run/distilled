---
title: Edit Worker
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Beta](https://developers.cloudflare.com/api/resources/workers/subresources/beta)

[Workers](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Edit Worker

PATCH/accounts/{account\_id}/workers/workers/{worker\_id}

Perform a partial update on a Worker, where omitted properties are left unchanged from their current values.

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

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

worker\_id: string

Identifier for the Worker, which can be ID or name.

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20worker_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

logpush: boolean

Whether logpush is enabled for the Worker.

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20logpush%20%3E%20(schema)>)

name: string

Name of the Worker.

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

observability: object {enabled, head\_sampling\_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: optional boolean

Whether observability is enabled for the Worker.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).

<a href="#">Link to this property</a>

<details>

<summary>

logs: optional object {destinations, enabled, head\_sampling\_rate, 2 more }

Log settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where logs will be exported to.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether logs are enabled for the Worker.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).

<a href="#">Link to this property</a>

invocation\_logs: optional boolean

Whether <a href="https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs">invocation logs</a> are enabled for the Worker.

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

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).

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

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20observability%20%3E%20(schema)>)

<details>

<summary>

subdomain: object {enabled, preview\_url\_suffix, previews\_enabled, url }

Subdomain settings for the Worker.

</summary>

enabled: optional boolean

Whether the \*.workers.dev subdomain is enabled for the Worker.

<a href="#">Link to this property</a>

preview\_url\_suffix: optional string

Prepend a version or preview prefix to this host suffix to form the \*.workers.dev <a href="https://developers.cloudflare.com/workers/configuration/previews/">preview URL</a> the Worker would serve on once previews are enabled, e.g. <code>https://&lt;prefix&gt;-my-worker.my-subdomain.workers.dev</code>. Present whenever the account owns a workers.dev subdomain, regardless of whether <code>previews_enabled</code> is true, so presence does not imply preview URLs are currently live. Absent only when the account owns no workers.dev subdomain.

<a href="#">Link to this property</a>

previews\_enabled: optional boolean

Whether <a href="https://developers.cloudflare.com/workers/configuration/previews/">preview URLs</a> are enabled for the Worker.

<a href="#">Link to this property</a>

url: optional string

The address the Worker would serve on once its \*.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain, regardless of whether <code>enabled</code> is true, so presence does not imply the Worker is currently live at this URL. Absent only when the account owns no workers.dev subdomain.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20subdomain%20%3E%20(schema)>)

tags: array of string

Tags associated with the Worker.

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20tags%20%3E%20(schema)>)

<details>

<summary>

tail\_consumers: array of object {name }

Other Workers that should consume logs from the Worker.

</summary>

name: string

Name of the consumer Worker.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20tail_consumers%20%3E%20(schema)>)

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

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers.beta.workers%20%3E%20(model)%20worker%20%3E%20(schema)">Worker</a> { id, created\_on, logpush, 8 more }

</summary>

id: string

Immutable ID of the Worker.

<a href="#">Link to this property</a>

created\_on: string

When the Worker was created.

formatdate-time

<a href="#">Link to this property</a>

logpush: boolean

Whether logpush is enabled for the Worker.

<a href="#">Link to this property</a>

name: string

Name of the Worker.

<a href="#">Link to this property</a>

<details>

<summary>

observability: object {enabled, head\_sampling\_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: optional boolean

Whether observability is enabled for the Worker.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).

<a href="#">Link to this property</a>

<details>

<summary>

logs: optional object {destinations, enabled, head\_sampling\_rate, 2 more }

Log settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where logs will be exported to.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether logs are enabled for the Worker.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).

<a href="#">Link to this property</a>

invocation\_logs: optional boolean

Whether <a href="https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs">invocation logs</a> are enabled for the Worker.

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

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).

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

<details>

<summary>

references: object {dispatch\_namespace\_outbounds, domains, durable\_objects, 2 more }

Other resources that reference the Worker and depend on it existing.

</summary>

<details>

<summary>

dispatch\_namespace\_outbounds: array of object {namespace\_id, namespace\_name, worker\_id, worker\_name }

Other Workers that reference the Worker as an outbound for a dispatch namespace.

</summary>

namespace\_id: string

ID of the dispatch namespace.

<a href="#">Link to this property</a>

namespace\_name: string

Name of the dispatch namespace.

<a href="#">Link to this property</a>

worker\_id: string

ID of the Worker using the dispatch namespace.

<a href="#">Link to this property</a>

worker\_name: string

Name of the Worker using the dispatch namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

domains: array of object {id, certificate\_id, hostname, 2 more }

Custom domains connected to the Worker.

</summary>

id: string

ID of the custom domain.

<a href="#">Link to this property</a>

certificate\_id: string

ID of the TLS certificate issued for the custom domain.

<a href="#">Link to this property</a>

hostname: string

Full hostname of the custom domain, including the zone name.

<a href="#">Link to this property</a>

zone\_id: string

ID of the zone.

<a href="#">Link to this property</a>

zone\_name: string

Name of the zone.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

durable\_objects: array of object {namespace\_id, namespace\_name, worker\_id, worker\_name }

Other Workers that reference Durable Object classes implemented by the Worker.

</summary>

namespace\_id: string

ID of the Durable Object namespace being used.

<a href="#">Link to this property</a>

namespace\_name: string

Name of the Durable Object namespace being used.

<a href="#">Link to this property</a>

worker\_id: string

ID of the Worker using the Durable Object implementation.

<a href="#">Link to this property</a>

worker\_name: string

Name of the Worker using the Durable Object implementation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

queues: array of object {queue\_consumer\_id, queue\_id, queue\_name }

Queues that send messages to the Worker.

</summary>

queue\_consumer\_id: string

ID of the queue consumer configuration.

<a href="#">Link to this property</a>

queue\_id: string

ID of the queue.

<a href="#">Link to this property</a>

queue\_name: string

Name of the queue.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

workers: array of object {id, name }

Other Workers that reference the Worker using <a href="https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/">service bindings</a>.

</summary>

id: string

ID of the referencing Worker.

<a href="#">Link to this property</a>

name: string

Name of the referencing Worker.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

subdomain: object {enabled, preview\_url\_suffix, previews\_enabled, url }

Subdomain settings for the Worker.

</summary>

enabled: optional boolean

Whether the \*.workers.dev subdomain is enabled for the Worker.

<a href="#">Link to this property</a>

preview\_url\_suffix: optional string

Prepend a version or preview prefix to this host suffix to form the \*.workers.dev <a href="https://developers.cloudflare.com/workers/configuration/previews/">preview URL</a> the Worker would serve on once previews are enabled, e.g. <code>https://&lt;prefix&gt;-my-worker.my-subdomain.workers.dev</code>. Present whenever the account owns a workers.dev subdomain, regardless of whether <code>previews_enabled</code> is true, so presence does not imply preview URLs are currently live. Absent only when the account owns no workers.dev subdomain.

<a href="#">Link to this property</a>

previews\_enabled: optional boolean

Whether <a href="https://developers.cloudflare.com/workers/configuration/previews/">preview URLs</a> are enabled for the Worker.

<a href="#">Link to this property</a>

url: optional string

The address the Worker would serve on once its \*.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain, regardless of whether <code>enabled</code> is true, so presence does not imply the Worker is currently live at this URL. Absent only when the account owns no workers.dev subdomain.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: array of string

Tags associated with the Worker.

<a href="#">Link to this property</a>

<details>

<summary>

tail\_consumers: array of object {name }

Other Workers that should consume logs from the Worker.

</summary>

name: string

Name of the consumer Worker.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_on: string

When the Worker was most recently updated.

formatdate-time

<a href="#">Link to this property</a>

deployed\_on: optional string

When the Worker’s most recent deployment was created. <code>null</code> if the Worker has never been deployed.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers.beta.workers%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Edit Worker

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "logpush": true,
          "name": "my-worker",
          "observability": {},
          "subdomain": {},
          "tags": [
            "my-team",
            "my-public-api"
          ],
          "tail_consumers": [
            {
              "name": "my-tail-consumer"
            }
          ]
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
    "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
    "created_on": "2019-12-27T18:11:19.117Z",
    "logpush": true,
    "name": "my-worker",
    "observability": {
      "enabled": true,
      "head_sampling_rate": 1,
      "logs": {
        "destinations": [
          "string"
        ],
        "enabled": true,
        "head_sampling_rate": 1,
        "invocation_logs": true,
        "persist": true
      },
      "redact_query_string": true,
      "traces": {
        "destinations": [
          "string"
        ],
        "enabled": true,
        "head_sampling_rate": 1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "references": {
      "dispatch_namespace_outbounds": [
        {
          "namespace_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "namespace_name": "my-dispatch-namespace",
          "worker_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "worker_name": "my-worker"
        }
      ],
      "domains": [
        {
          "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "certificate_id": "certificate_id",
          "hostname": "my-worker.example.com",
          "zone_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "zone_name": "example.com"
        }
      ],
      "durable_objects": [
        {
          "namespace_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "namespace_name": "my-durable-object-namespace",
          "worker_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "worker_name": "my-worker"
        }
      ],
      "queues": [
        {
          "queue_consumer_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "queue_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "queue_name": "my-queue"
        }
      ],
      "workers": [
        {
          "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "name": "my-worker"
        }
      ]
    },
    "subdomain": {
      "enabled": true,
      "preview_url_suffix": "-my-worker.my-subdomain.workers.dev",
      "previews_enabled": true,
      "url": "https://my-worker.my-subdomain.workers.dev"
    },
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "name": "my-tail-consumer"
      }
    ],
    "updated_on": "2019-12-27T18:11:19.117Z",
    "deployed_on": "2019-12-27T18:11:19.117Z"
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
    "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
    "created_on": "2019-12-27T18:11:19.117Z",
    "logpush": true,
    "name": "my-worker",
    "observability": {
      "enabled": true,
      "head_sampling_rate": 1,
      "logs": {
        "destinations": [
          "string"
        ],
        "enabled": true,
        "head_sampling_rate": 1,
        "invocation_logs": true,
        "persist": true
      },
      "redact_query_string": true,
      "traces": {
        "destinations": [
          "string"
        ],
        "enabled": true,
        "head_sampling_rate": 1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "references": {
      "dispatch_namespace_outbounds": [
        {
          "namespace_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "namespace_name": "my-dispatch-namespace",
          "worker_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "worker_name": "my-worker"
        }
      ],
      "domains": [
        {
          "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "certificate_id": "certificate_id",
          "hostname": "my-worker.example.com",
          "zone_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "zone_name": "example.com"
        }
      ],
      "durable_objects": [
        {
          "namespace_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "namespace_name": "my-durable-object-namespace",
          "worker_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "worker_name": "my-worker"
        }
      ],
      "queues": [
        {
          "queue_consumer_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "queue_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "queue_name": "my-queue"
        }
      ],
      "workers": [
        {
          "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
          "name": "my-worker"
        }
      ]
    },
    "subdomain": {
      "enabled": true,
      "preview_url_suffix": "-my-worker.my-subdomain.workers.dev",
      "previews_enabled": true,
      "url": "https://my-worker.my-subdomain.workers.dev"
    },
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "name": "my-tail-consumer"
      }
    ],
    "updated_on": "2019-12-27T18:11:19.117Z",
    "deployed_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```