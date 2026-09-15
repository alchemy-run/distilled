---
title: Interrupts
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Connectors](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Interrupts

##### [List Interrupts](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/interrupts/methods/list)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/interrupts

##### [Create Interrupt](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/interrupts/methods/create)

POST/accounts/{account\_id}/magic/connectors/{connector\_id}/interrupts

##### ModelsExpand Collapse

<details>

<summary>

InterruptListResponse object {submitted\_at, reboot, restart, 2 more }

Interrupt action for a connector.

</summary>

submitted\_at: string

<a href="#">Link to this property</a>

<details>

<summary>

reboot: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

restart: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

shutdown: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

triggered\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.interrupts%20%3E%20(model)%20interrupt_list_response%20%3E%20(schema)>)

<details>

<summary>

InterruptCreateResponse object {submitted\_at, reboot, restart, 2 more }

Interrupt action for a connector.

</summary>

submitted\_at: string

<a href="#">Link to this property</a>

<details>

<summary>

reboot: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

restart: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

shutdown: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

triggered\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.interrupts%20%3E%20(model)%20interrupt_create_response%20%3E%20(schema)>)