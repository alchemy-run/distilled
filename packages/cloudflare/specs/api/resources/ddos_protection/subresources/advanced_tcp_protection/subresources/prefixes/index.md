---
title: Prefixes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

[Advanced TCP Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Prefixes

##### [List all prefixes.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/methods/list)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes

##### [Create prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/methods/create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes

##### [Delete all prefixes.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/methods/bulk_delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes

##### [Create multiple prefixes.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/methods/bulk_create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/bulk

##### ModelsExpand Collapse

<details>

<summary>

PrefixListResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes%20%3E%20(model)%20prefix_list_response%20%3E%20(schema)>)

<details>

<summary>

PrefixCreateResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes%20%3E%20(model)%20prefix_create_response%20%3E%20(schema)>)

<details>

<summary>

PrefixBulkDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes%20%3E%20(model)%20prefix_bulk_delete_response%20%3E%20(schema)>)

<details>

<summary>

PrefixBulkCreateResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes%20%3E%20(model)%20prefix_bulk_create_response%20%3E%20(schema)>)

#### PrefixesItems

##### [Get prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}

##### [Update prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}

##### [Delete prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)