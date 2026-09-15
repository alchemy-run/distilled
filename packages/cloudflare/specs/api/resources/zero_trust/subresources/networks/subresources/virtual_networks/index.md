---
title: Virtual Networks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Virtual Networks

##### [List virtual networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/list)

GET/accounts/{account\_id}/teamnet/virtual\_networks

##### [Get a virtual network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/get)

GET/accounts/{account\_id}/teamnet/virtual\_networks/{virtual\_network\_id}

##### [Create a virtual network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/create)

POST/accounts/{account\_id}/teamnet/virtual\_networks

##### [Update a virtual network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/edit)

PATCH/accounts/{account\_id}/teamnet/virtual\_networks/{virtual\_network\_id}

##### [Delete a virtual network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/delete)

DELETE/accounts/{account\_id}/teamnet/virtual\_networks/{virtual\_network\_id}

##### ModelsExpand Collapse

<details>

<summary>

VirtualNetwork object {id, comment, created\_at, 3 more }

</summary>

id: string

UUID of the virtual network.

formatuuid

<a href="#">Link to this property</a>

comment: string

Optional remark describing the virtual network.

maxLength256

<a href="#">Link to this property</a>

created\_at: string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

is\_default\_network: boolean

If <code>true</code>, this virtual network is the default for the account.

<a href="#">Link to this property</a>

name: string

A user-friendly name for the virtual network.

maxLength256

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.virtual_networks%20%3E%20(model)%20virtual_network%20%3E%20(schema)>)