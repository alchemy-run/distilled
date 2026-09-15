---
title: Enable or Disable Total TLS
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[ACM](https://developers.cloudflare.com/api/resources/acm)

[Total TLS](https://developers.cloudflare.com/api/resources/acm/subresources/total_tls)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Enable or Disable Total TLS

POST/zones/{zone\_id}/acm/total\_tls

Set Total TLS Settings or disable the feature for a Zone.

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

`SSL and Certificates Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20acm.total_tls%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

enabled: boolean

If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

[Link to this property](#)%20acm.total_tls%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

<details>

<summary>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/acm#(resource)%20acm.total_tls%20%3E%20(model)%20certificate_authority%20%3E%20(schema)">CertificateAuthority</a>

The Certificate Authority that Total TLS certificates will be issued through.

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.total_tls%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20certificate_authority%20%3E%20(schema)>)

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

[Link to this property](#)%20acm.total_tls%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20acm.total_tls%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20acm.total_tls%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {certificate\_authority, enabled, validity\_period }

</summary>

<details>

<summary>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/acm#(resource)%20acm.total_tls%20%3E%20(model)%20certificate_authority%20%3E%20(schema)">CertificateAuthority</a>

The Certificate Authority that Total TLS certificates will be issued through.

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

<a href="#">Link to this property</a>

validity\_period: optional 90

The validity period in days for the certificates ordered via Total TLS.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.total_tls%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Enable or Disable Total TLS

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/total_tls \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "certificate_authority": "google"
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
    "certificate_authority": "google",
    "enabled": true,
    "validity_period": 90
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
    "certificate_authority": "google",
    "enabled": true,
    "validity_period": 90
  }
}
```