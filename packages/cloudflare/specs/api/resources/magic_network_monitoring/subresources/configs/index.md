---
title: Configs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Network Monitoring](https://developers.cloudflare.com/api/resources/magic_network_monitoring)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Configs

##### [List account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/get)

GET/accounts/{account\_id}/mnm/config

##### [Create account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/create)

POST/accounts/{account\_id}/mnm/config

##### [Update an entire account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/update)

PUT/accounts/{account\_id}/mnm/config

##### [Update account configuration fields](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/edit)

PATCH/accounts/{account\_id}/mnm/config

##### [Delete account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/delete)

DELETE/accounts/{account\_id}/mnm/config

##### ModelsExpand Collapse

<details>

<summary>

Configuration object {default\_sampling, name, router\_ips, warp\_devices }

</summary>

default\_sampling: number

Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

minimum1

<a href="#">Link to this property</a>

name: string

The account name.

<a href="#">Link to this property</a>

router\_ips: array of string

<a href="#">Link to this property</a>

<details>

<summary>

warp\_devices: array of object {id, name, router\_ip }

</summary>

id: string

Unique identifier for the warp device.

<a href="#">Link to this property</a>

name: string

Name of the warp device.

<a href="#">Link to this property</a>

router\_ip: string

IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_network_monitoring.configs%20%3E%20(model)%20configuration%20%3E%20(schema)>)

#### ConfigsFull

##### [List rules and account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/subresources/full/methods/get)

GET/accounts/{account\_id}/mnm/config/full