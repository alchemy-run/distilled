---
title: List a Namespace's Keys
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[KV](https://developers.cloudflare.com/api/resources/kv)

[Namespaces](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces)

[Keys](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List a Namespace's Keys

GET/accounts/{account\_id}/storage/kv/namespaces/{namespace\_id}/keys

Lists a namespace’s keys.

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

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

namespace\_id: string

Namespace identifier tag.

maxLength32

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20namespace_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Opaque token indicating the position from which to continue when requesting the next set of records if the amount of list results was limited by the limit parameter. A valid value for the cursor can be obtained from the `cursors` object in the `result_info` structure.

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

limit: optional number

Limits the number of keys returned in the response. The cursor attribute may be used to iterate over the next batch of keys if there are more than the limit.

maximum1000

minimum10

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

prefix: optional string

Filters returned keys by a name prefix. Exact matches and any key names that begin with the prefix will be returned.

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20prefix%20%3E%20(schema)>)

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

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/kv#(resource)%20kv.namespaces.keys%20%3E%20(model)%20key%20%3E%20(schema)">Key</a> { name, expiration, metadata }

</summary>

name: string

A key’s name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.

maxLength512

<a href="#">Link to this property</a>

expiration: optional number

The time, measured in number of seconds since the UNIX epoch, at which the key will expire. This property is omitted for keys that will not expire.

<a href="#">Link to this property</a>

metadata: optional unknown

Arbitrary JSON that is associated with a key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, cursor }

</summary>

count: optional number

Total results returned based on your list parameters.

<a href="#">Link to this property</a>

cursor: optional string

Opaque token indicating the position from which to continue when requesting the next set of records if the amount of list results was limited by the limit parameter. A valid value for the cursor can be obtained from the cursors object in the result\_info structure.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20kv.namespaces.keys%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List a Namespace's Keys

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/keys \
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
      "name": "My-Key",
      "expiration": 1577836800,
      "metadata": {}
    }
  ],
  "result_info": {
    "count": 1,
    "cursor": "6Ck1la0VxJ0djhidm1MdX2FyDGxLKVeeHZZmORS_8XeSuhz9SjIJRaSa2lnsF01tQOHrfTGAP3R5X1Kv5iVUuMbNKhWNAXHOl6ePB0TUL8nw"
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
  "result": [
    {
      "name": "My-Key",
      "expiration": 1577836800,
      "metadata": {}
    }
  ],
  "result_info": {
    "count": 1,
    "cursor": "6Ck1la0VxJ0djhidm1MdX2FyDGxLKVeeHZZmORS_8XeSuhz9SjIJRaSa2lnsF01tQOHrfTGAP3R5X1Kv5iVUuMbNKhWNAXHOl6ePB0TUL8nw"
  }
}
```