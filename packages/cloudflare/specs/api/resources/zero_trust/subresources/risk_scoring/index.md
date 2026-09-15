---
title: Risk Scoring
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Risk Scoring

##### [Get risk event/score information for a specific user](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/methods/get)

GET/accounts/{account\_id}/zt\_risk\_scoring/{user\_id}

##### [Clear the risk score for a particular user](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/methods/reset)

POST/accounts/{account\_id}/zt\_risk\_scoring/{user\_id}/reset

##### ModelsExpand Collapse

<details>

<summary>

RiskScoringGetResponse object {email, events, name, 2 more }

</summary>

email: string

<a href="#">Link to this property</a>

<details>

<summary>

events: array of object {id, name, risk\_level, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

risk\_level: "low"or "medium"or "high"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

event\_details: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

last\_reset\_time: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

risk\_level: optional "low"or "medium"or "high"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.risk_scoring%20%3E%20(model)%20risk_scoring_get_response%20%3E%20(schema)>)

RiskScoringResetResponse = unknown

[Link to this property](#)%20zero_trust.risk_scoring%20%3E%20(model)%20risk_scoring_reset_response%20%3E%20(schema)>)

#### Risk ScoringBehaviours

##### [Get all behaviors and associated configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/behaviours/methods/get)

GET/accounts/{account\_id}/zt\_risk\_scoring/behaviors

##### [Update configuration for risk behaviors](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/behaviours/methods/update)

PUT/accounts/{account\_id}/zt\_risk\_scoring/behaviors

##### ModelsExpand Collapse

<details>

<summary>

BehaviourGetResponse object {behaviors }

</summary>

<details>

<summary>

behaviors: map\[object {description, enabled, name, risk\_level } ]

</summary>

description: string

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

risk\_level: "low"or "medium"or "high"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.risk_scoring.behaviours%20%3E%20(model)%20behaviour_get_response%20%3E%20(schema)>)

<details>

<summary>

BehaviourUpdateResponse object {behaviors }

</summary>

<details>

<summary>

behaviors: map\[object {enabled, risk\_level } ]

</summary>

enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

risk\_level: "low"or "medium"or "high"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.risk_scoring.behaviours%20%3E%20(model)%20behaviour_update_response%20%3E%20(schema)>)

#### Risk ScoringSummary

##### [Get risk score info for all users in the account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring/subresources/summary/methods/get)

GET/accounts/{account\_id}/zt\_risk\_scoring/summary

##### ModelsExpand Collapse

<details>

<summary>

SummaryGetResponse object {users }

</summary>

<details>

<summary>

users: array of object {email, event\_count, last\_event, 3 more }

</summary>

email: string

<a href="#">Link to this property</a>

event\_count: number

minimum0

<a href="#">Link to this property</a>

last\_event: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

max\_risk\_level: "low"or "medium"or "high"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

user\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.risk_scoring.summary%20%3E%20(model)%20summary_get_response%20%3E%20(schema)>)

#### Risk ScoringIntegrations

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

#### Risk ScoringIntegrationsReferences

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