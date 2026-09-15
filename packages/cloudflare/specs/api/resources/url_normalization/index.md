---
title: URL Normalization
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# URL Normalization

##### [Get URL Normalization settings](https://developers.cloudflare.com/api/resources/url_normalization/methods/get)

GET/zones/{zone\_id}/url\_normalization

##### [Update URL Normalization settings](https://developers.cloudflare.com/api/resources/url_normalization/methods/update)

PUT/zones/{zone\_id}/url\_normalization

##### [Delete URL Normalization settings](https://developers.cloudflare.com/api/resources/url_normalization/methods/delete)

DELETE/zones/{zone\_id}/url\_normalization

##### ModelsExpand Collapse

<details>

<summary>

URLNormalizationGetResponse object {scope, type }

A result.

</summary>

<details>

<summary>

scope: "incoming"or "both"or "none"

The scope of the URL normalization.

</summary>

One of the following:

"incoming"

<a href="#">Link to this property</a>

"both"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "cloudflare"or "rfc3986"

The type of URL normalization performed by Cloudflare.

</summary>

One of the following:

"cloudflare"

<a href="#">Link to this property</a>

"rfc3986"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_normalization%20%3E%20(model)%20url_normalization_get_response%20%3E%20(schema)>)

<details>

<summary>

URLNormalizationUpdateResponse object {scope, type }

A result.

</summary>

<details>

<summary>

scope: "incoming"or "both"or "none"

The scope of the URL normalization.

</summary>

One of the following:

"incoming"

<a href="#">Link to this property</a>

"both"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "cloudflare"or "rfc3986"

The type of URL normalization performed by Cloudflare.

</summary>

One of the following:

"cloudflare"

<a href="#">Link to this property</a>

"rfc3986"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_normalization%20%3E%20(model)%20url_normalization_update_response%20%3E%20(schema)>)