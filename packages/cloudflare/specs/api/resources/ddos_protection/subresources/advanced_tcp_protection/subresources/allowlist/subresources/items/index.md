---
title: Items
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

[Advanced TCP Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection)

[Allowlist](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Items

##### [Get allowlist prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{prefix\_id}

##### [Update allowlist prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{prefix\_id}

##### [Delete allowlist prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{prefix\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the allowlist prefix.

<a href="#">Link to this property</a>

comment: string

An optional comment describing the allowlist prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

Whether to enable the allowlist prefix into effect. Defaults to false.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The allowlist prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the allowlist prefix.

<a href="#">Link to this property</a>

comment: string

An optional comment describing the allowlist prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

Whether to enable the allowlist prefix into effect. Defaults to false.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The allowlist prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

<details>

<summary>

ItemDeleteResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)