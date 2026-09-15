---
title: Write multiple key-value pairs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[KV](https://developers.cloudflare.com/api/resources/kv)

[Namespaces](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Write multiple key-value pairs

PUT/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/bulk

Write multiple keys and values at once. Body should be an array of up to 10,000 key-value pairs to be stored, along with optional expiration information. Existing values and expirations will be overwritten. If neither `expiration` nor `expiration_ttl` is specified, the key-value pair will never expire. If both are set, `expiration_ttl` is used and `expiration` is ignored. The entire request size must be 100 megabytes or less.

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

`Workers KV Storage Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

namespace\_id: string

Namespace identifier tag.

maxLength32

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_update%20%3E%20(params)%20default%20%3E%20(param)%20namespace_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: array of object {key, value, base64, 3 more }

</summary>

key: string

A key’s name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid.

maxLength512

<a href="#">Link to this property</a>

value: string

A UTF-8 encoded string to be stored, up to 25 MiB in length.

maxLength26214400

<a href="#">Link to this property</a>

base64: optional boolean

Indicates whether or not the server should base64 decode the value before storing it. Useful for writing values that wouldn’t otherwise be valid JSON strings, such as images.

<a href="#">Link to this property</a>

expiration: optional number

Expires the key at a certain time, measured in number of seconds since the UNIX epoch.

<a href="#">Link to this property</a>

expiration\_ttl: optional number

Expires the key after a number of seconds. Must be at least 60.

minimum60

<a href="#">Link to this property</a>

metadata: optional unknown

Arbitrary JSON that is associated with a key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_update%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {successful\_key\_count, unsuccessful\_keys }

</summary>

successful\_key\_count: optional number

Number of keys successfully updated.

<a href="#">Link to this property</a>

unsuccessful\_keys: optional array of string

Name of the keys that failed to be fully updated. They should be retried.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces%20%3E%20(method)%20bulk_update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Write multiple key-value pairs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/bulk \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "key": "My-Key",
            "value": "Some string",
            "base64": true,
            "expiration": 1578435000,
            "expiration_ttl": 300,
            "metadata": {}
          }
        ]'
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
    "successful_key_count": 100,
    "unsuccessful_keys": [
      "string"
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
    "successful_key_count": 100,
    "unsuccessful_keys": [
      "string"
    ]
  }
}
```