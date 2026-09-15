---
title: Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Settings

##### [Get zone-level Waiting Room settings](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/settings/methods/get)

GET/zones/{zone\_id}/waiting\_rooms/settings

##### [Update zone-level Waiting Room settings](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/settings/methods/update)

PUT/zones/{zone\_id}/waiting\_rooms/settings

##### [Patch zone-level Waiting Room settings](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/settings/methods/edit)

PATCH/zones/{zone\_id}/waiting\_rooms/settings

##### ModelsExpand Collapse

<details>

<summary>

Setting object {search\_engine\_crawler\_bypass }

</summary>

search\_engine\_crawler\_bypass: boolean

Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appear in waiting room analytics.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.settings%20%3E%20(model)%20setting%20%3E%20(schema)>)

<details>

<summary>

SettingGetResponse object {search\_engine\_crawler\_bypass }

</summary>

search\_engine\_crawler\_bypass: boolean

Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appear in waiting room analytics.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.settings%20%3E%20(model)%20setting_get_response%20%3E%20(schema)>)

<details>

<summary>

SettingUpdateResponse object {search\_engine\_crawler\_bypass }

</summary>

search\_engine\_crawler\_bypass: boolean

Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appear in waiting room analytics.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.settings%20%3E%20(model)%20setting_update_response%20%3E%20(schema)>)

<details>

<summary>

SettingEditResponse object {search\_engine\_crawler\_bypass }

</summary>

search\_engine\_crawler\_bypass: boolean

Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone. Verified search engine crawlers will not be tracked or counted by the waiting room system, and will not appear in waiting room analytics.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.settings%20%3E%20(model)%20setting_edit_response%20%3E%20(schema)>)