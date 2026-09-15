---
title: IdP Federation Grants
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# IdP Federation Grants

##### [List IdP federation grants](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/idp_federation_grants/methods/list)

GET/accounts/{account\_id}/access/idp\_federation\_grants

##### [Create an IdP federation grant](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/idp_federation_grants/methods/create)

POST/accounts/{account\_id}/access/idp\_federation\_grants

##### [Get an IdP federation grant](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/idp_federation_grants/methods/get)

GET/accounts/{account\_id}/access/idp\_federation\_grants/{grant\_id}

##### [Delete an IdP federation grant](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/idp_federation_grants/methods/delete)

DELETE/accounts/{account\_id}/access/idp\_federation\_grants/{grant\_id}

##### ModelsExpand Collapse

<details>

<summary>

IdPFederationGrant object {id, idp\_id }

</summary>

id: string

UID of the IdP federation grant.

maxLength32

<a href="#">Link to this property</a>

idp\_id: string

UID of the identity provider being federated.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.idp_federation_grants%20%3E%20(model)%20idp_federation_grant%20%3E%20(schema)>)

<details>

<summary>

IdPFederationGrantListResponse = array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.idp_federation_grants%20%3E%20(model)%20idp_federation_grant%20%3E%20(schema)">IdPFederationGrant</a> { id, idp\_id }

</summary>

id: string

UID of the IdP federation grant.

maxLength32

<a href="#">Link to this property</a>

idp\_id: string

UID of the identity provider being federated.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.idp_federation_grants%20%3E%20(model)%20idp_federation_grant_list_response%20%3E%20(schema)>)

<details>

<summary>

IdPFederationGrantDeleteResponse object {id }

</summary>

id: optional string

UID of the deleted IdP federation grant.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.idp_federation_grants%20%3E%20(model)%20idp_federation_grant_delete_response%20%3E%20(schema)>)