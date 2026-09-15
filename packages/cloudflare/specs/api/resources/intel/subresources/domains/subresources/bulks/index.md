---
title: Bulks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Domains](https://developers.cloudflare.com/api/resources/intel/subresources/domains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bulks

##### [Get Multiple Domain Details](https://developers.cloudflare.com/api/resources/intel/subresources/domains/subresources/bulks/methods/get)

GET/accounts/{account\_id}/intel/domain/bulk

##### ModelsExpand Collapse

<details>

<summary>

BulkGetResponse = array of object {additional\_information, application, content\_categories, 7 more }

</summary>

<details>

<summary>

additional\_information: optional object {suspected\_malware\_family }

Additional information related to the host name.

</summary>

suspected\_malware\_family: optional string

Suspected DGA malware family.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

application: optional object {id, name }

Application that the hostname belongs to.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

content\_categories: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

inherited\_content\_categories: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

inherited\_from: optional string

Domain from which <code>inherited_content_categories</code> and <code>inherited_risk_types</code> are inherited, if applicable.

<a href="#">Link to this property</a>

<details>

<summary>

inherited\_risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

popularity\_rank: optional number

Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 100,000.

<a href="#">Link to this property</a>

risk\_score: optional number

Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk).

<a href="#">Link to this property</a>

<details>

<summary>

risk\_types: optional array of object {id, name, super\_category\_id }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.domains.bulks%20%3E%20(model)%20bulk_get_response%20%3E%20(schema)>)