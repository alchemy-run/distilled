---
title: List certificate authorities
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[CT](https://developers.cloudflare.com/api/resources/radar/subresources/ct)

[Authorities](https://developers.cloudflare.com/api/resources/radar/subresources/ct/subresources/authorities)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List certificate authorities

GET/radar/ct/authorities

Retrieves a list of certificate authorities.

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

`User Details Write``User Details Read`

##### Q uery ParametersExpand Collapse

<details>

<summary>

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct.authorities%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.ct.authorities%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.ct.authorities%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {certificateAuthorities }

</summary>

<details>

<summary>

certificateAuthorities: array of object {certificateRecordType, country, countryName, 6 more }

</summary>

<details>

<summary>

certificateRecordType: "ROOT\_CERTIFICATE"or "INTERMEDIATE\_CERTIFICATE"

Specifies the type of certificate in the trust chain.

</summary>

One of the following:

"ROOT\_CERTIFICATE"

<a href="#">Link to this property</a>

"INTERMEDIATE\_CERTIFICATE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

country: string

The two-letter ISO country code where the CA organization is based.

<a href="#">Link to this property</a>

countryName: string

The full country name corresponding to the country code.

<a href="#">Link to this property</a>

name: string

The full name of the certificate authority (CA).

<a href="#">Link to this property</a>

owner: string

The organization that owns and operates the CA.

<a href="#">Link to this property</a>

parentName: string

The name of the parent/root certificate authority that issued this intermediate certificate.

<a href="#">Link to this property</a>

parentSha256Fingerprint: string

The SHA-256 fingerprint of the parent certificate.

<a href="#">Link to this property</a>

<details>

<summary>

revocationStatus: "NOT\_REVOKED"or "REVOKED"or "PARENT\_CERT\_REVOKED"

The current revocation status of a Certificate Authority (CA) certificate.

</summary>

One of the following:

"NOT\_REVOKED"

<a href="#">Link to this property</a>

"REVOKED"

<a href="#">Link to this property</a>

"PARENT\_CERT\_REVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sha256Fingerprint: string

The SHA-256 fingerprint of the intermediate certificate.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct.authorities%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.ct.authorities%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List certificate authorities

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/ct/authorities \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "certificateAuthorities": [
      {
        "certificateRecordType": "ROOT_CERTIFICATE",
        "country": "PT",
        "countryName": "Portugal",
        "name": "MULTICERT Advanced Certification Authority 005",
        "owner": "MULTICERT",
        "parentName": "MULTICERT Root Certification Authority 01",
        "parentSha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3",
        "revocationStatus": "NOT_REVOKED",
        "sha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3"
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "certificateAuthorities": [
      {
        "certificateRecordType": "ROOT_CERTIFICATE",
        "country": "PT",
        "countryName": "Portugal",
        "name": "MULTICERT Advanced Certification Authority 005",
        "owner": "MULTICERT",
        "parentName": "MULTICERT Root Certification Authority 01",
        "parentSha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3",
        "revocationStatus": "NOT_REVOKED",
        "sha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3"
      }
    ]
  },
  "success": true
}
```