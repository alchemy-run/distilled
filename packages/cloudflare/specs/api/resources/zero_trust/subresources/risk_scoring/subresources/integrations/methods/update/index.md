---
title: Update a risk score integration.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Risk Scoring](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring)

[Integrations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/integrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a risk score integration.

PUT/accounts/{account\_id}/zt\_risk\_scoring/integrations/{integration\_id}

Overwrite the reference\_id, tenant\_url, and active values with the ones provided.

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

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

integration\_id: string

formatuuid

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20integration_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

active: boolean

Whether this integration is enabled. If disabled, no risk changes will be exported to the third-party.

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20active%20%3E%20(schema)>)

tenant\_url: string

The base url of the tenant, e.g. “ https://tenant.okta.com”.

formaturi

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20tenant_url%20%3E%20(schema)>)

reference\_id: optional string

A reference id that can be supplied by the client. Currently this should be set to the Access-Okta IDP ID (a UUIDv4). https://developers.cloudflare.com/api/operations/access-identity-providers-get-an-access-identity-provider

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20reference_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, account\_tag, active, 5 more }

</summary>

id: string

The id of the integration, a UUIDv4.

formatuuid

<a href="#">Link to this property</a>

account\_tag: string

The Cloudflare account tag.

<a href="#">Link to this property</a>

active: boolean

Whether this integration is enabled and should export changes in risk score.

<a href="#">Link to this property</a>

created\_at: string

When the integration was created in RFC3339 format.

formatdate-time

<a href="#">Link to this property</a>

integration\_type: "Okta"

<a href="#">Link to this property</a>

reference\_id: string

A reference ID defined by the client. Should be set to the Access-Okta IDP integration ID. Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

<a href="#">Link to this property</a>

tenant\_url: string

The base URL for the tenant. E.g. “<a href="https://tenant.okta.com">https://tenant.okta.com</a>”.

<a href="#">Link to this property</a>

well\_known\_url: string

The URL for the Shared Signals Framework configuration, e.g. “/.well-known/sse-configuration/{integration\_uuid}/”. <a href="https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1">https://openid.net/specs/openid-sse-framework-1\_0.html#rfc.section.6.2.1</a>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a risk score integration.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/integrations/$INTEGRATION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "active": true,
          "tenant_url": "https://example.com"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "account_tag": "account_tag",
    "active": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "integration_type": "Okta",
    "reference_id": "reference_id",
    "tenant_url": "tenant_url",
    "well_known_url": "well_known_url"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "account_tag": "account_tag",
    "active": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "integration_type": "Okta",
    "reference_id": "reference_id",
    "tenant_url": "tenant_url",
    "well_known_url": "well_known_url"
  }
}
```