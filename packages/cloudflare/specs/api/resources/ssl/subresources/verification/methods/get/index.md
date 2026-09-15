---
title: SSL Verification Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[SSL](https://developers.cloudflare.com/api/resources/ssl)

[Verification](https://developers.cloudflare.com/api/resources/ssl/subresources/verification)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# SSL Verification Details

GET/zones/{zone\_id}/ssl/verification

Get SSL Verification Info for a Zone.

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

`Access: Mutual TLS Certificates Write``Access: Mutual TLS Certificates Read``SSL and Certificates Write``SSL and Certificates Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20ssl.verification%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

retry: optional true

Immediately retry SSL Verification.

[Link to this property](#)%20ssl.verification%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20retry%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.verification%20%3E%20(model)%20verification%20%3E%20(schema)">Verification</a> { certificate\_status, brand\_check, cert\_pack\_uuid, 5 more }

</summary>

<details>

<summary>

certificate\_status: "initializing"or "authorizing"or "active"or 4 more

Current status of certificate.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"authorizing"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"issuing"

<a href="#">Link to this property</a>

"timing\_out"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

brand\_check: optional boolean

Certificate Authority is manually reviewing the order.

<a href="#">Link to this property</a>

cert\_pack\_uuid: optional string

Certificate Pack UUID.

<a href="#">Link to this property</a>

<details>

<summary>

signature: optional "ECDSAWithSHA256"or "SHA1WithRSA"or "SHA256WithRSA"

Certificate’s signature algorithm.

</summary>

One of the following:

"ECDSAWithSHA256"

<a href="#">Link to this property</a>

"SHA1WithRSA"

<a href="#">Link to this property</a>

"SHA256WithRSA"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_method: optional <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20validation_method%20%3E%20(schema)">ValidationMethod</a>

Validation method in use for a certificate pack order.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"cname"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_info: optional object {record\_name, record\_target }

Certificate’s required verification information.

</summary>

<details>

<summary>

record\_name: optional "record\_name"or "http\_url"or "cname"or "txt\_name"

Name of CNAME record.

formathostname

</summary>

One of the following:

"record\_name"

<a href="#">Link to this property</a>

"http\_url"

<a href="#">Link to this property</a>

"cname"

<a href="#">Link to this property</a>

"txt\_name"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

record\_target: optional "record\_value"or "http\_body"or "cname\_target"or "txt\_value"

Target of CNAME record.

formathostname

</summary>

One of the following:

"record\_value"

<a href="#">Link to this property</a>

"http\_body"

<a href="#">Link to this property</a>

"cname\_target"

<a href="#">Link to this property</a>

"txt\_value"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_status: optional boolean

Status of the required verification information, omitted if verification status is unknown.

<a href="#">Link to this property</a>

<details>

<summary>

verification\_type: optional "cname"or "meta tag"

Method of verification.

</summary>

One of the following:

"cname"

<a href="#">Link to this property</a>

"meta tag"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.verification%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### SSL Verification Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/verification \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "certificate_status": "active",
      "brand_check": false,
      "cert_pack_uuid": "a77f8bd7-3b47-46b4-a6f1-75cf98109948",
      "signature": "ECDSAWithSHA256",
      "validation_method": "txt",
      "verification_info": {
        "record_name": "record_name",
        "record_target": "record_value"
      },
      "verification_status": true,
      "verification_type": "cname"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": [
    {
      "certificate_status": "active",
      "brand_check": false,
      "cert_pack_uuid": "a77f8bd7-3b47-46b4-a6f1-75cf98109948",
      "signature": "ECDSAWithSHA256",
      "validation_method": "txt",
      "verification_info": {
        "record_name": "record_name",
        "record_target": "record_value"
      },
      "verification_status": true,
      "verification_type": "cname"
    }
  ]
}
```