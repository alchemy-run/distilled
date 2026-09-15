---
title: Tokens
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tokens

##### [Create build token](https://developers.cloudflare.com/api/resources/workers_builds/subresources/tokens/methods/create)

POST/accounts/{account\_id}/builds/tokens

##### [List build tokens](https://developers.cloudflare.com/api/resources/workers_builds/subresources/tokens/methods/list)

GET/accounts/{account\_id}/builds/tokens

##### [Delete a build token](https://developers.cloudflare.com/api/resources/workers_builds/subresources/tokens/methods/delete)

DELETE/accounts/{account\_id}/builds/tokens/{build\_token\_uuid}

##### ModelsExpand Collapse

<details>

<summary>

TokenCreateResponse object {build\_token\_name, build\_token\_uuid, cloudflare\_token\_id, owner\_type }

</summary>

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

<a href="#">Link to this property</a>

cloudflare\_token\_id: optional string

<a href="#">Link to this property</a>

owner\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.tokens%20%3E%20(model)%20token_create_response%20%3E%20(schema)>)

<details>

<summary>

TokenListResponse object {build\_token\_name, build\_token\_uuid, cloudflare\_token\_id, owner\_type }

</summary>

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

<a href="#">Link to this property</a>

cloudflare\_token\_id: optional string

<a href="#">Link to this property</a>

owner\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.tokens%20%3E%20(model)%20token_list_response%20%3E%20(schema)>)

TokenDeleteResponse = unknown

[Link to this property](#)%20workers_builds.tokens%20%3E%20(model)%20token_delete_response%20%3E%20(schema)>)