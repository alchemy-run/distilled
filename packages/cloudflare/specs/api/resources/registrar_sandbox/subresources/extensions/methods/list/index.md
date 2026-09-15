---
title: List extensions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar Sandbox](https://developers.cloudflare.com/api/resources/registrar_sandbox)

[Extensions](https://developers.cloudflare.com/api/resources/registrar_sandbox/subresources/extensions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List extensions

GET/accounts/{account\_id}/registrar-sandbox/extensions

Returns metadata and JSON Schema documents describing the expected input structure for registration operations on each supported extension (TLD).

This endpoint uses cursor-based pagination. Results are ordered by extension name by default. To fetch the next page, pass the `cursor` value from the `result_info` object in the response as the `cursor` query parameter in your next request. An empty `cursor` string indicates there are no more pages.

Supports HTTP conditional GET via `ETag`. Include the `ETag` value from a previous response in an `If-None-Match` header to receive a `304 Not Modified` when the data has not changed.

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

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Opaque token from a previous response’s `result_info.cursor`. Pass this value to fetch the next page of results. Omit (or pass an empty string) for the first page.

maxLength256

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Sort direction for results. Defaults to ascending order.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

name: optional string

Filter extensions by exact name match. For example, `name=com` returns only the `com` extension.

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

per\_page: optional number

Number of items to return per page.

maximum50

minimum1

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

sort\_by: optional "name"or "created\_at"or "updated\_at"

Column to sort results by. Defaults to <code>name</code> when omitted.

</summary>

One of the following:

"name"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

"updated\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Location of the invalid value that caused the error.

</summary>

pointer: string

JSON Pointer to the invalid or missing request value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Location of the invalid value that caused the error.

</summary>

pointer: string

JSON Pointer to the invalid or missing request value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {metadata, registration\_schema }

</summary>

<details>

<summary>

metadata: object {name, tld }

Extension metadata.

</summary>

name: string

The full name of the extension. For example, “co.uk”, or “uk”.

<a href="#">Link to this property</a>

tld: string

The TLD of the extension. For example, for “co.uk”, it is “uk”. For “uk”, it is “uk”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registration\_schema: unknown

JSON Schema describing the expected input structure for registration operations on this extension.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, cursor, per\_page }

Cursor-based pagination metadata.

</summary>

count: optional number

Number of items in the current result set.

<a href="#">Link to this property</a>

cursor: optional string

Opaque token for the next page. Empty string when no more pages.

<a href="#">Link to this property</a>

per\_page: optional number

Number of items per page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.extensions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List extensions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar-sandbox/extensions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "metadata": {
        "name": "name",
        "tld": "tld"
      },
      "registration_schema": {}
    }
  ],
  "success": true,
  "result_info": {
    "count": 0,
    "cursor": "cursor",
    "per_page": 0
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
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "metadata": {
        "name": "name",
        "tld": "tld"
      },
      "registration_schema": {}
    }
  ],
  "success": true,
  "result_info": {
    "count": 0,
    "cursor": "cursor",
    "per_page": 0
  }
}
```