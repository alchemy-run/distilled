---
title: Raw
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Raw

##### [Reads data for a raw event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/raw/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/{event\_id}/raw/{raw\_id}

##### [Updates a raw event](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/raw/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/{event\_id}/raw/{raw\_id}

##### ModelsExpand Collapse

<details>

<summary>

RawGetResponse object {id, accountId, created, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

accountId: number

<a href="#">Link to this property</a>

created: string

<a href="#">Link to this property</a>

data: unknown

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

tlp: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_get_response%20%3E%20(schema)>)

<details>

<summary>

RawEditResponse object {id, data }

</summary>

id: string

<a href="#">Link to this property</a>

data: unknown

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.raw%20%3E%20(model)%20raw_edit_response%20%3E%20(schema)>)