---
title: Keys
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Keys

##### [List signing keys](https://developers.cloudflare.com/api/resources/stream/subresources/keys/methods/get)

GET/accounts/{account\_id}/stream/keys

##### [Create signing keys](https://developers.cloudflare.com/api/resources/stream/subresources/keys/methods/create)

POST/accounts/{account\_id}/stream/keys

##### [Delete signing keys](https://developers.cloudflare.com/api/resources/stream/subresources/keys/methods/delete)

DELETE/accounts/{account\_id}/stream/keys/{identifier}

##### ModelsExpand Collapse

<details>

<summary>

Keys object {id, created, jwk, pem }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time a signing key was created.

formatdate-time

<a href="#">Link to this property</a>

jwk: optional string

The signing key in JWK format.

<a href="#">Link to this property</a>

pem: optional string

The signing key in PEM format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.keys%20%3E%20(model)%20keys%20%3E%20(schema)>)

<details>

<summary>

KeyGetResponse object {id, created, key\_id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time a signing key was created.

formatdate-time

<a href="#">Link to this property</a>

key\_id: optional string

The unique identifier for the signing key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.keys%20%3E%20(model)%20key_get_response%20%3E%20(schema)>)

KeyDeleteResponse = string

[Link to this property](#)%20stream.keys%20%3E%20(model)%20key_delete_response%20%3E%20(schema)>)