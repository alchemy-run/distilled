---
title: Get secret binding
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers For Platforms](https://developers.cloudflare.com/api/resources/workers_for_platforms)

[Dispatch](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch)

[Namespaces](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces)

[Scripts](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts)

[Secrets](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts/subresources/secrets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get secret binding

GET/accounts/{account\_id}/workers/dispatch/namespaces/{dispatch\_namespace}/scripts/{script\_name}/secrets/{secret\_name}

Get a given secret binding (value omitted) on a script uploaded to a Workers for Platforms namespace.

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

`Workers Tail Read``Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dispatch\_namespace: string

Name of the Workers for Platforms dispatch namespace.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dispatch_namespace%20%3E%20(schema)>)

script\_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

secret\_name: string

A JavaScript variable name for the secret binding.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20secret_name%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

url\_encoded: optional boolean

Flag that indicates whether the secret name is URL encoded.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20url_encoded%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {name, text, type } or object {algorithm, format, name, 4 more }

A secret value accessible through a binding.

</summary>

One of the following:

<details>

<summary>

SecretText object {name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

text: string

The secret value to use.

<a href="#">Link to this property</a>

type: "secret\_text"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretKey object {algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm">Learn more</a>.

<a href="#">Link to this property</a>

<details>

<summary>

format: "raw"or "pkcs8"or "spki"or "jwk"

Data format of the key. <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format">Learn more</a>.

</summary>

One of the following:

"raw"

<a href="#">Link to this property</a>

"pkcs8"

<a href="#">Link to this property</a>

"spki"

<a href="#">Link to this property</a>

"jwk"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "secret\_key"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

<details>

<summary>

usages: array of "encrypt"or "decrypt"or "sign"or 5 more

Allowed operations with the key. <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages">Learn more</a>.

</summary>

One of the following:

"encrypt"

<a href="#">Link to this property</a>

"decrypt"

<a href="#">Link to this property</a>

"sign"

<a href="#">Link to this property</a>

"verify"

<a href="#">Link to this property</a>

"deriveKey"

<a href="#">Link to this property</a>

"deriveBits"

<a href="#">Link to this property</a>

"wrapKey"

<a href="#">Link to this property</a>

"unwrapKey"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key\_base64: optional string

Base64-encoded key data. Required if <code>format</code> is “raw”, “pkcs8”, or “spki”.

<a href="#">Link to this property</a>

key\_jwk: optional unknown

Key data in <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key">JSON Web Key</a> format. Required if <code>format</code> is “jwk”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.secrets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get secret binding

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/secrets/$SECRET_NAME \
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
  "result": {
    "name": "myBinding",
    "type": "secret_text"
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
  "result": {
    "name": "myBinding",
    "type": "secret_text"
  },
  "success": true
}
```