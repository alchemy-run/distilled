---
title: Delete Destination
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

# Delete Destination

DELETE/accounts/{account\_id}/workers/observability/destinations/{slug}

Delete a Workers Observability Telemetry Destination.

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

`Workers Observability Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

slug: string

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20slug%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message }

</summary>

message: "Successful request"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {configuration, enabled, name, 2 more }

</summary>

<details>

<summary>

configuration: object {destination\_conf, logpushDataset, logpushJob, 2 more }

</summary>

destination\_conf: string

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

logpushJob: number

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

[Link to this property](#)%20workers.observability.destinations%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete Destination

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations/$SLUG \
    -X DELETE \
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
  "success": true,
  "result": {
    "configuration": {
      "destination_conf": "destination_conf",
      "logpushDataset": "opentelemetry-traces",
      "logpushJob": 0,
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
  "success": true,
  "result": {
    "configuration": {
      "destination_conf": "destination_conf",
      "logpushDataset": "opentelemetry-traces",
      "logpushJob": 0,
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
}
```