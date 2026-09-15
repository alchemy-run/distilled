---
title: Quota
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Quota

##### [Get Custom Hostname Quota](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/quota/methods/get)

GET/zones/{zone\_id}/custom\_hostnames/quota

##### ModelsExpand Collapse

<details>

<summary>

QuotaGetResponse object {allocated, exceeded, hard\_cap, used }

</summary>

allocated: number

The allocated custom hostname quota.

formatint64

<a href="#">Link to this property</a>

exceeded: boolean

Whether the current usage has exceeded the allocated quota.

<a href="#">Link to this property</a>

hard\_cap: number

The maximum number of custom hostnames allowed before create requests are rejected.

formatint64

<a href="#">Link to this property</a>

used: number

The number of custom hostnames currently in use.

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.quota%20%3E%20(model)%20quota_get_response%20%3E%20(schema)>)