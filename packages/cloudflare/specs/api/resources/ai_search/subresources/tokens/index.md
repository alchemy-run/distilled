---
title: Tokens
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tokens

##### [List tokens](https://developers.cloudflare.com/api/resources/ai_search/subresources/tokens/methods/list)

GET/accounts/{account\_id}/ai-search/tokens

##### [Create a token](https://developers.cloudflare.com/api/resources/ai_search/subresources/tokens/methods/create)

POST/accounts/{account\_id}/ai-search/tokens

##### [Get a token](https://developers.cloudflare.com/api/resources/ai_search/subresources/tokens/methods/read)

GET/accounts/{account\_id}/ai-search/tokens/{id}

##### [Update a token](https://developers.cloudflare.com/api/resources/ai_search/subresources/tokens/methods/update)

PUT/accounts/{account\_id}/ai-search/tokens/{id}

##### [Delete a token](https://developers.cloudflare.com/api/resources/ai_search/subresources/tokens/methods/delete)

DELETE/accounts/{account\_id}/ai-search/tokens/{id}

##### ModelsExpand Collapse

<details>

<summary>

TokenListResponse object {id, cf\_api\_id, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

cf\_api\_id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

legacy: optional boolean

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.tokens%20%3E%20(model)%20token_list_response%20%3E%20(schema)>)

<details>

<summary>

TokenCreateResponse object {id, cf\_api\_id, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

cf\_api\_id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

legacy: optional boolean

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.tokens%20%3E%20(model)%20token_create_response%20%3E%20(schema)>)

<details>

<summary>

TokenReadResponse object {id, cf\_api\_id, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

cf\_api\_id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

legacy: optional boolean

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.tokens%20%3E%20(model)%20token_read_response%20%3E%20(schema)>)

<details>

<summary>

TokenUpdateResponse object {id, cf\_api\_id, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

cf\_api\_id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

legacy: optional boolean

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.tokens%20%3E%20(model)%20token_update_response%20%3E%20(schema)>)

TokenDeleteResponse = unknown

[Link to this property](#)%20ai_search.tokens%20%3E%20(model)%20token_delete_response%20%3E%20(schema)>)