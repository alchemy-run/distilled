---
title: Account
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Usage](https://developers.cloudflare.com/api/resources/dns/subresources/usage)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Account

##### [Get DNS Record Usage for Account](https://developers.cloudflare.com/api/resources/dns/subresources/usage/subresources/account/methods/get)

GET/accounts/{account\_id}/dns\_records/usage

##### ModelsExpand Collapse

<details>

<summary>

AccountGetResponse object {record\_quota, record\_usage, internal\_record\_quota, internal\_record\_usage }

</summary>

record\_quota: number

Maximum number of DNS records allowed across all public zones in the account. Null if using zone-level quota.

minimum0

<a href="#">Link to this property</a>

record\_usage: number

Current number of DNS records across all public zones in the account.

minimum0

<a href="#">Link to this property</a>

internal\_record\_quota: optional number

Maximum number of DNS records allowed across all internal zones in the account. Only present if internal DNS is enabled.

minimum0

<a href="#">Link to this property</a>

internal\_record\_usage: optional number

Current number of DNS records across all internal zones in the account. Only present if internal DNS is enabled.

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.usage.account%20%3E%20(model)%20account_get_response%20%3E%20(schema)>)