---
title: IPs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# IPs

##### [Get IP Overview](https://developers.cloudflare.com/api/resources/intel/subresources/ips/methods/get)

GET/accounts/{account\_id}/intel/ip

##### ModelsExpand Collapse

<details>

<summary>

IP object {belongs\_to\_ref, ip, risk\_types }

</summary>

<details>

<summary>

belongs\_to\_ref: optional object {id, country, description, 2 more }

Specifies a reference to the autonomous systems (AS) that the IP address belongs to.

</summary>

id: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "hosting\_provider"or "isp"or "organization"

Infrastructure type of this ASN.

</summary>

One of the following:

"hosting\_provider"

<a href="#">Link to this property</a>

"isp"

<a href="#">Link to this property</a>

"organization"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

formatipv4

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

[Link to this property](#)%20intel.ips%20%3E%20(model)%20ip%20%3E%20(schema)>)

<details>

<summary>

IPGetResponse = array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.ips%20%3E%20(model)%20ip%20%3E%20(schema)">IP</a> { belongs\_to\_ref, ip, risk\_types }

</summary>

<details>

<summary>

belongs\_to\_ref: optional object {id, country, description, 2 more }

Specifies a reference to the autonomous systems (AS) that the IP address belongs to.

</summary>

id: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "hosting\_provider"or "isp"or "organization"

Infrastructure type of this ASN.

</summary>

One of the following:

"hosting\_provider"

<a href="#">Link to this property</a>

"isp"

<a href="#">Link to this property</a>

"organization"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

formatipv4

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

[Link to this property](#)%20intel.ips%20%3E%20(model)%20ip_get_response%20%3E%20(schema)>)