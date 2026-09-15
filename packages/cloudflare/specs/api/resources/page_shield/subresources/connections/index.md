---
title: Connections
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Connections

##### [List detected connections](https://developers.cloudflare.com/api/resources/page_shield/subresources/connections/methods/list)

GET/zones/{zone\_id}/page\_shield/connections

##### [Get a detected connection](https://developers.cloudflare.com/api/resources/page_shield/subresources/connections/methods/get)

GET/zones/{zone\_id}/page\_shield/connections/{connection\_id}

##### ModelsExpand Collapse

<details>

<summary>

ConnectionListResponse object {id, added\_at, first\_seen\_at, 10 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

added\_at: string

formatdate-time

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

url\_contains\_cdn\_cgi\_path: boolean

<a href="#">Link to this property</a>

domain\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

first\_page\_url: optional string

<a href="#">Link to this property</a>

malicious\_domain\_categories: optional array of string

<a href="#">Link to this property</a>

malicious\_url\_categories: optional array of string

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

url\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.connections%20%3E%20(model)%20connection_list_response%20%3E%20(schema)>)

<details>

<summary>

ConnectionGetResponse object {id, added\_at, first\_seen\_at, 10 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

added\_at: string

formatdate-time

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

url\_contains\_cdn\_cgi\_path: boolean

<a href="#">Link to this property</a>

domain\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

first\_page\_url: optional string

<a href="#">Link to this property</a>

malicious\_domain\_categories: optional array of string

<a href="#">Link to this property</a>

malicious\_url\_categories: optional array of string

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

url\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.connections%20%3E%20(model)%20connection_get_response%20%3E%20(schema)>)