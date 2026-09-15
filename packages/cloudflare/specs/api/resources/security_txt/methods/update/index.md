---
title: Updates security.txt
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Security TXT](https://developers.cloudflare.com/api/resources/security_txt)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Updates security.txt

PUT/zones/{zone\_id}/security-center/securitytxt

Updates the security.txt file configuration for a zone, which provides security researchers with vulnerability reporting information.

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

`Zone Settings Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

acknowledgments: optional array of string

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20acknowledgments%20%3E%20(schema)>)

canonical: optional array of string

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20canonical%20%3E%20(schema)>)

contact: optional array of string

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20contact%20%3E%20(schema)>)

enabled: optional boolean

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

encryption: optional array of string

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20encryption%20%3E%20(schema)>)

expires: optional string

formatdate-time

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20expires%20%3E%20(schema)>)

hiring: optional array of string

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20hiring%20%3E%20(schema)>)

policy: optional array of string

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20policy%20%3E%20(schema)>)

preferred\_languages: optional string

[Link to this property](#)%20security_txt%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20preferred_languages%20%3E%20(schema)>)

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

[Link to this property](#)%20security_txt%20%3E%20(model)%20security_txt_update_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20security_txt%20%3E%20(model)%20security_txt_update_response%20%3E%20(schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20security_txt%20%3E%20(model)%20security_txt_update_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Updates security.txt

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/security-center/securitytxt \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "acknowledgments": [
            "https://example.com/hall-of-fame.html"
          ],
          "canonical": [
            "https://www.example.com/.well-known/security.txt"
          ],
          "contact": [
            "mailto:security@example.com",
            "tel:+1-201-555-0123",
            "https://example.com/security-contact.html"
          ],
          "enabled": true,
          "encryption": [
            "https://example.com/pgp-key.txt",
            "dns:5d2d37ab76d47d36._openpgpkey.example.com?type=OPENPGPKEY",
            "openpgp4fpr:5f2de5521c63a801ab59ccb603d49de44b29100f"
          ],
          "hiring": [
            "https://example.com/jobs.html"
          ],
          "policy": [
            "https://example.com/disclosure-policy.html"
          ],
          "preferred_languages": "en, es, fr"
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
  "success": true
}
```