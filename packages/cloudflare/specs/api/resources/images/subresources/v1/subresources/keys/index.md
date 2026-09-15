---
title: Keys
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Images](https://developers.cloudflare.com/api/resources/images)

[V1](https://developers.cloudflare.com/api/resources/images/subresources/v1)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Keys

##### [List Signing Keys](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/keys/methods/list)

GET/accounts/{account\_id}/images/v1/keys

##### [Create a new Signing Key](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/keys/methods/update)

PUT/accounts/{account\_id}/images/v1/keys/{signing\_key\_name}

##### [Delete Signing Key](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/keys/methods/delete)

DELETE/accounts/{account\_id}/images/v1/keys/{signing\_key\_name}

##### ModelsExpand Collapse

<details>

<summary>

Key object {name, value }

</summary>

name: optional string

Key name.

<a href="#">Link to this property</a>

value: optional string

Key value.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.keys%20%3E%20(model)%20key%20%3E%20(schema)>)

<details>

<summary>

KeyListResponse object {keys }

</summary>

<details>

<summary>

keys: optional array of <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1.keys%20%3E%20(model)%20key%20%3E%20(schema)">Key</a> { name, value }

</summary>

name: optional string

Key name.

<a href="#">Link to this property</a>

value: optional string

Key value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.keys%20%3E%20(model)%20key_list_response%20%3E%20(schema)>)

<details>

<summary>

KeyUpdateResponse object {keys }

</summary>

<details>

<summary>

keys: optional array of <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1.keys%20%3E%20(model)%20key%20%3E%20(schema)">Key</a> { name, value }

</summary>

name: optional string

Key name.

<a href="#">Link to this property</a>

value: optional string

Key value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.keys%20%3E%20(model)%20key_update_response%20%3E%20(schema)>)

<details>

<summary>

KeyDeleteResponse object {keys }

</summary>

<details>

<summary>

keys: optional array of <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1.keys%20%3E%20(model)%20key%20%3E%20(schema)">Key</a> { name, value }

</summary>

name: optional string

Key name.

<a href="#">Link to this property</a>

value: optional string

Key value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.keys%20%3E%20(model)%20key_delete_response%20%3E%20(schema)>)