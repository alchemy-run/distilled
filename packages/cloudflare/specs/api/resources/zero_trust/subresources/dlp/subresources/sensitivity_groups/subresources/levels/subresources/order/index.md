---
title: Order
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Sensitivity Groups](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups)

[Levels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Order

##### [Retrieve the ordered list of level IDs for a sensitivity group.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/subresources/order/methods/get)

GET/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/level\_order

##### [Set the ordering of levels within a sensitivity group.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/subresources/order/methods/update)

PUT/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/level\_order

##### ModelsExpand Collapse

<details>

<summary>

OrderGetResponse object {level\_ids }

The ordered list of level IDs for a sensitivity group. Used to get and set the ordering of levels independently of level attributes.

</summary>

level\_ids: array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels.order%20%3E%20(model)%20order_get_response%20%3E%20(schema)>)

<details>

<summary>

OrderUpdateResponse object {level\_ids }

The ordered list of level IDs for a sensitivity group. Used to get and set the ordering of levels independently of level attributes.

</summary>

level\_ids: array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels.order%20%3E%20(model)%20order_update_response%20%3E%20(schema)>)