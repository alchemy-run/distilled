---
title: Limits
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Limits

##### [Fetch limits associated with DLP for account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/limits/methods/list)

GET/accounts/{account\_id}/dlp/limits

##### ModelsExpand Collapse

<details>

<summary>

LimitListResponse object {max\_custom\_regex\_entries, max\_dataset\_cells, max\_document\_fingerprints, 3 more }

</summary>

max\_custom\_regex\_entries: number

Maximum number of custom regex entries allowed for the account.

formatint64

minimum0

<a href="#">Link to this property</a>

max\_dataset\_cells: number

Maximum number of dataset cells allowed for the account, across all EDM and CWL datasets.

formatint64

minimum0

<a href="#">Link to this property</a>

max\_document\_fingerprints: number

Maximum number of document fingerprints allowed for the account.

formatint64

minimum0

<a href="#">Link to this property</a>

used\_custom\_regex\_entries: number

Number of custom regex entries currently configured for the account.

formatint64

minimum0

<a href="#">Link to this property</a>

used\_dataset\_cells: number

Number of dataset cells currently configured for the account, across all EDM and CWL datasets. Document fingerprints do not count towards this limit.

formatint64

minimum0

<a href="#">Link to this property</a>

used\_document\_fingerprints: number

Number of document fingerprints currently configured for the account.

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.limits%20%3E%20(model)%20limit_list_response%20%3E%20(schema)>)