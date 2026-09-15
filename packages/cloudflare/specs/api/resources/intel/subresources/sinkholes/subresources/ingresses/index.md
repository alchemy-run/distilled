---
title: Ingresses
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Sinkholes](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Ingresses

##### [Create an ingress rule](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses/methods/create)

POST/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses

##### [Get an ingress rule](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses/methods/get)

GET/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses/{ingress\_id}

##### [Update an ingress rule](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses/methods/update)

PUT/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses/{ingress\_id}

##### [Delete an ingress rule](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses/methods/delete)

DELETE/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses/{ingress\_id}

##### ModelsExpand Collapse

<details>

<summary>

IngressCreateResponse object {id, cidr, created\_on, 3 more }

</summary>

id: optional string

The unique identifier for the ingress rule.

<a href="#">Link to this property</a>

cidr: optional string

The CIDR block for the ingress rule.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the ingress rule was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the ingress rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

sinkhole\_id: optional string

The sinkhole this ingress rule belongs to.

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone tag associated with this ingress rule.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(model)%20ingress_create_response%20%3E%20(schema)>)

<details>

<summary>

IngressGetResponse object {id, cidr, created\_on, 3 more }

</summary>

id: optional string

The unique identifier for the ingress rule.

<a href="#">Link to this property</a>

cidr: optional string

The CIDR block for the ingress rule.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the ingress rule was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the ingress rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

sinkhole\_id: optional string

The sinkhole this ingress rule belongs to.

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone tag associated with this ingress rule.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(model)%20ingress_get_response%20%3E%20(schema)>)

IngressUpdateResponse = unknown

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(model)%20ingress_update_response%20%3E%20(schema)>)

IngressDeleteResponse = unknown

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(model)%20ingress_delete_response%20%3E%20(schema)>)