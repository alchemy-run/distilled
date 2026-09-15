---
title: Create transformer
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logpush](https://developers.cloudflare.com/api/resources/logpush)

[Transformers](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create transformer

POST/accounts/{account\_id}/logpush/transformers

Creates a new custom log transformer for an account.

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

`Logs Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

code: string

The SQL transformer query. Maximum 32 KB. The query must contain a FROM clause referencing a valid logpush dataset.

maxLength32768

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20code%20%3E%20(schema)>)

name: string

Customer-provided name for identification.

maxLength255

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

description: optional string

Optional customer-provided description.

maxLength4096

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

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

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, associated\_jobs, created\_at, 4 more }

</summary>

id: optional number

The transformer ID.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

associated\_jobs: optional array of object {id, name, object\_tag, object\_type }

Logpush jobs that reference this transformer.

</summary>

id: optional number

The logpush job ID.

<a href="#">Link to this property</a>

name: optional string

The logpush job destination name.

<a href="#">Link to this property</a>

object\_tag: optional string

The zone or account tag.

<a href="#">Link to this property</a>

<details>

<summary>

object\_type: optional "zone"or "account"

Whether the job is zone-scoped or account-scoped.

</summary>

One of the following:

"zone"

<a href="#">Link to this property</a>

"account"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

When the transformer was created (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

dataset: optional string

The dataset this transformer operates on, derived from the SQL query’s FROM clause. Informational only. May be absent if the dataset cannot be determined from the query.

<a href="#">Link to this property</a>

description: optional string

Optional customer-provided description.

maxLength4096

<a href="#">Link to this property</a>

name: optional string

Customer-provided name for identification.

maxLength255

<a href="#">Link to this property</a>

updated\_at: optional string

When the transformer was last modified (RFC 3339).

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create transformer

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logpush/transformers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "code": "SELECT ClientIP, RayID FROM http_requests",
          "name": "redact-pii",
          "description": "Redacts PII fields from HTTP request logs."
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
    "id": 42,
    "associated_jobs": [
      {
        "id": 123,
        "name": "s3-export",
        "object_tag": "023e105f4ecef8ad9ca31a8372d0c353",
        "object_type": "zone"
      }
    ],
    "created_at": "2026-08-01T12:00:00Z",
    "dataset": "http_requests",
    "description": "Redacts PII fields from HTTP request logs.",
    "name": "redact-pii",
    "updated_at": "2026-08-10T15:30:00Z"
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
    "id": 42,
    "associated_jobs": [
      {
        "id": 123,
        "name": "s3-export",
        "object_tag": "023e105f4ecef8ad9ca31a8372d0c353",
        "object_type": "zone"
      }
    ],
    "created_at": "2026-08-01T12:00:00Z",
    "dataset": "http_requests",
    "description": "Redacts PII fields from HTTP request logs.",
    "name": "redact-pii",
    "updated_at": "2026-08-10T15:30:00Z"
  }
}
```