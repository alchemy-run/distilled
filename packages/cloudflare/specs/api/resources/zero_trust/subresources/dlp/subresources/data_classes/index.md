---
title: Data Classes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Data Classes

##### [Retrieve all data classes in an account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_classes/methods/list)

GET/accounts/{account\_id}/dlp/data\_classes

##### [Retrieve a specific data class](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_classes/methods/get)

GET/accounts/{account\_id}/dlp/data\_classes/{data\_class\_id}

##### [Creates a new data class](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_classes/methods/create)

POST/accounts/{account\_id}/dlp/data\_classes

##### [Update the attributes of a single data class](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_classes/methods/update)

PUT/accounts/{account\_id}/dlp/data\_classes/{data\_class\_id}

##### [Delete a single data class](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_classes/methods/delete)

DELETE/accounts/{account\_id}/dlp/data\_classes/{data\_class\_id}

##### ModelsExpand Collapse

<details>

<summary>

DataClassListResponse object {id, created\_at, data\_tags, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

data\_tags: array of string

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

sensitivity\_levels: array of object {group\_id, level\_id }

</summary>

group\_id: string

formatuuid

<a href="#">Link to this property</a>

level\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(model)%20data_class_list_response%20%3E%20(schema)>)

<details>

<summary>

DataClassGetResponse object {id, created\_at, data\_tags, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

data\_tags: array of string

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

sensitivity\_levels: array of object {group\_id, level\_id }

</summary>

group\_id: string

formatuuid

<a href="#">Link to this property</a>

level\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(model)%20data_class_get_response%20%3E%20(schema)>)

<details>

<summary>

DataClassCreateResponse object {id, created\_at, data\_tags, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

data\_tags: array of string

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

sensitivity\_levels: array of object {group\_id, level\_id }

</summary>

group\_id: string

formatuuid

<a href="#">Link to this property</a>

level\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(model)%20data_class_create_response%20%3E%20(schema)>)

<details>

<summary>

DataClassUpdateResponse object {id, created\_at, data\_tags, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

data\_tags: array of string

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

sensitivity\_levels: array of object {group\_id, level\_id }

</summary>

group\_id: string

formatuuid

<a href="#">Link to this property</a>

level\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(model)%20data_class_update_response%20%3E%20(schema)>)

DataClassDeleteResponse = unknown

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(model)%20data_class_delete_response%20%3E%20(schema)>)