---
title: Integrations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Risk Scoring](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Integrations

##### [List all risk score integrations for the account.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/integrations/methods/list)

GET/accounts/{account\_id}/zt\_risk\_scoring/integrations

##### [Get risk score integration by id.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/integrations/methods/get)

GET/accounts/{account\_id}/zt\_risk\_scoring/integrations/{integration\_id}

##### [Create new risk score integration.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/integrations/methods/create)

POST/accounts/{account\_id}/zt\_risk\_scoring/integrations

##### [Update a risk score integration.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/integrations/methods/update)

PUT/accounts/{account\_id}/zt\_risk\_scoring/integrations/{integration\_id}

##### [Delete a risk score integration.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/integrations/methods/delete)

DELETE/accounts/{account\_id}/zt\_risk\_scoring/integrations/{integration\_id}

##### ModelsExpand Collapse

<details>

<summary>

IntegrationListResponse object {id, account\_tag, active, 5 more }

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

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(model)%20integration_list_response%20%3E%20(schema)>)

<details>

<summary>

IntegrationGetResponse object {id, account\_tag, active, 5 more }

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

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(model)%20integration_get_response%20%3E%20(schema)>)

<details>

<summary>

IntegrationCreateResponse object {id, account\_tag, active, 5 more }

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

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(model)%20integration_create_response%20%3E%20(schema)>)

<details>

<summary>

IntegrationUpdateResponse object {id, account\_tag, active, 5 more }

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

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(model)%20integration_update_response%20%3E%20(schema)>)

IntegrationDeleteResponse = unknown

[Link to this property](#)%20zero_trust.risk_scoring.integrations%20%3E%20(model)%20integration_delete_response%20%3E%20(schema)>)

#### IntegrationsReferences

##### [Get risk score integration by reference id.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/integrations/subresources/references/methods/get)

GET/accounts/{account\_id}/zt\_risk\_scoring/integrations/reference\_id/{reference\_id}

##### ModelsExpand Collapse

<details>

<summary>

ReferenceGetResponse object {id, account\_tag, active, 5 more }

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

[Link to this property](#)%20zero_trust.risk_scoring.integrations.references%20%3E%20(model)%20reference_get_response%20%3E%20(schema)>)