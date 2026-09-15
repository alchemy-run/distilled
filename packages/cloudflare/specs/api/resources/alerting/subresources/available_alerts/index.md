---
title: Available Alerts
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Available Alerts

##### [Get Alert Types](https://developers.cloudflare.com/api/resources/alerting/subresources/available_alerts/methods/list)

GET/accounts/{account\_id}/alerting/v3/available\_alerts

##### ModelsExpand Collapse

<details>

<summary>

AvailableAlertListResponse = map\[array of object {description, display\_name, filter\_options, type } ]

</summary>

description: optional string

Describes the alert type.

<a href="#">Link to this property</a>

display\_name: optional string

Alert type name.

<a href="#">Link to this property</a>

filter\_options: optional array of unknown

Format of additional configuration options (filters) for the alert type. Data type of filters during policy creation: Array of strings.

<a href="#">Link to this property</a>

type: optional string

Use this value when creating and updating a notification policy.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.available_alerts%20%3E%20(model)%20available_alert_list_response%20%3E%20(schema)>)