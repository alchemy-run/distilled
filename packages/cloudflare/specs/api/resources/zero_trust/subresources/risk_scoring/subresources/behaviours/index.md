---
title: Behaviours
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Risk Scoring](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Behaviours

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