---
title: Filters
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

[Advanced TCP Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection)

[TCP Flow Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Filters

##### [List all TCP Flow Protection filters.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/methods/list)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters

##### [Create a TCP Flow Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/methods/create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters

##### [Delete all TCP Flow Protection filters.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/methods/bulk_delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters

##### ModelsExpand Collapse

<details>

<summary>

FilterListResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters%20%3E%20(model)%20filter_list_response%20%3E%20(schema)>)

<details>

<summary>

FilterCreateResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters%20%3E%20(model)%20filter_create_response%20%3E%20(schema)>)

<details>

<summary>

FilterBulkDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters%20%3E%20(model)%20filter_bulk_delete_response%20%3E%20(schema)>)

#### FiltersItems

##### [Get TCP Flow Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}

##### [Update TCP Flow Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}

##### [Delete TCP Flow Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)