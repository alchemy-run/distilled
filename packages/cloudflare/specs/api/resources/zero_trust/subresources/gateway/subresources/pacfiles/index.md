---
title: Pacfiles
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Pacfiles

##### [List PAC files](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/list)

GET/accounts/{account\_id}/gateway/pacfiles

##### [Get a PAC file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/get)

GET/accounts/{account\_id}/gateway/pacfiles/{pacfile\_id}

##### [Create a PAC file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/create)

POST/accounts/{account\_id}/gateway/pacfiles

##### [Update a Zero Trust Gateway PAC file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/update)

PUT/accounts/{account\_id}/gateway/pacfiles/{pacfile\_id}

##### [Delete a PAC file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/pacfiles/methods/delete)

DELETE/accounts/{account\_id}/gateway/pacfiles/{pacfile\_id}

##### ModelsExpand Collapse

<details>

<summary>

PacfileListResponse object {id, created\_at, description, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_list_response%20%3E%20(schema)>)

<details>

<summary>

PacfileGetResponse object {id, contents, created\_at, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

contents: optional string

Actual contents of the PAC file

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_get_response%20%3E%20(schema)>)

<details>

<summary>

PacfileCreateResponse object {id, contents, created\_at, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

contents: optional string

Actual contents of the PAC file

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_create_response%20%3E%20(schema)>)

<details>

<summary>

PacfileUpdateResponse object {id, contents, created\_at, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

contents: optional string

Actual contents of the PAC file

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Detailed description of the PAC file.

<a href="#">Link to this property</a>

name: optional string

Name of the PAC file.

<a href="#">Link to this property</a>

slug: optional string

URL-friendly version of the PAC file name.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

url: optional string

Unique URL to download the PAC file.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_update_response%20%3E%20(schema)>)

PacfileDeleteResponse = unknown

[Link to this property](#)%20zero_trust.gateway.pacfiles%20%3E%20(model)%20pacfile_delete_response%20%3E%20(schema)>)