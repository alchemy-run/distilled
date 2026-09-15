---
title: Add an mTLS certificate
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Certificates](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Add an mTLS certificate

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/certificates

Adds a new mTLS root certificate to Access.

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

`Access: Mutual TLS Certificates Write`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

certificate: string

The certificate content.

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20certificate%20%3E%20(schema)>)

name: string

The name of the certificate.

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

associated\_hostnames: optional array of [AssociatedHostnames](<https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.certificates%20%3E%20(model)%20associated_hostnames%20%3E%20(schema)>)

The hostnames of the applications that will use this certificate.

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20associated_hostnames%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.certificates%20%3E%20(model)%20certificate%20%3E%20(schema)">Certificate</a> { id, associated\_hostnames, expires\_on, 2 more }

</summary>

id: optional string

The ID of the application that will use this certificate.

<a href="#">Link to this property</a>

associated\_hostnames: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.certificates%20%3E%20(model)%20associated_hostnames%20%3E%20(schema)">AssociatedHostnames</a>

The hostnames of the applications that will use this certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

The MD5 fingerprint of the certificate.

<a href="#">Link to this property</a>

name: optional string

The name of the certificate.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Add an mTLS certificate

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIGAjCCA+qgAwIBAgIJAI7kymlF7CWT...N4RI7KKB7nikiuUf8vhULKy5IX10\\nDrUtmu/B\\n-----END CERTIFICATE-----",
          "name": "Allow devs"
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
    "id": "id",
    "associated_hostnames": [
      "admin.example.com"
    ],
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "MD5 Fingerprint=1E:80:0F:7A:FD:31:55:96:DE:D5:CB:E2:F0:91:F6:91",
    "name": "Allow devs",
    "updated_at": "2014-01-01T05:20:00.12345Z"
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
    "id": "id",
    "associated_hostnames": [
      "admin.example.com"
    ],
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "MD5 Fingerprint=1E:80:0F:7A:FD:31:55:96:DE:D5:CB:E2:F0:91:F6:91",
    "name": "Allow devs",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```