---
title: Matches
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[V2](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Matches

##### [List saved query matches](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/matches/methods/get)

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/domain/matches

##### ModelsExpand Collapse

<details>

<summary>

MatchGetResponse object {matches, total }

</summary>

<details>

<summary>

matches: array of object {domain, first\_seen, public\_scans, 6 more }

</summary>

domain: string

<a href="#">Link to this property</a>

first\_seen: string

<a href="#">Link to this property</a>

<details>

<summary>

public\_scans: object {submission\_id }

</summary>

submission\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registrar: string

<a href="#">Link to this property</a>

scan\_status: string

<a href="#">Link to this property</a>

scan\_submission\_id: number

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

dismissed: optional boolean

Whether the match is dismissed. Only present for single-query requests. For multi-query requests, use the dismissed field in each match\_details entry.

<a href="#">Link to this property</a>

<details>

<summary>

match\_details: optional array of object {dismissed, match\_id, query\_id, query\_tag }

Per-match detail objects with query metadata and individual dismissed state. Only present when multiple query\_ids are requested.

</summary>

dismissed: boolean

Individual dismissed state for this specific match.

<a href="#">Link to this property</a>

match\_id: number

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

Tag associated with the query, if one exists.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total: number

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(model)%20match_get_response%20%3E%20(schema)>)