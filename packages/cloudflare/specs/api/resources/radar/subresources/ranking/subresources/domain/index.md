---
title: Domain
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Ranking](https://developers.cloudflare.com/api/resources/radar/subresources/ranking)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Domain

##### [Get domain rank details](https://developers.cloudflare.com/api/resources/radar/subresources/ranking/subresources/domain/methods/get)

GET/radar/ranking/domain/{domain}

##### ModelsExpand Collapse

<details>

<summary>

DomainGetResponse object {details\_0, meta }

</summary>

<details>

<summary>

details\_0: object {categories, bucket, rank, top\_locations }

</summary>

<details>

<summary>

categories: array of object {id, name, superCategoryId }

</summary>

id: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

superCategoryId: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Only available in POPULAR ranking for the most recent ranking.

<a href="#">Link to this property</a>

rank: optional number

<a href="#">Link to this property</a>

<details>

<summary>

top\_locations: optional array of object {locationCode, locationName, rank }

</summary>

locationCode: string

<a href="#">Link to this property</a>

locationName: string

<a href="#">Link to this property</a>

rank: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dateRange }

</summary>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ranking.domain%20%3E%20(model)%20domain_get_response%20%3E%20(schema)>)