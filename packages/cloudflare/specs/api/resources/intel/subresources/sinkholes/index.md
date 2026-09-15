---
title: Sinkholes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Sinkholes

##### [List sinkholes owned by this account](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/list)

GET/accounts/{account\_id}/intel/sinkholes

##### [Get a sinkhole](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/get)

GET/accounts/{account\_id}/intel/sinkholes/{sinkhole\_id}

##### [Create a new sinkhole for your account](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/create)

POST/accounts/{account\_id}/intel/sinkholes

##### [Update a sinkhole](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/update)

PUT/accounts/{account\_id}/intel/sinkholes/{sinkhole\_id}

##### [Delete a sinkhole](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/methods/delete)

DELETE/accounts/{account\_id}/intel/sinkholes/{sinkhole\_id}

##### ModelsExpand Collapse

<details>

<summary>

Sinkhole object {id, account\_tag, created\_on, 4 more }

</summary>

id: optional string

The unique identifier for the sinkhole.

<a href="#">Link to this property</a>

account\_tag: optional string

The account tag that owns this sinkhole.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the sinkhole was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the sinkhole was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the sinkhole.

<a href="#">Link to this property</a>

r2\_bucket: optional string

The name of the R2 bucket to store results.

<a href="#">Link to this property</a>

r2\_id: optional string

The id of the R2 instance.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.sinkholes%20%3E%20(model)%20sinkhole%20%3E%20(schema)>)

SinkholeUpdateResponse = unknown

[Link to this property](#)%20intel.sinkholes%20%3E%20(model)%20sinkhole_update_response%20%3E%20(schema)>)

SinkholeDeleteResponse = unknown

[Link to this property](#)%20intel.sinkholes%20%3E%20(model)%20sinkhole_delete_response%20%3E%20(schema)>)

#### SinkholesIngresses

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