---
title: Get Destinations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Observability](https://developers.cloudflare.com/api/resources/workers/subresources/observability)

[Destinations](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/destinations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Destinations

GET/accounts/{account\_id}/workers/observability/destinations

List your Workers Observability Telemetry Destinations.

##### Security

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>User Service Key</summary>



Used when interacting with the Origin CA certificates API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/#viewchange-your-origin-ca-keys">View/change your key</a>.

**Example:**<code>X-Auth-User-Service-Key: v1.0-144c9defac04969c7bfad8ef-631a41d003a32d25fe878081ef365c49503f7fada600da935e2851a1c7326084b85cbf6429c4b859de8475731dc92a9c329631e6d59e6c73da7b198497172b4cefe071d90d0f5d2719</code>

</details>

##### Accepted Permissions (at least one required)

`Workers Observability Write``Workers Observability Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

order: optional "asc"or "desc"

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

<details>

<summary>

orderBy: optional "created"or "updated"

</summary>

One of the following:

"created"

<a href="#">Link to this property</a>

"updated"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20orderBy%20%3E%20(schema)>)

page: optional number

minimum1

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

perPage: optional number

maximum50

minimum5

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20perPage%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message }

</summary>

message: "Successful request"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {configuration, enabled, name, 2 more }

</summary>

<details>

<summary>

configuration: object {destination\_conf, headers, jobStatus, 3 more }

</summary>

destination\_conf: string

<a href="#">Link to this property</a>

headers: map\[string]

<a href="#">Link to this property</a>

<details>

<summary>

jobStatus: object {error\_message, last\_complete, last\_error }

</summary>

error\_message: string

<a href="#">Link to this property</a>

last\_complete: string

<a href="#">Link to this property</a>

last\_error: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logpushDataset: "opentelemetry-traces"or "opentelemetry-logs"or "opentelemetry-metrics"

</summary>

One of the following:

"opentelemetry-traces"

<a href="#">Link to this property</a>

"opentelemetry-logs"

<a href="#">Link to this property</a>

"opentelemetry-metrics"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "logpush"

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

scripts: array of string

<a href="#">Link to this property</a>

slug: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Destinations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "configuration": {
        "destination_conf": "destination_conf",
        "headers": {
          "foo": "string"
        },
        "jobStatus": {
          "error_message": "error_message",
          "last_complete": "last_complete",
          "last_error": "last_error"
        },
        "logpushDataset": "opentelemetry-traces",
        "type": "logpush",
        "url": "url"
      },
      "enabled": true,
      "name": "name",
      "scripts": [
        "string"
      ],
      "slug": "slug"
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "configuration": {
        "destination_conf": "destination_conf",
        "headers": {
          "foo": "string"
        },
        "jobStatus": {
          "error_message": "error_message",
          "last_complete": "last_complete",
          "last_error": "last_error"
        },
        "logpushDataset": "opentelemetry-traces",
        "type": "logpush",
        "url": "url"
      },
      "enabled": true,
      "name": "name",
      "scripts": [
        "string"
      ],
      "slug": "slug"
    }
  ],
  "success": true
}
```