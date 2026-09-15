---
title: Download current certificate in PEM format
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[SAML Certificates](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/saml_certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Download current certificate in PEM format

GET/accounts/{account\_id}/access/saml\_certificates/{saml\_cert\_set\_id}/pem

Downloads the current SAML encryption certificate’s public key in PEM format for the specified certificate set. This endpoint is useful for providing the certificate to Identity Providers for SAML assertion encryption configuration.

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

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(method)%20get_pem%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

saml\_cert\_set\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(method)%20get_pem%20%3E%20(params)%20default%20%3E%20(param)%20saml_cert_set_id%20%3E%20(schema)>)

### Download current certificate in PEM format

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/saml_certificates/$SAML_CERT_SET_ID/pem \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples