---
title: Quota
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Quota

##### [Returns account commands usage, quota, and reset time](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/quota/methods/get)

GET/accounts/{account\_id}/dex/commands/quota

##### ModelsExpand Collapse

<details>

<summary>

QuotaGetResponse object {quota, quota\_usage, reset\_time }

</summary>

quota: number

The total number of commands that can be initiated for an account.

<a href="#">Link to this property</a>

quota\_usage: number

The number of commands that have been initiated for an account.

<a href="#">Link to this property</a>

reset\_time: string

The time when the quota resets.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands.quota%20%3E%20(model)%20quota_get_response%20%3E%20(schema)>)