---
title: Integrations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Integrations

##### [List your device posture integrations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture/subresources/integrations/methods/list)

GET/accounts/{account\_id}/devices/posture/integration

##### [Get device posture integration details](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture/subresources/integrations/methods/get)

GET/accounts/{account\_id}/devices/posture/integration/{integration\_id}

##### [Create a device posture integration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture/subresources/integrations/methods/create)

POST/accounts/{account\_id}/devices/posture/integration

##### [Update a device posture integration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture/subresources/integrations/methods/edit)

PATCH/accounts/{account\_id}/devices/posture/integration/{integration\_id}

##### [Delete a device posture integration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/posture/subresources/integrations/methods/delete)

DELETE/accounts/{account\_id}/devices/posture/integration/{integration\_id}

##### ModelsExpand Collapse

<details>

<summary>

Integration object {id, config, interval, 2 more }

</summary>

id: optional string

API UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {api\_url, auth\_url, client\_id }

The configuration object containing third-party integration information.

</summary>

api\_url: string

The Workspace One API URL provided in the Workspace One Admin Dashboard.

<a href="#">Link to this property</a>

auth\_url: string

The Workspace One Authorization URL depending on your region.

<a href="#">Link to this property</a>

client\_id: string

The Workspace One client ID provided in the Workspace One Admin Dashboard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

The interval between each posture check with the third-party API. Use <code>m</code> for minutes (e.g. <code>5m</code>) and <code>h</code> for hours (e.g. <code>12h</code>).

<a href="#">Link to this property</a>

name: optional string

The name of the device posture integration.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "workspace\_one"or "crowdstrike\_s2s"or "uptycs"or 5 more

The type of device posture integration.

</summary>

One of the following:

"workspace\_one"

<a href="#">Link to this property</a>

"crowdstrike\_s2s"

<a href="#">Link to this property</a>

"uptycs"

<a href="#">Link to this property</a>

"intune"

<a href="#">Link to this property</a>

"kolide"

<a href="#">Link to this property</a>

"tanium\_s2s"

<a href="#">Link to this property</a>

"sentinelone\_s2s"

<a href="#">Link to this property</a>

"custom\_s2s"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(model)%20integration%20%3E%20(schema)>)

<details>

<summary>

IntegrationDeleteResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.posture.integrations%20%3E%20(model)%20integration_delete_response%20%3E%20(schema)>)