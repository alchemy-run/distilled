---
title: Patch multiple script secrets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

[Secrets](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/secrets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Patch multiple script secrets

PATCH/accounts/{account\_id}/workers/scripts/{script\_name}/secrets-bulk

Create, update, or delete multiple secrets on a script in a single operation using JSON Merge Patch (RFC 7396). This operation creates a single version with all changes included. Prefer this API instead of changing many secrets individually.

Usage:

- To create or update a secret, set its value to a secret object.
- To delete a secret, set its value to `null`.
- Secrets not included in the request are left unchanged.

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

[Link to this property](#)%20workers.scripts.secrets%20%3E%20(method)%20bulk_update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

script\_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)%20workers.scripts.secrets%20%3E%20(method)%20bulk_update%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

secrets: optional map\[object {name, text, type } or object {algorithm, format, name, 4 more } ]

Map of secret names to secret values:

- Set to a secret object to create or update.
- Set to <code>null</code> to delete.
- Omit to leave unchanged.

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

[Link to this property](#)%20workers.scripts.secrets%20%3E%20(method)%20bulk_update%20%3E%20(params)%200%20%3E%20(param)%20secrets%20%3E%20(schema)>)

version\_tags: optional map\[unknown]

Optional version tags to apply to the new script version.

[Link to this property](#)%20workers.scripts.secrets%20%3E%20(method)%20bulk_update%20%3E%20(params)%200%20%3E%20(param)%20version_tags%20%3E%20(schema)>)

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

[Link to this property](#)%20workers.scripts.secrets%20%3E%20(method)%20bulk_update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers.scripts.secrets%20%3E%20(method)%20bulk_update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers.scripts.secrets%20%3E%20(method)%20bulk_update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional map\[object {name, text, type } or object {algorithm, format, name, 4 more } ]

Map of secret names to secret metadata for resulting secrets.

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

[Link to this property](#)%20workers.scripts.secrets%20%3E%20(method)%20bulk_update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Patch multiple script secrets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/secrets-bulk \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "foo": {
      "name": "myBinding",
      "type": "secret_text"
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
    "foo": {
      "name": "myBinding",
      "type": "secret_text"
    }
  }
}
```