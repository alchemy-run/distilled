---
title: List Instant Logs jobs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logpush](https://developers.cloudflare.com/api/resources/logpush)

[Edge](https://developers.cloudflare.com/api/resources/logpush/subresources/edge)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Instant Logs jobs

GET/zones/{zone\_id}/logpush/edge/jobs

Lists Instant Logs jobs for a zone.

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

`Logs Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20logpush.edge%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20logpush.edge%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20logpush.edge%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20logpush.edge%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/logpush#(resource)%20logpush.edge%20%3E%20(model)%20instant_logpush_job%20%3E%20(schema)">InstantLogpushJob</a> { destination\_conf, fields, filter, 2 more }

</summary>

destination\_conf: optional string

Unique WebSocket address that will receive messages from Cloudflare’s edge.

formaturi

maxLength4096

<a href="#">Link to this property</a>

fields: optional string

Comma-separated list of fields.

<a href="#">Link to this property</a>

filter: optional string

Filters to drill down into specific events.

<a href="#">Link to this property</a>

sample: optional number

The sample parameter is the sample rate of the records set by the client: “sample”: 1 is 100% of records “sample”: 10 is 10% and so on.

<a href="#">Link to this property</a>

session\_id: optional string

Unique session id of the job.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.edge%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List Instant Logs jobs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/edge/jobs \
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
  "result": [
    {
      "destination_conf": "wss://logs.cloudflare.com/instant-logs/ws/sessions/99d471b1ca3c23cc8e30b6acec5db987",
      "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
      "filter": "{\"where\":{\"and\":[{\"key\":\"ClientCountry\",\"operator\":\"neq\",\"value\":\"ca\"}]}}",
      "sample": 1,
      "session_id": "99d471b1ca3c23cc8e30b6acec5db987"
    }
  ]
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
  "result": [
    {
      "destination_conf": "wss://logs.cloudflare.com/instant-logs/ws/sessions/99d471b1ca3c23cc8e30b6acec5db987",
      "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
      "filter": "{\"where\":{\"and\":[{\"key\":\"ClientCountry\",\"operator\":\"neq\",\"value\":\"ca\"}]}}",
      "sample": 1,
      "session_id": "99d471b1ca3c23cc8e30b6acec5db987"
    }
  ]
}
```