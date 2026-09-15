---
title: Get extension
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar](https://developers.cloudflare.com/api/resources/registrar)

[Extensions](https://developers.cloudflare.com/api/resources/registrar/subresources/extensions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get extension

GET/accounts/{account\_id}/registrar/extensions/{extension}

Returns metadata and JSON Schema documents describing the expected input structure for registration operations on a specific extension (TLD).

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

[Link to this property](#)%20registrar.extensions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

extension: string

[Link to this property](#)%20registrar.extensions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20extension%20%3E%20(schema)>)

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

[Link to this property](#)%20registrar.extensions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20registrar.extensions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {metadata, registration\_schema }

Extension entry with metadata and JSON Schema documents for the registration operation.

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

[Link to this property](#)%20registrar.extensions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar.extensions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get extension

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/extensions/$EXTENSION \
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
  "result": {
    "metadata": {
      "name": "name",
      "tld": "tld"
    },
    "registration_schema": {}
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
  "result": {
    "metadata": {
      "name": "name",
      "tld": "tld"
    },
    "registration_schema": {}
  },
  "success": true
}
```