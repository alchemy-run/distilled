---
title: Gateway CA
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Gateway CA

##### [List SSH Certificate Authorities (CA)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/gateway_ca/methods/list)

GET/accounts/{account\_id}/access/gateway\_ca

##### [Add a new SSH Certificate Authority (CA)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/gateway_ca/methods/create)

POST/accounts/{account\_id}/access/gateway\_ca

##### [Delete an SSH Certificate Authority (CA)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/gateway_ca/methods/delete)

DELETE/accounts/{account\_id}/access/gateway\_ca/{certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

GatewayCAListResponse object {id, public\_key }

</summary>

id: optional string

The key ID of this certificate.

<a href="#">Link to this property</a>

public\_key: optional string

The public key of this certificate.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.gateway_ca%20%3E%20(model)%20gateway_ca_list_response%20%3E%20(schema)>)

<details>

<summary>

GatewayCACreateResponse object {id, public\_key }

</summary>

id: optional string

The key ID of this certificate.

<a href="#">Link to this property</a>

public\_key: optional string

The public key of this certificate.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.gateway_ca%20%3E%20(model)%20gateway_ca_create_response%20%3E%20(schema)>)

<details>

<summary>

GatewayCADeleteResponse object {id }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.gateway_ca%20%3E%20(model)%20gateway_ca_delete_response%20%3E%20(schema)>)