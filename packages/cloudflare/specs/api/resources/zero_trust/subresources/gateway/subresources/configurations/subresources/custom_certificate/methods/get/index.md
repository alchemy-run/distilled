---
title: Get Zero Trust certificate configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

[Configurations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/configurations)

[Custom Certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/configurations/subresources/custom_certificate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Zero Trust certificate configuration

Deprecated

GET/accounts/{account\_id}/gateway/configuration/custom\_certificate

Retrieve the current Zero Trust certificate configuration.

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

[Link to this property](#)%20zero_trust.gateway.configurations.custom_certificate%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

CustomCertificateSettings object {enabled, id, binding\_status, updated\_at }

Specify custom certificate settings for BYO-PKI. This field is deprecated; use <code>certificate</code> instead.

</summary>

enabled: boolean

Specify whether to enable a custom certificate authority for signing Gateway traffic.

<a href="#">Link to this property</a>

id: optional string

Specify the UUID of the certificate (ID from MTLS certificate store).

<a href="#">Link to this property</a>

binding\_status: optional string

Indicate the internal certificate status.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.configurations%20%3E%20(model)%20custom_certificate_settings%20%3E%20(schema)>)

### Get Zero Trust certificate configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration/custom_certificate \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "enabled": true,
  "id": "d1b364c5-1311-466e-a194-f0e943e0799f",
  "binding_status": "pending_deployment",
  "updated_at": "2019-12-27T18:11:19.117Z"
}
```

##### Returns Examples

200 example

```
{
  "enabled": true,
  "id": "d1b364c5-1311-466e-a194-f0e943e0799f",
  "binding_status": "pending_deployment",
  "updated_at": "2019-12-27T18:11:19.117Z"
}
```