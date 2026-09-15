---
title: URLs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# URLs

##### [Get URL Intelligence](https://developers.cloudflare.com/api/resources/intel/subresources/urls/methods/get)

GET/accounts/{account\_id}/intel/url

##### ModelsExpand Collapse

<details>

<summary>

URL object {content\_categories, full\_url, hostname, 2 more }

</summary>

<details>

<summary>

content\_categories: array of object {id, name, source\_id, super\_category\_id }

Content categories associated with this URL.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

source\_id: optional number

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

full\_url: string

The full URL that was looked up.

<a href="#">Link to this property</a>

hostname: string

The hostname of the URL.

<a href="#">Link to this property</a>

<details>

<summary>

risk\_type: array of object {id, name, source\_id, super\_category\_id }

Security risk types associated with this URL.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

source\_id: optional number

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url\_path: string

The path component of the URL.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.urls%20%3E%20(model)%20url%20%3E%20(schema)>)