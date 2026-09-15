---
title: Recommendations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[SSL](https://developers.cloudflare.com/api/resources/ssl)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Recommendations

##### [SSL/TLS Recommendation](https://developers.cloudflare.com/api/resources/ssl/subresources/recommendations/methods/get)

Deprecated

GET/zones/{zone\_id}/ssl/recommendation

##### ModelsExpand Collapse

<details>

<summary>

RecommendationGetResponse object {id, editable, modified\_on, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

editable: boolean

Whether this setting can be updated or not.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: "auto"or "custom"

Current setting of the automatic SSL/TLS.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_scheduled\_scan: optional string

Next time this zone will be scanned by the Automatic SSL/TLS.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.recommendations%20%3E%20(model)%20recommendation_get_response%20%3E%20(schema)>)