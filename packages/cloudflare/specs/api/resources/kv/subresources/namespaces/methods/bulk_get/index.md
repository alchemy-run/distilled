---
title: Get multiple key-value pairs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[KV](https://developers.cloudflare.com/api/resources/kv)

[Namespaces](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get multiple key-value pairs

POST/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/bulk/get

Retrieve up to 100 KV pairs from the namespace. Keys must contain text-based values. JSON values can optionally be parsed instead of being returned as a string value. Metadata can be included if `withMetadata` is true.

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

`Workers KV Storage Write``Workers KV Storage Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

namespace\_id: string

Namespace identifier tag.

maxLength32

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(params)%20default%20%3E%20(param)%20namespace_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

keys: array of string

Array of keys to retrieve (maximum of 100).

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(params)%200%20%3E%20(param)%20keys%20%3E%20(schema)>)

<details>

<summary>

type: optional "text"or "json"

Whether to parse JSON values in the response.

</summary>

One of the following:

"text"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

withMetadata: optional boolean

Whether to include metadata in the response.

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(params)%200%20%3E%20(param)%20withMetadata%20%3E%20(schema)>)

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

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {values } or object {values }

</summary>

One of the following:

<details>

<summary>

WorkersKVBulkGetResult object {values }

</summary>

<details>

<summary>

values: optional map\[stringor numberor booleanor map\[unknown]]

Requested keys are paired with their values in an object.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersKVBulkGetResultWithMetadata object {values }

</summary>

<details>

<summary>

values: optional map\[object {metadata, value, expiration } ]

Requested keys are paired with their values and metadata in an object.

</summary>

metadata: unknown

The metadata associated with the key.

<a href="#">Link to this property</a>

value: unknown

The value associated with the key.

<a href="#">Link to this property</a>

expiration: optional number

Expires the key at a certain time, measured in number of seconds since the UNIX epoch.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get multiple key-value pairs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/bulk/get \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "keys": [
            "My-Key"
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
  "success": true,
  "result": {
    "values": {
      "key1": "value1",
      "key2": "value2"
    }
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
    "values": {
      "key1": "value1",
      "key2": "value2"
    }
  }
}
```