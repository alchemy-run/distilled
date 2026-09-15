---
title: Configs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zaraz](https://developers.cloudflare.com/api/resources/zaraz)

[History](https://developers.cloudflare.com/api/resources/zaraz/subresources/history)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Configs

##### [Get Zaraz historical configurations by ID(s)](https://developers.cloudflare.com/api/resources/zaraz/subresources/history/subresources/configs/methods/get)

GET/zones/{zone\_id}/settings/zaraz/history/configs

##### ModelsExpand Collapse

<details>

<summary>

ConfigGetResponse = map\[object {id, config, createdAt, 2 more } ]

Object where keys are numeric configuration IDs.

</summary>

id: number

ID of the configuration.

<a href="#">Link to this property</a>

config: <a href="https://developers.cloudflare.com/api/resources/zaraz#(resource)%20zaraz.config%20%3E%20(model)%20configuration%20%3E%20(schema)">Configuration</a> { dataLayer, debugKey, settings, 7 more }

Zaraz configuration.

<a href="#">Link to this property</a>

createdAt: string

Date and time the configuration was created.

formatdate-time

<a href="#">Link to this property</a>

updatedAt: string

Date and time the configuration was last updated.

formatdate-time

<a href="#">Link to this property</a>

userId: string

Alpha-numeric ID of the account user who published the configuration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zaraz.history.configs%20%3E%20(model)%20config_get_response%20%3E%20(schema)>)