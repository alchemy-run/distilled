---
title: Summary
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Risk Scoring](https://developers.cloudflare.com/api/resources/zero_trust/subresources/risk_scoring)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Summary

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