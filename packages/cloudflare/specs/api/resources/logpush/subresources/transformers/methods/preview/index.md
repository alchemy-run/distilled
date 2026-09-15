---
title: Preview transformer
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logpush](https://developers.cloudflare.com/api/resources/logpush)

[Transformers](https://developers.cloudflare.com/api/resources/logpush/subresources/transformers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Preview transformer

POST/accounts/{account\_id}/logpush/transformers/preview

Executes a SQL transformer against a single input record and returns the transformed output. This is a stateless endpoint — nothing is persisted.

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

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20preview%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

input: map\[unknown]

A single log record to transform (JSON object).

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20preview%20%3E%20(params)%200%20%3E%20(param)%20input%20%3E%20(schema)>)

sql: string

The SQL transformer query. Maximum 32 KB. The query must contain a FROM clause referencing a valid logpush dataset.

maxLength32768

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20preview%20%3E%20(params)%200%20%3E%20(param)%20sql%20%3E%20(schema)>)

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

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20preview%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20preview%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20preview%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional array of map\[unknown]

An array of transformed log records. Queries that produce multiple rows from a single input (e.g. via UNNEST) return one object per output row. Null if the query filtered out the input record.

[Link to this property](#)%20logpush.transformers%20%3E%20(method)%20preview%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Preview transformer

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logpush/transformers/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "input": {
            "ClientIP": "bar",
            "ClientRequestHost": "bar",
            "EdgeStartTimestamp": "bar",
            "RayID": "bar"
          },
          "sql": "SELECT ClientIP, RayID FROM http_requests"
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
  "result": [
    {
      "ClientIP": "bar",
      "RayID": "bar"
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
      "ClientIP": "bar",
      "RayID": "bar"
    }
  ]
}
```